let hplace = document.getElementById('cityName');
const dates = document.querySelectorAll('.forecast');
const select = document.querySelector('select');
select.addEventListener('change',(event)=> {
    console.log(event.target.value);
    let placeName = event.target.value;
    getData(placeName);
})

const weatherData = {
    windspeed: 'maxwind_kph',
    uv_index: 'uv',
    visibility_imp: 'avgvis_miles',
    humidity: 'avghumidity',
    chanceRain: 'daily_chance_of_rain',
    chanceSnow: 'daily_chance_of_snow'
}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e9a661870mshec63f80527e366dp17d8a7jsneafa747e7f6c',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

const updateWeather = (weatherObj) => {
    let weatherArr = weatherObj.forecast.forecastday;
    let current = document.querySelector('#currentWeather');
    console.log(weatherArr);
    current.children[0].children[0].textContent = weatherArr[0].day.maxtemp_c.toFixed(1)+'\xB0C';
    current.children[1].innerHTML = '';
    // updateCurrentWeather(weatherArr);
    for (const [key, value] of Object.entries(weatherData)) {
        let temp = document.createElement('DIV');
        temp.textContent = key + ': ' + weatherArr[0].day[value];
        temp.className = 'weatherText';
        temp.id = key; 
        current.children[1].append(temp);
        // console.log(`${key}: ${value}`);
      }


    weatherArr.forEach((el,index) => {
        let dateString = el.date.split('-');
        dates[index].children[0].textContent = dateString[1].slice(1)+'/'+ dateString[2];
        dates[index].children[1].children[0].textContent = el.day.maxtemp_c.toFixed(1)+'\xB0C';
        dates[index].children[2].innerHTML = '';

        //Create Img
        let img = document.createElement('img');
        img.src = 'https://' + el.day.condition.icon;
        img.style.width = '10vw';
        img.alt = el.day.condition.text;
        dates[index].children[2].append(img);
        // dates[index].children[2].innerHTML =el.day.condition.;
    });
}

const updateCurrentWeather = (weatherObj) => {
   
}


function getData (placeName,days=5) {
    console.log(2,hplace,placeName);
    hplace.textContent = placeName;
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${placeName}&days=5`, options)
	.then(response => response.json())
	.then(response => updateWeather(response))
	.catch(err => console.error(err));
}


getData('London');

