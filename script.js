// alt+ 0233 for é
const pokéSearchInput = document.getElementById('search-input');
pokéSearchInput.setAttribute('size',pokéSearchInput.getAttribute('placeholder').length);
const pokéSearchBtn = document.getElementById('search-button');

const spriteContainer = document.getElementById('sprite-container');
const pokémonID = document.getElementById('pokemon-id');
const pokémonName = document.getElementById('pokemon-name');
const pokémonHeight = document.getElementById('height');
const pokémonWeight = document.getElementById('weight');
const pokémonTypes = document.getElementById('types');
const statsList = document.querySelectorAll('.stats-list');

const pokéAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"
const typeIconsGen9 = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/"

// regex to strip down to lowercase name or id, with list of possible exceptions for male/female dimorphic mons

const fetchData = async () => {
  try {
    const res = await fetch(pokéAPI+pokéSearchInput.value);
    const data = await res.json();
    showPokéInfo(data)
  } catch (err) {
    console.log(err);
  }
};

const showSprite = (sprite, name) => `<img id="sprite" src="${sprite}" alt="${name}" />`

const showPokéInfo = (data) => {
	const { sprites, id, name, stats, types, height, weight } = data;
	const properName = () => `${name.charAt(0).toUpperCase() + name.slice(1)}`;
	const statArray = Object.values(stats)
	
	spriteContainer.innerHTML = `${showSprite(sprites.front_default, name)}`
	
	pokémonID.innerHTML = `No. ${id}`;
	pokémonName.innerHTML = `${properName()}`
	pokémonHeight.style.display = "grid";
	pokémonWeight.style.display = "grid";
	
	pokémonHeight.innerHTML = `
		<p class="stat-name">HEIGHT</p>
		<p class="stat-value">${height}</p>`
	pokémonWeight.innerHTML = `
		<p class="stat-name">WEIGHT</p>
		<p class="stat-value">${weight}</p>`
	
	pokémonTypes.innerHTML = '';
	types.forEach((element) => {
		const typeNumber = /(?<=\/type\/)([^\/]+)/gm
		let typeIconSuffix = element.type.url.match(typeNumber)+".png";
		let typeIconURL = typeIconsGen9+typeIconSuffix;
		pokémonTypes.innerHTML += `<img src="${typeIconURL}" alt="${element.type.name}" value="${element.type.name.toUpperCase()}">`
		typeIconURL = ''
	})
	
	statsList.forEach((element, index) => {
		const stat = statArray[index];
		const statNameDisplay = stat.stat.name.toUpperCase().split('-').join(' ');
		element.style.display = "grid";
		element.innerHTML = `
			<p class="stat-name">${statNameDisplay}</p>
			<p class="stat-value">${stat.base_stat}</p>`
	})
};

pokéSearchBtn.addEventListener('click', fetchData)
