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

const searchInput= document.getElementById('search-bar').getElementsByTagName('input')[0]
const searchButton= document.getElementById('search-bar').getElementsByTagName('button')[0]
console.log(searchInput)
console.log(searchButton)

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
    });
})