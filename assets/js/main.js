const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function showPokemonDetail(pokemonId) {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = "block";

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(pokemon => {
        document.getElementById('modalPokemonName').innerText = pokemon.name;
        document.getElementById('modalPokemonImage').src = pokemon.sprites.other.dream_world.front_default;
        document.getElementById('modalPokemonDetails').innerHTML = `
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Base Experience: ${pokemon.base_experience}</p>
            <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p>Abilities: ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
        `;
    });
}

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('pokemonModal').style.display = "none";
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('pokemonModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


function convertPokemonToLi(pokemon) {
    const types = pokemon.types.map(type => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('');
    return `<li class="pokemon" onclick="showPokemonDetail(${pokemon.id})">
        <span class="number">#${String(pokemon.id).padStart(3, '0')}</span>
        <span class="name">${pokemon.name}</span> 
        <div class="detail">
            <ol class="types">
                ${types}
            </ol>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </div>
    </li>`;
}

function loadPokemonItems(offset, limit) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
        const pokemons = data.results;
        const promises = pokemons.map(pokemon => fetch(pokemon.url).then(response => response.json()));
        Promise.all(promises).then(pokemons => {
            const newHtml = pokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML += newHtml;
        });
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
