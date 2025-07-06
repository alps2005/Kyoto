document.getElementById('search-button').addEventListener('click', function() {
    var input = document.getElementById('search-input').value;
    if (input === '') {
        document.getElementById('alert-empty').style.display = 'block';
        document.getElementById('alert-not-found').style.display = 'none';
        console.log("Campo vacio!");
        return;
    }

    document.getElementById('alert-empty').style.display = 'none';


    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`).then(data => {
        if (data.status == 404){
            document.getElementById('alert-not-found').style.display = 'block';
            document.getElementById('alert-empty').style.display = 'none';
            console.log("Pokemon no encontrado!");
            return;
        }
        document.getElementById('alert-not-found').style.display = 'none';
        console.log(data);
        return data.json();
    }).then(data => {
        var name = data.name;
        var id = data.id;
        var image = data.sprites.front_default;
        var species = data.species.name;
        var height = data.height;
        var weight = data.weight;
        var abilities = data.abilities.map(ability => ability.ability.name).join(' | ');
        var stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(' | ');
        var base_experience = data.base_experience;
        var pokeball = "";
        pokeball += `
        <div class="col m-3">
            <div class="card" style="width: 18rem;">
                    <img src="${image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center bold-font">${name.toUpperCase()}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>ID:</strong> ${id}</li>
                        <li class="list-group-item"><strong>Especie:</strong> ${species}</li>
                        <li class="list-group-item"><strong>Altura:</strong> ${height}m</li>
                        <li class="list-group-item"><strong>Peso:</strong> ${weight}kg</li>
                        <li class="list-group-item"><strong>Habilidades:</strong> ${abilities}</li>
                        <li class="list-group-item"><strong>Estadisticas:</strong> ${stats}</li>
                        <li class="list-group-item"><strong>Experiencia base:</strong> ${base_experience}</li>
                    </ul>
                    <div class="card-body text-center">
                        <a href="https://www.pokemon.com/us/pokedex/${name}" class="btn btn-primary m-3" target="blank">Mas
                            info</a>
                    </div>
                </div>
        </div>`;

        document.getElementById('pokemon-container').innerHTML += pokeball;
        document.getElementById('alert-empty', 'alert-not-found').style.display = 'none';
    })

})