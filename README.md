# pokemon-app

En liten, responsiv React-app där jag kan söka efter Pokémon (via namn eller ID) och få upp bild, namn, typer, vikt och längd. Datan hämtas från PokéAPI.

## Kom igång

cd pokemon-app

npm install

npm run dev

## För test
npm test


## Hur man använder

1. Skriv ett namn (t.ex. pikachu) eller ett ID (t.ex. 25).

2. Tryck Sök.

3. Om Pokémon finns visas ett kort med info. Om inte, visas ett tydligt felmeddelande.


## Kort om koden

React + Vite för enkel setup och snabb utveckling.

usePokemon (egen hook) sköter API-anrop, loading och fel.

SearchForm har inputvalidering (endast a–z, 0–9 och bindestreck).

PokemonCard visar bilden och nyckeldata.

Felhantering: 404 visar “Pokémon hittades inte.”, andra fel visar ett generellt meddelande.

## Val

Jag valde React + Vite för att komma igång snabbt. En egen hook gjorde det tydligt att separera dataloggik från UI. Jag prioriterade enkel och responsiv layout, tydliga felmeddelanden och grundläggande validering. Testerna täcker inputsanering och huvudflödet (sök + 404).
Med mer tid hade jag lagt till lite mer visuellt polish per Pokémon-typ.
