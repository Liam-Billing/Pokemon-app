import { useState } from 'react'
import SearchForm from './components/SearchForm.jsx'
import Loader from './components/Loader.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import PokemonCard from './components/PokemonCard.jsx'
import { usePokemon } from './hooks/usePokemon.js'

export default function App() {
  const [query, setQuery] = useState('')
  const [lastQuery, setLastQuery] = useState('')
  const { data, loading, error } = usePokemon(query)

  function handleSearch(q) {
    setLastQuery(q)
    setQuery(q)
  }

  return (
    <div className="container">
      <header>
        <h1>Pokémon-app</h1>
      </header>

      <div className="card">
        <SearchForm onSearch={handleSearch} />
        {/* Statusrad: alltid synlig efter första sökningen */}
        {lastQuery && !loading && (
          <p className="helper" style={{ marginTop: 8 }}>
            Senast sökt: <strong>{lastQuery}</strong>
          </p>
        )}
      </div>

      {loading && <div className="card"><Loader /></div>}

      {/* Visa fel tydligt med senaste sökningen */}
      {error && (
        <div className="card">
          <ErrorMessage message={`${error} (sökning: "${lastQuery}")`} />
        </div>
      )}

      {/* Visa träff */}
      {data && !loading && !error && (
        <div className="card"><PokemonCard pokemon={data} /></div>
      )}

      {/* Om vi har sökt men varken error eller data (ska inte hända, men säkerhetsnät) */}
      {!loading && !error && !data && lastQuery && (
        <div className="card">
          <p className="helper">Ingen data att visa för "{lastQuery}".</p>
        </div>
      )}
    </div>
  )
}
