import { useEffect, useRef } from 'react'

/**
 * Hook reutilizável para acessibilidade de modais.
 *
 * - Ao abrir: guarda o elemento focado, move foco para initialFocusRef
 * - Ao fechar: restaura foco para o elemento que estava ativo antes
 * - Fecha o modal ao pressionar Escape
 *
 * Uso:
 *   const { initialFocusRef } = useModalA11y(isOpen, onClose)
 *   // coloca ref={initialFocusRef} no primeiro input ou botão de fechar
 */
export function useModalA11y(isOpen: boolean, onClose: () => void) {
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const initialFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    // Guarda o elemento que estava focado antes de abrir
    previouslyFocused.current = document.activeElement as HTMLElement

    // Move foco para o primeiro elemento focável do modal
    const timer = setTimeout(() => {
      initialFocusRef.current?.focus()
    }, 50)

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKey)
      // Restaura foco ao elemento que estava ativo antes de abrir
      previouslyFocused.current?.focus()
    }
  }, [isOpen, onClose])

  return { initialFocusRef }
}
