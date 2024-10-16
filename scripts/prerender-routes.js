
const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

( async () => {

  const fs = require('fs');

  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);

  let fileContent = pokemonsIds.map(
    id => `/pokemons/${id}`
  ).join('\n');

  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  let pagesContent = pages.map(
    id => `/pokemons/page/${id}`
  ).join('\n');

  fileContent = fileContent + '\n' + pagesContent;

  const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then( res => res.json() );

  fileContent += '\n' + pokemonList.results.map(
    pokemon => `/pokemons/${pokemon.name}`
  ).join('\n');


  fs.writeFileSync('routes.txt', fileContent, 'utf8');

  console.log('routes.txt created');


})();
