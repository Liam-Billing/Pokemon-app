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
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`,
          { signal: controller.signal }
        )

        if (!res.ok) {
          if (res.status === 404) throw new Error('NOT_FOUND')
          throw new Error('HTTP_ERROR')
        }

        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name === 'AbortError') return
        if (err.message === 'NOT_FOUND') setError('Pokémon hittades inte.')
        else setError('Något gick fel. Försök igen senare.')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
    return () => controller.abort()
  }, [query])

  return { data, loading, error }
}
