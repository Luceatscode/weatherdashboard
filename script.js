console.log('hello moto')

fetch("https://api.openweathermap.org/data/2.5/forecast/?lat=40.680000&lon=-111.871430&units=imperial&appid=912a6ac255b445c0483994e006c77953", {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
const searchBar= document.getElementById('search-bar')
const searchInput= searchBar.getElementsByTagName('input')[0]
const searchButton= searchBar.getElementsByTagName('button')[0]
console.log(searchInput)
console.log(searchButton)

function handleRecentSearches (cityName){
    console.log(cityName)
    const searchHistory= JSON.parse(localStorage.getItem('recentCitySearches'))
    console.log(searchHistory)
    
    if (searchHistory!==null){
        console.log(searchHistory)
        
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
    newSearchHistory.forEach(element => {
        console.log(element)
        const newButton= document.createElement('button')
        newButton.textContent= element
        searchHistoryEl.appendChild(newButton)
        
    });
}

searchButton.addEventListener('click', function (){
    const inputText= searchInput.value
    console.log(inputText)
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
        console.log(data);

        handleRecentSearches(data[0].name)
    });
})










