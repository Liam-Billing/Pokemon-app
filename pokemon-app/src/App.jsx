import { useState } from 'react'
import SearchForm from './components/SearchForm.jsx'
import Loader from './components/Loader.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import PokemonCard from './components/PokemonCard.jsx'
import { usePokemon } from './hooks/usePokemon.js'

export default function App() {
  const [query, setQuery] = useState('')
  const { data, loading, error } = usePokemon(query)

  return (
    <div className="container">
      <header>
        <h1>Pokémon-sök</h1>
        <p className="helper">Skriv ett namn (t.ex. <em>pikachu</em>) eller ett id (t.ex. <em>25</em>).</p>
      </header>

      <div className="card">
        <SearchForm onSearch={setQuery} />
      </div>

      {loading && <div className="card"><Loader /></div>}
      {error && <div className="card"><ErrorMessage message={error} /></div>}
      {data && !loading && !error && (
        <div className="card"><PokemonCard pokemon={data} /></div>
      )}
    </div>
  )
}