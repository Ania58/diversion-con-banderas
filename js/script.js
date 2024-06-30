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




    document.addEventListener('DOMContentLoaded', async () => {
        const countriesList = document.getElementById('countries-list');
        const countryInfo = document.createElement('div');
        countryInfo.id = 'country-info';
        countryInfo.innerHTML = `
            <button id="close-info">Cerrar</button>
            <img id="info-flag" src="" alt="Bandera del país">
            <p id="info-name"></p>
            <p id="info-capital"></p>
            <p id="info-population"></p>
            <p id="info-driving-side"></p>
        `;
        document.body.appendChild(countryInfo);
    
        const closeInfoButton = document.getElementById('close-info');
        const infoFlag = document.getElementById('info-flag');
        const infoName = document.getElementById('info-name');
        const infoCapital = document.getElementById('info-capital');
        const infoPopulation = document.getElementById('info-population');
        const infoDrivingSide = document.getElementById('info-driving-side');
    
        closeInfoButton.addEventListener('click', () => {
            countryInfo.classList.remove('show');
        });
    
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const countries = await response.json();
                return countries;
            } catch (error) {
                console.error('Error fetching countries:', error);
                return [];
            }
        };
    
        const renderFlags = (countries) => {
            countriesList.innerHTML = ''; 
            countries.forEach(country => {
                const countryContainer = document.createElement('div');
                countryContainer.classList.add('country-container');
    
                const flag = document.createElement('img');
                flag.src = country.flags.svg;
                flag.alt = `Bandera de ${country.name.common}`;
                flag.classList.add('country-flag');
                flag.addEventListener('click', () => showCountryDetails(country));
    
                const name = document.createElement('p');
                name.textContent = country.name.common;
                name.classList.add('country-name');
    
                countryContainer.appendChild(flag);
                countryContainer.appendChild(name);
                countriesList.appendChild(countryContainer);
            });
        };
    
        const showCountryDetails = (country) => {
            infoFlag.src = country.flags.svg;
            infoName.textContent = `Nombre: ${country.name.common}`;
            infoCapital.textContent = `Capital: ${country.capital ? country.capital[0] : 'Desconocida'}`;
            infoPopulation.textContent = `Población: ${country.population.toLocaleString()}`;
            infoDrivingSide.textContent = `Lado de conducción: ${country.car.side}`;
            countryInfo.classList.add('show');
        };
    
        const countries = await fetchCountries();
        countries.sort((a, b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));
        renderFlags(countries);
    });