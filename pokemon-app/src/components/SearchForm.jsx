import { useEffect, useRef, useState } from 'react'
import { sanitizeQuery } from '../utils/sanitize.js'

export default function SearchForm({ onSearch }) {
  const [value, setValue] = useState('')
  const [invalid, setInvalid] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const safe = sanitizeQuery(value)
    const isValid = safe.length > 0 && /^[a-z0-9-]+$/.test(safe)
    setInvalid(!isValid)
    console.log('[SearchForm] submitting:', JSON.stringify(value), '->', JSON.stringify(safe), 'valid=', isValid)
    if (!isValid) return
    onSearch(safe)
  }

  function handleDemo() {
    setValue('pikachu')
    onSearch('pikachu')
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="search">Sök Pokémon</label>
      <input
        ref={inputRef}
        id="search"
        name="search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="t.ex. pikachu eller 25"
        aria-invalid={invalid ? 'true' : 'false'}
        aria-describedby="search-help"
        inputMode="search"
        autoComplete="off"
      />
      <small id="search-help" className="helper">
        Endast bokstäver, siffror och bindestreck tillåts.
      </small>
      {invalid && (
        <div className="error" role="alert">
          Ogiltig inmatning. Försök igen.
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">Sök</button>
        <button type="button" onClick={handleDemo}>Testa Pikachu</button>
      </div>
    </form>
  )
}
