/** Declaração de variaveis globais
 * Estado da aplicação (state)
 */
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoritesCountries = [];

let totalCountries = 0;
let totalPopulation = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  console.log('js vinculado ao html');
  /**Inicializando estado dos objetos */
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  totalCountries = document.querySelector('#totalCountries');
  totalPopulation = document.querySelector('#totalPopulation');
  totalFavorites = document.querySelector('#totalFavorites');
  //prettier-ignore
  totalPopulationFavorites = 
  document.querySelector('#totalPopulationFavorites');
  numberFormat = Intl.NumberFormat('pt-BR');
  /**fetchCountries() Comentado porque o site estava travando ao ler o arquivo.
   * Foi realizado a gravação dos dados no arquivo countriesDataBD
   */
  fetchCountries();
  //countriesDataBD();
});

async function countriesDataBD() {
  allCountries = countriesData.data
    .map((country) => {
      const { numericCode, translations, population, flag } = country;
      return {
        id: numericCode,
        name: translations.pt,
        population,
        flag,
      };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  /**Comentado, pois traz todos os paises de country no painel favorite */
  //favoritesCountries = allCountries;
  render();
}

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
  /**Comentado, pois traz todos os paises de country no painel favorite */
  //favoritesCountries = allCountries;
  render();
}

/**Escrever os dados no html, através de funções menores */
function render() {
  renderCountryList();
  renderFavoritesList();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = document.createElement('div');
  console.log(allCountries);
  allCountries.forEach((country) => {
    const { name, flag, id, population } = country;
    const countryHTML = `
    <div class="conteiner-itens">
      <a id=${id} class="btn-floating btn-small waves-effect waves-light light-blue" alt="Clique para adicionar o pais aos favoritos"><i class="material-icons">arrow_forward</i></a>
      <img src="${flag}" alt="${name}">
      <ul>
        <li>${name}</li>
        <li>${numberFormat.format(population)}</li>
      </ul>
    </div>
    `;
    countriesHTML.innerHTML += countryHTML;
  });
  tabCountries.innerHTML = countriesHTML.innerHTML;
}

function renderFavoritesList() {
  let favoritesHTML = document.createElement('div');

  favoritesCountries.forEach((country) => {
    const { name, flag, id, population } = country;
    const favoriteHTML = `
      <div class="conteiner-itens">
        <a id=${id} class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons" alt="Clique para retirar o pais aos favoritos">arrow_back</i></a>
        <img src="${flag}" alt="${name}">
        <ul>
          <li>${name}</li>
          <li>${numberFormat.format(population)}</li>
        </ul>
      </div>
    `;
    favoritesHTML.innerHTML += favoriteHTML;
  });
  tabFavorites.innerHTML = favoritesHTML.innerHTML;
}

function renderSummary() {
  /**Renderizar os valores de Countries */
  //returnando o total de paises
  const sumCountries = allCountries.length;
  totalCountries.innerHTML = sumCountries;

  //retornando o total da população
  const sumPopulation = allCountries.reduce((acumulator, current) => {
    return acumulator + current.population;
  }, 0);
  totalPopulation.innerHTML = numberFormat.format(sumPopulation);

  /**Renderizar os valores de Favorites Countries */
  //returnando o total de paises favoritos
  const sumFavorites = favoritesCountries.length;
  totalFavorites.innerHTML = sumFavorites;

  //retornando o total da população favoritos, através de reduce() que realiza soma através da iteração
  const sumPopulationFavorite = favoritesCountries.reduce(
    (acumulator, current) => {
      return acumulator + current.population;
    },
    0
  );
  totalPopulationFavorites.innerHTML = numberFormat.format(
    sumPopulationFavorite
  );
}

function handleCountryButtons() {
  //retorna uma node list e converto para Array com Array.from()
  const countryButtons = Array.from(tabCountries.querySelectorAll('a'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('a'));
  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  /**Busca o elemento pelo find atraves do ID. Retorna elemento unico. */
  const countrytoAdd = allCountries.find((country) => country.id === id);
  /**Espalha os dados do vetor, adiciona novo dado */
  favoritesCountries = [...favoritesCountries, countrytoAdd];

  /**Ordena o vetor por ordem ascendente. */
  favoritesCountries = orderListAsc(favoritesCountries);

  /**Atualizar a lista, sem o id inserido em favoritos, atraves do filter()
   * que gera nova lista e reatribui a allCountries
   */
  allCountries = allCountries.filter((country) => country.id !== id);
  allCountries = orderListAsc(allCountries);
  render();
}

function removeFromFavorites(id) {
  /**Remover o elemento da lista de favoritos */
  const favoriteAdd = favoritesCountries.find((country) => country.id === id);

  //**Selecionar o elemento e inseri-lo ao vetor allCountries */
  allCountries = [...allCountries, favoriteAdd];
  allCountries = orderListAsc(allCountries);

  /**Adicionar o elemento na lista de allCountries */
  favoritesCountries = favoritesCountries.filter(
    (country) => country.id !== id
  );
  favoritesCountries = orderListAsc(favoritesCountries);
  render();
}

/**Ordernar vetores ascendente */
function orderListAsc(lista) {
  return lista.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}
