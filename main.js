const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <div class ="card">
            <li class="card">
                <img class="card-image" src="${pokeman.image}"/>
                
                <div class ="container">
                    <h2 class="card-title"> ${pokeman.name}</h2>
                    <p class="card-subtitle">Type: ${pokeman.type}</p>

                    <a href="https://www.pokemon.com/us/pokedex/${pokeman.name}">
                    <button> check Stats</button>
                    </a>

                </div>
            </li>
        </div>
    `
        )
        .join('');
     pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();