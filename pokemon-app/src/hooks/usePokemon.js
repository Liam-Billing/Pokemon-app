import { useEffect, useState } from 'react'

export function usePokemon(query) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) {
      setData(null)
      setError(null)
      return
    }

    const controller = new AbortController()

    async function fetchPokemon() {
      setLoading(true)
      setError(null)
      setData(null)
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`
        console.log('[usePokemon] fetching:', url)

        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
          const text = await res.text().catch(() => '')
          console.error('[usePokemon] http error', res.status, text)
          if (res.status === 404) throw new Error('NOT_FOUND')
          throw new Error(`HTTP_${res.status}`)
        }

        const json = await res.json()
        console.log('[usePokemon] success:', json?.name, '#'+json?.id)
        setData(json)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('[usePokemon] fail:', err)
        if (err.message === 'NOT_FOUND') setError('Pokémon hittades inte.')
        else if (err.message?.startsWith('HTTP_')) setError('Serverfel från API:t.')
        else setError('Nätverksfel. Kontrollera din uppkoppling och försök igen.')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
    return () => controller.abort()
  }, [query])

  return { data, loading, error }
}
