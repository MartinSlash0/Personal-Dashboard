const dayOfWeek = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`]
const month = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`]

const weather = document.getElementById('weather')
const name = document.getElementById('name')
const coin = document.getElementById('coin')
const date = document.getElementById('date')
const time = document.getElementById('time')
const currentDate = new Date()


async function setBackgroundImg(){
    const res = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=space')
    const data = await res.json()
    const imgUrl = data.urls.full
    document.body.style.backgroundImage = `url(${imgUrl})`

    if(data.user.first_name !== null && data.user.last_name !== null){
        name.textContent = `By: ${data.user.first_name} ${data.user.last_name}`
    }else{
        name.textContent = `By: ${data.user.first_name}`
    }
    
}

async function setCoinValue(){
    const res = await fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    const data = await res.json()

    const html =  `
    <img src="${data.image.small}">
    <h3 class="text">${data.name}: ${data.market_data.current_price.usd.toFixed(3)}USD<h3>
    `
    coin.innerHTML = html
} 


date.innerText = `${dayOfWeek[currentDate.getDay()]}, ${currentDate.getDate()} ${month[currentDate.getMonth()]}`
time.innerText = `${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`


navigator.geolocation.getCurrentPosition(position => {
    console.log(position)
    
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => res.json())
        .then(data => {
            const html = `
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <div id="weather-location">
                <h3 class="text">${data.main.temp.toFixed(0)}° ${data.weather[0].main}<h3>
                <p class="text">${data.name}</p>
                </div>
            `
            weather.innerHTML = html
        })
});

setBackgroundImg()
setCoinValue()


