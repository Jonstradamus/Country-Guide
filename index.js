const container = document.querySelector('#container');
const resultado = document.querySelector('#resultado');
const searchBtn = document.querySelector('#search-btn');
const inputCountry = document.querySelector('#country-input');


let countries = [ ];

    
const Country_API = async ( ) => {
    try{
        const API_COUNTRY = await fetch('https://restcountries.com/v3.1/all');
        const data = await API_COUNTRY.json( );
        countries = [...data];
        console.log(data)
    }catch(error){
        console.log(error);
    }
}
Country_API();


inputCountry.addEventListener('input', async e => { 
    e.preventDefault( );
    const filtercountries = countries.filter(country => country.name.common.toLowerCase().startsWith(inputCountry.value.toLowerCase( )));
resultado.innerHTML = "";

  if (filtercountries.length > 10) {
    resultado.innerHTML += '<span id="error">You have to be more specific on your search</span>';
  }

  if (filtercountries.length >= 1 && filtercountries.length < 10) {
  
   
    
    for (let i = 0; i < filtercountries.length; i++) {
      resultado.innerHTML += `
        <div class='bandera'>
        <img src='${filtercountries[i].flags.svg}' class ='flags'>
            <h2 class = 'tittle'>${filtercountries[i].name.common}</h2>
        </div>
        `;
    }
  }

  const Clima = async (lat,lon) => {
    try{
        const ApiClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cc389fba4f5ce9463c74c81ccf274672&units=metric&lang={es}`);
        const data = await ApiClima.json( );
        return data;
        
    }catch(error){;
        console.log(error);
    }
  };

    if (filtercountries.length ===1 && inputCountry.value !== "" ) {
      
        const lat = filtercountries[0].latlng[0];
      
        const lon = filtercountries[0].latlng[1];
     
        const climaresult  =  await Clima (lat,lon);

      
    resultado.innerHTML = "";
        resultado.innerHTML += 
        `
        <div class='container-flags'>
        <a href='https://en.wikipedia.org/wiki/Flag_of_${filtercountries[0].name.common}' target="_blank"><img src='${filtercountries[0].flags.svg}' class ='flag'></a>
            
            <a href='https://en.wikipedia.org/wiki/${filtercountries[0].name.common}' target="_blank" class='name-country'>${filtercountries[0].name.common}</a>
            
            <div class='info'>
            <p><a href='https://en.wikipedia.org/wiki/Demographics_of_${filtercountries[0].name.common}' target="_blank" class='link'>Population: ${filtercountries[0].population}</a></p>
            
            <a href='https://en.wikipedia.org/wiki/${filtercountries[0].capital}' target="_blank" class='link'>Capital: ${filtercountries[0].capital}</a>
            
            <p class='descripcion'>Region: ${filtercountries[0].region}</p>
            <p class='descripcion'>Temperature: ${climaresult.main.temp} C° </p>
            <p class='descripcion'>Weather: ${climaresult.weather[0].description}</p>

                

            </div>
        </div>
        `



    

 }
});
