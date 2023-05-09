console.log('hello moto')

// fetch("https://api.openweathermap.org/data/2.5/forecast/?lat=40.680000&lon=-111.871430&units=imperial&appid=912a6ac255b445c0483994e006c77953", {
//     method: 'GET',
//     credentials: 'same-origin',
//     redirect: 'follow',
// })
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
const currentWeatherEl= document.getElementById('current-weather')
const fiveDayForecastEl= document.getElementById('five-day')
const currentWeatherHeader= currentWeatherEl.getElementsByTagName('h1')[0]
const currentWeatherTemp= currentWeatherEl.getElementsByTagName('p')[0]
const currentWeatherWind= currentWeatherEl.getElementsByTagName('p')[1]
const currentWeatherHumidity= currentWeatherEl.getElementsByTagName('p')[2]

console.log(currentWeatherHumidity)

const searchBar= document.getElementById('search-bar')
const searchInput= searchBar.getElementsByTagName('input')[0]
const searchButton= searchBar.getElementsByTagName('button')[0]

function handleRecentSearches (cityName){
    const searchHistory= JSON.parse(localStorage.getItem('recentCitySearches'))
    
    if (searchHistory!==null){
        
        localStorage.setItem('recentCitySearches', JSON.stringify([
            cityName,
            ...searchHistory
        ]))
    } else{
        localStorage.setItem('recentCitySearches', JSON.stringify([
            cityName,
        ]))
    }
    // Loop to show recent searches buttons
    const newSearchHistory= JSON.parse(localStorage.getItem('recentCitySearches'))
    const searchHistoryEl= document.getElementById('search-history')
    const filteredHistory= [...new Set(newSearchHistory)]
    

    filteredHistory.forEach(element => {
        const newButton= document.createElement('button')
        newButton.textContent= element
        searchHistoryEl.appendChild(newButton)
        
    });
}

searchButton.addEventListener('click', function (){
    const inputText= searchInput.value
    const fetchUrl= `https://api.openweathermap.org/geo/1.0/direct?q=${inputText}&limit=1&appid=912a6ac255b445c0483994e006c77953`
    fetch (fetchUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=912a6ac255b445c0483994e006c77953
        const currentWeatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=912a6ac255b445c0483994e006c77953`
        fetch (currentWeatherUrl, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response)
                currentWeatherHeader.innerHTML= response.name
                currentWeatherTemp.innerHTML= `Temp: ${response.main.temp} Fahrenheit`
                currentWeatherWind.innerHTML= `Wind Speed: ${response.wind.speed} MPH`
                currentWeatherHumidity.innerHTML= `Humidity: ${response.main.humidity} %`
            })
        const fiveDayUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=912a6ac255b445c0483994e006c77953`   

        getFiveDayForecast().then(function (response) {
                response.forEach(function(item){
                    const card= document.createElement('div')
                    card.classList.add('card')
                    const cardHeader= document.createElement('h3')
                    const cardTemp= document.createElement('p')
                    const cardWind= document.createElement('p')
                    const cardHumidity= document.createElement('p')
                    cardHeader.innerHTML= item.date
                    cardTemp.innerHTML= item.temp
                    cardWind.innerHTML= item.windSpeed
                    cardHumidity.innerHTML= item.humidity
                    card.appendChild(cardHeader)
                    card.appendChild(cardTemp)
                    card.appendChild(cardWind)
                    card.appendChild(cardHumidity)
                    fiveDayForecastEl.appendChild(card)

                })


            })
        
        
        
        
        
        
        console.log(data);

        handleRecentSearches(data[0].name)
    });
})

function getFiveDayForecast(){
    const dummyFiveDayForecast= [
        {
            date: 'May 7th',
            temp: '70 Degrees',
            humidity: '68 % Humidity',
            windSpeed: '10 mph'
        },
        {
            date: 'May 8th',
            temp: '72 Degrees',
            humidity: '69 % Humidity',
            windSpeed: '11 mph'
        },
        {
            date: 'May 9th',
            temp: '71 Degrees',
            humidity: '70 % Humidity',
            windSpeed: '9 mph'
        },
        {
            date: 'May 10th',
            temp: '74 Degrees',
            humidity: '68 % Humidity',
            windSpeed: '9 mph'
        },
        {
            date: 'May 11th',
            temp: '73 Degrees',
            humidity: '67 % Humidity',
            windSpeed: '12 mph'
        },
    ]
    return Promise.resolve(dummyFiveDayForecast)
    


}










