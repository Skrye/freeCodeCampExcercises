// alt+ 0233 for é
const pokéInfoContainer = document.getElementById("pokemon-information-container")
const init = (str) => {
  if (str === 'retro') {
    return pokéInfoContainer.innerHTML = `
		<div id="search-settings-container">
			<input id="search-input" placeholder="Type the name or ID of a Pokémon here" autocomplete="off" required>
  		<button id="search-button">Search</button>
		</div>
		<div id="flex-container">
			<div id="row-1" class="flex-row">
				<div id="sprite-container">
					<img id="sprite" src="" target"_blank">
				</div>
				<div id="basic-info">
					<div class="flex-row">
						<h4 id="id-prefix" class="basic-info">No. </h4>
						<h4 id="pokemon-id" class="basic-info">--</h4>
					</div>
					<h1 id="pokemon-name" class="basic-info">Pokémon Name</h1>
				</div>
			</div>
			<div id="row-2" class="flex-row">
				<div id="stats-container-left">
					<div id="hp-info" class="container">
						<div id="hp-bar"></div>
						<p id="hit-points" class="stat-name">HIT POINTS</p>
						<div id="hp-row" class="flex-row">
							<p id="hp" class="stat-value stats-list">--</p>
							<p id="max-hp" class="stat-value">/--</p>
						</div>
					</div>
					<div id="height-info" class="container">
						<p id="height-name" class="stat-name">HEIGHT</p>
						<p id="height" class="measurements stat-value">--</p>
					</div>
					<div id="weight-info" class="container">
						<p id="weight-name" class="stat-name">WEIGHT</p>
						<p id="weight" class="measurements stat-value">--</p>
					</div>
					<div id="types-info" class="types container">
						<p id="types-title" class="types">TYPES</p>
						<p id="types" class="types stat-name">--/<br>--</p>
						<div id="type-icons" class="types"></div>
					</div>
				</div>
				<div id="stats-container-right">
					<div id="attack-info" class="container">
						<p id="attack-name" class="stat-name">ATTACK</p>
						<p id="attack" class="stats-list stat-value">--</p>
					</div>
					<div id="defense-info" class="container">
						<p id="defense-name" class="stat-name">DEFENSE</p>
						<p id="defense" class="stats-list stat-value">--</p>
					</div>
					<div id="special-attack-info" class="container">
						<p id="special-attack-name" class="stat-name">SPECIAL ATTACK</p>
						<p id="special-attack" class="stats-list stat-value">--</p>
					</div>
					<div id="special-defense-info" class="container">
						<p id="special-defense-name" class="stat-name">SPECIAL DEFENSE</p>
						<p id="special-defense" class="stats-list stat-value">--</p>
					</div>
					<div id="speed-info" class="container">
						<p id="speed-name" class="stat-name">SPEED</p>
						<p id="speed" class="stats-list stat-value">--</p>
					</div>
				</div>
			</div>
		</div>`
  }
}

init('retro')

const pokéSearchInput = document.getElementById("search-input")
pokéSearchInput.setAttribute("size",
  pokéSearchInput.getAttribute("placeholder").length
)
const pokéSearchBtn = document.getElementById("search-button")

const spriteContainer = document.getElementById("sprite-container");
const pokémonID = document.getElementById("pokemon-id");
const pokémonName = document.getElementById("pokemon-name");
const pokéMaxHP = document.getElementById("max-hp");
const pokémonHeight = document.getElementById("height");
const pokémonWeight = document.getElementById("weight");
const pokémonTypes = document.getElementById("types");
const pokémonTypeIcons = document.getElementById("type-icons");
const statsLines = document.getElementById(".stats-lines");
const statsList = document.querySelectorAll(".stats-list");

const pokéAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"
const typeIconsGen9 =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/"

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
		showPokéInfo(data);
		return;
  } catch (err) {
    console.log(err)
    return alert("Pokémon not found")
  }
}

const showSprite = (sprite, name) => `<img id="sprite" src="${sprite}" alt="${name}" />`;

const showPokéInfo = (data) => {
  const { sprites, id, name, stats, types, height, weight } = data;
  // const properName = () => `${name.charAt(0).toUpperCase() + name.slice(1)}`;
  const statArray = Object.values(stats)
  spriteContainer.innerHTML = `${showSprite(sprites.front_default, name)}`;

  pokémonID.innerHTML = `${id}`;
  pokémonName.innerHTML = `${name.toUpperCase()}`; /* `${properName()}` does not pass test */
  pokémonHeight.style.display = 'grid';
  pokémonWeight.style.display = 'grid';

  pokémonHeight.innerHTML = `${height}`;
  pokémonWeight.innerHTML = `${weight}`;

  pokémonTypes.innerHTML = "";
	pokémonTypeIcons.innerHTML = "";
  types.forEach((element) => {
    const typeNumber = /(?<=\/type\/)([^\/]+)/gm
    let typeIconSuffix = element.type.url.match(typeNumber) + ".png"
    let typeIconURL = typeIconsGen9 + typeIconSuffix
    pokémonTypes.innerHTML += `<p>${element.type.name.toUpperCase()}</p>`
		pokémonTypes.style.display = "none";
		pokémonTypeIcons.innerHTML += `<img src="${typeIconURL}" alt="${element.type.name}">`;
    typeIconURL = ""
  })

  statsList.forEach((element, index) => {
    const stat = statArray[index]
    element.innerHTML = `${stat.base_stat}`;
		if (stat.stat.name === 'hp') {
			pokéMaxHP.innerHTML = `/${stat.base_stat}`
		};
  })
	
}

pokéSearchBtn.addEventListener("click", ()=> {
	let pokéURL = pokéAPI + pokéSearchInput.value;
	fetchData(pokéURL);
})
