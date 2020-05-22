/** Declaração de variaveis globais
 * Estado da aplicação (state)
 */
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoritesCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  console.log('js vinculado ao html');
  /**Inicializando estado dos objetos */
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('count-countries');
  countFavorites = document.querySelector('count-favorites');
  totalPopulationList = document.querySelector('total-population-countries');
  //prettier-ignore
  totalPopulationFavorites = 
  document.querySelector('total-population-favorites');
  numberFormat = Intl.NumberFormat('pt-BR');
  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('http://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag,
    };
  });
  favoritesCountries = allCountries;
  render();
}

/**Escrever os dados no html, através de funções menores */
function render() {
  renderCountryList();
  renderFavoritesList();
  renderSummary();
}

function renderCountryList() {
  let countriesHTML = document.createElement('div');

  allCountries.forEach((country) => {
    const { name, flag, id, population } = country;
    const countryHTML = `
    <div>
      <a id=${id} class="waves-effect waves-light btn">+</a>
    </div>
    <div>
      <img src="${flag}" alt="${name}">
    </div>
    <div>
      <ul>
        <li>${name}</li>
        <li>${numberFormat.format(population)}</li>
    </div>
    `;
    countriesHTML.innerHTML += countryHTML;
  });
  tabCountries.innerHTML = countriesHTML.innerHTML;
}

function renderFavoritesList() {
  let favoritesHTML = document.createElement('div');

  favoritesCountries.forEach((favoriteCountry) => {
    const { name, flag, id, population } = favoriteCountry;
    const favoriteHTML = `
      <div>
        <a id=${id} class="waves-effect waves-light btn">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${numberFormat.format(population)}</li>
      </div>
    `;
    favoritesHTML.innerHTML += favoriteCountry;
  });
  //console.log('***' + favoritesHTML.innerHTML);
  tabFavorites.innerHTML = favoritesHTML.innerHTML;
}
function renderSummary() {}
function handleCountryButtons() {}
