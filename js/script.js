/* 1.sea necesario crear una lista <li>, 
hay div con id = "countries-list"
2.empezar por el fetch, modo estandar pero con async/await
3.ordenar los paises con el metodo sort(), 
convertir todo a mayusculas
5.lo que voy a necesitar: bandera, capital, poblacion, 
lado de la carretera
6.monstrar toda la informacion en una ventana flotante, crear un
boton para poder cerrarla
7. la ventana flotante tiene que quedarse (fixed?) y estar centrada
8.Permitido cambiar el HTML
9. Hay que anadir clases para poder disenar en css*/


/*
document.addEventListener('DOMContentLoaded', async () => {
    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3/all');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return an empty array on error
        }
    };

    const displayCountries = async () => {
        const countries = await fetchCountries();
        if (!countries.length) return;

        countries.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            return nameA.localeCompare(nameB);
        });

        const countriesList = document.getElementById('countries-list');
        countriesList.innerHTML = '';

        countries.forEach(country => {
            const flag = country.flags?.png; // Optional chaining
            const name = country.name.common;
            const countryDiv = document.createElement('div');
            countryDiv.className = 'country-item';

            countryDiv.innerHTML = `
                <img src="${flag}" alt="${name}" class="flag">
                <span class="country-name">${name}</span>
            `;

            countryDiv.addEventListener('click', () => {
                showCountryDetails(country); // Pass `country` correctly
            });

            countriesList.appendChild(countryDiv);
        });
    };

    const showCountryDetails = (country) => {
        if (!country) return; // Validate `country`

        const { flags, name, capital, population, driving } = country;

        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-close">&times;</span>
                <h2>${name.common}</h2>
                <img src="${flags?.png}" alt="${name.common}" class="popup-flag">
                <p><strong>Capital:</strong> ${capital ? capital[0] : 'N/A'}</p>
                <p><strong>Population:</strong> ${population.toLocaleString()}</p>
                <p><strong>Driving Side:</strong> ${driving ? driving[0] : 'N/A'}</p>
            </div>
        `;

        document.body.appendChild(popup);

        const closeButton = popup.querySelector('.popup-close');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
        });
    };

    displayCountries();
});*/

/*const countriesList = document.getElementById('countries-list');
const countryInfoDiv = document.getElementById('country-info');

// Fetch countries data from the API
const fetchCountriesData = async () => {
    const response = await fetch('https://restcountries.com/v3/all');
    const data = await response.json();
    return data;
};

// Sort countries alphabetically
const fetchCountriesAlphabetically = async () => {
    const countries = await fetchCountriesData();
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en', { sensitivity: 'base' }));
    return countries;
};

// Display countries data in the DOM
const displayedData = async () => {
    try {
        const countryData = await fetchCountriesAlphabetically();
        countryData.forEach((country) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src="${country.flags.png}" alt="Flag of ${country.name.common}" /> ${country.name.common}`;
            listItem.addEventListener('click', () => showCountryInfo(country));
            countriesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching countries data:', error);
    }
};

// Show detailed country information
const showCountryInfo = (country) => {
    countryInfoDiv.innerHTML = `
        <button id="close-btn">Close</button>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p>Population: ${country.population}</p>
        <p>Drives on the: ${country.car.side}</p>
    `;
    countryInfoDiv.style.display = 'block';
    document.getElementById('close-btn').addEventListener('click', hideCountryInfo);
};

// Hide the detailed country information
const hideCountryInfo = () => {
    countryInfoDiv.style.display = 'none';
};

// Initialize the display function when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayedData);*/

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the data from the API when the DOM is loaded
    fetchData();
  });
  
  // Fetch data from the API
  async function fetchData() {
    try {
      const response = await fetch('https://restcountries.com/v3/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const countries = await response.json();
  
      // Log the structure of the first country object for debugging
      console.log('First country object:', countries[0]);
  
      // Sort countries alphabetically by name
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en', {sensitivity: 'base'}));
      
      // Display countries on the page
      displayCountries(countries);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  // Display countries on the page
  function displayCountries(countries) {
    const countriesList = document.getElementById('countries-list');
    
    countries.forEach(country => {
      // Create a container for each country
      const countryContainer = document.createElement('div');
      countryContainer.classList.add('country');
      
      // Check and set the flag image
      const flagImg = document.createElement('img');
      const flagUrl = country.flags && country.flags.svg ? country.flags.svg : ''; // Ensure the flag URL exists
      console.log('Flag URL:', flagUrl); // Debugging statement
      if (flagUrl) {
        flagImg.src = flagUrl;
        flagImg.alt = `Flag of ${country.name.common}`;
        flagImg.classList.add('flag');
        
        // Add an event listener to the flag image
        flagImg.addEventListener('click', () => {
          displayCountryDetails(country);
        });
  
        // Append the flag image to the country container
        countryContainer.appendChild(flagImg);
      }
      
      // Add the country's name
      const countryName = document.createElement('p');
      countryName.textContent = country.name.common;
      
      // Append the name to the country container
      countryContainer.appendChild(countryName);
      
      // Append the country container to the countries list
      countriesList.appendChild(countryContainer);
    });
  }
  
  // Display detailed information about a country
  function displayCountryDetails(country) {
    // Create a modal container
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');
    
    // Create a content container for the modal
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    // Add the country's flag
    const flagImg = document.createElement('img');
    const flagUrl = country.flags && country.flags.svg ? country.flags.svg : ''; // Ensure the flag URL exists
    if (flagUrl) {
      flagImg.src = flagUrl;
      flagImg.alt = `Flag of ${country.name.common}`;
      modalContent.appendChild(flagImg);
    }
    
    // Add the country's name
    const countryName = document.createElement('h2');
    countryName.textContent = country.name.common;
    
    // Add the capital
    const capital = document.createElement('p');
    capital.textContent = `Capital: ${country.capital ? country.capital[0] : 'N/A'}`;
    
    // Add the population
    const population = document.createElement('p');
    population.textContent = `Population: ${country.population.toLocaleString()}`;
    
    // Add the side of the road
    const roadSide = document.createElement('p');
    roadSide.textContent = `Drives on the: ${country.car.side}`;
    
    // Append the elements to the modal content
    modalContent.appendChild(countryName);
    modalContent.appendChild(capital);
    modalContent.appendChild(population);
    modalContent.appendChild(roadSide);
    
    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modalContainer);
    });
    modalContent.appendChild(closeButton);
    
    // Append the modal content to the modal container
    modalContainer.appendChild(modalContent);
    
    // Append the modal container to the body
    document.body.appendChild(modalContainer);
  }