import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Não autorizado: sem header')

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Verifica identidade e papel do chamador via JWT
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser()
    if (userError || !user) throw new Error('Não autorizado: token inválido')

    const { data: caller, error: callerError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (callerError) throw new Error(`Falha ao verificar permissão: ${callerError.message}`)
    if (caller.role !== 'super_admin') throw new Error('Apenas super_admin pode gerenciar trainers')

    const body = await req.json()
    const { action = 'create' } = body

    // ── EXCLUIR trainer ──────────────────────────────────────
    if (action === 'delete') {
      const { userId } = body
      if (!userId) throw new Error('userId é obrigatório para excluir')

      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)
      if (deleteError) throw new Error(`Falha ao excluir usuário: ${deleteError.message}`)

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // ── CRIAR trainer (padrão) ───────────────────────────────
    const { email, fullName } = body
    if (!email || !fullName) throw new Error('email e fullName são obrigatórios')

    // Verifica se já existe para não criar duplicata
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) throw new Error(`Falha ao verificar usuários: ${listError.message}`)

    const existing = existingUsers?.users?.find((u) => u.email === email)
    let userId: string

    if (existing) {
      userId = existing.id
    } else {
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: crypto.randomUUID(),
        email_confirm: true,
        user_metadata: { full_name: fullName },
      })
      if (createError) throw new Error(`Falha ao criar usuário: ${createError.message}`)
      if (!newUser.user) throw new Error('Usuário não criado')
      userId = newUser.user.id
    }

    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'trainer', full_name: fullName, is_active: true })
      .eq('id', userId)

    if (updateError) throw new Error(`Falha ao atualizar perfil: ${updateError.message}`)

    return new Response(JSON.stringify({ success: true, userId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error
      ? err.message
      : typeof err === 'object' && err !== null && 'message' in err
      ? String((err as Record<string, unknown>).message)
      : 'Erro desconhecido'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
