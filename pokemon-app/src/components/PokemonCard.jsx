import { capitalize, toKg, toMeters } from '../utils/formatters.js'

export default function PokemonCard({ pokemon }) {
  const img =
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default ||
    ''

  const types = pokemon?.types?.map((t) => t.type?.name) ?? []

  return (
    <article className="pokemon" aria-labelledby="poke-title">
      <div className="pokemon-media">
        {img ? (
          <img
            src={img}
            alt={`Bild på ${capitalize(pokemon.name)}`}
            loading="lazy"
            width="260"
            height="260"
          />
        ) : (
          <div className="helper">Ingen bild tillgänglig</div>
        )}
      </div>

      <div className="pokemon-details">
        <div className="pokemon-header">
          <h2 id="poke-title">
            {capitalize(pokemon.name)} <span className="helper">#{pokemon.id}</span>
          </h2>
          <div className="types" aria-label="Typer">
            {types.map((t) => (
              <span key={t} className="type">{capitalize(t)}</span>
            ))}
          </div>
        </div>

        <div className="info-grid" role="list">
          <div role="listitem"><strong>Vikt:</strong> {toKg(pokemon.weight)} kg</div>
          <div role="listitem"><strong>Längd:</strong> {toMeters(pokemon.height)} m</div>
        </div>
      </div>
    </article>
  )
}
