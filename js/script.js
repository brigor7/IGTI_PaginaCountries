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
  /**Inicializando variáveis */
  tabCountries = document.querySelector('tab-countries');
  tabFavorites = document.querySelector('tab-favorites');
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
    /**Retorno com destruction - quando o nome e o atributo são iguais
     * colocar somente o nome do atributo sem os dois pontos :
     */
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag,
    };
    /**Retorno classico
    return {
      id: country.numericCode,
      name: country.translations.pt,
      population: country.population,
      flag: country.flag,
    };
     */
    render();
  });
  console.log(allCountries);
}

/**Escrever os dados no html, através de funções menores */
function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  renderCountryList();
}

function renderCountryList() {}
function renderFavorites() {}
function renderSummary() {}
function handleCountryButtons() {}
