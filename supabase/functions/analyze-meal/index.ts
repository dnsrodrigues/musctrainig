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
    // Verificar autenticação
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Não autorizado')

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser()
    if (userError || !user) throw new Error('Token inválido')

    // Ler body
    const { meal_type, description } = await req.json() as {
      meal_type: string
      description: string
    }
    if (!meal_type || !description) throw new Error('meal_type e description são obrigatórios')

    // Chamar Groq (OpenAI-compatible, 100% gratuito)
    const groqKey = Deno.env.get('GROQ_API_KEY')
    if (!groqKey) throw new Error('GROQ_API_KEY não configurada')

    const prompt = `Você é um nutricionista especialista em musculação.
Analise a refeição abaixo e retorne SOMENTE um JSON válido, sem markdown, com este formato exato:
{
  "calories": <número inteiro>,
  "protein_g": <número inteiro>,
  "carbs_g": <número inteiro>,
  "fat_g": <número inteiro>,
  "feedback": "<máximo 2 frases em português, tom positivo e prático>"
}
Tipo de refeição: ${meal_type}
Descrição: ${description}`

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      }),
    })

    if (!groqRes.ok) {
      const errBody = await groqRes.json().catch(() => ({}))
      const detail = (errBody as any)?.error?.message ?? JSON.stringify(errBody)
      throw new Error(`Groq ${groqRes.status}: ${detail}`)
    }

    const groqData = await groqRes.json()
    const rawText: string = groqData?.choices?.[0]?.message?.content ?? ''

    // Remove possível markdown ```json ... ``` que o modelo às vezes retorna
    const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    let result: {
      calories: number
      protein_g: number
      carbs_g: number
      fat_g: number
      feedback: string
    }

    try {
      result = JSON.parse(cleaned)
    } catch {
      result = {
        calories: 0,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
        feedback: 'Não foi possível analisar. Preencha os valores manualmente.',
      }
    }

    return new Response(JSON.stringify({ success: true, ...result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido'
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
