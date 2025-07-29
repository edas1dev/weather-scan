const apiKey = 'dc5d47c4e45c43eebbe113113252907'
const cityInput = document.getElementById('city-input')
const searchButton = document.getElementById('search-btn')
const weatherResult = document.getElementById('weather-result')
const errorMessage = document.getElementById('error-message')

async function getWeatherData(city) {
    errorMessage.classList.add('hidden')
    weatherResult.classList.add('hidden')
    try {
        const result = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`)
        if (!result.ok) {
            throw new Error('Cidade não encontrada.')
        }
        const weatherData = await result.json()
        renderWeatherData(weatherData)
        
    } catch (error) {
        errorMessage.classList.remove('hidden')
        weatherResult.classList.add('hidden')
    }
}

function renderWeatherData(weatherData) {
    weatherResult.classList.remove('hidden')
    weatherResult.innerHTML = `
        <h2 id="city-name">${weatherData.location.name}</h2>
            <p id="local-time" class="local-time">${weatherData.location.localtime}</p>

            <div class="weather-main">
                <img id="weather-icon" src="${weatherData.current.condition.icon}" alt="Ícone do tempo">
                <p id="temperature">${weatherData.current.temp_c} °C</p>
            </div>
            <p id="condition">${weatherData.current.condition.text}</p>

            <div class="weather-details">
                <div class="detail-item">
                    <span>Sensação</span>
                    <strong id="feels-like">${weatherData.current.feelslike_c} °C</strong>
                </div>
                <div class="detail-item">
                    <span>Umidade</span>
                    <strong id="humidity">${weatherData.current.humidity} %</strong>
                </div>
                <div class="detail-item">
                    <span>Vento</span>
                    <strong id="wind-speed">${weatherData.current.wind_kph} km/h</strong>
                </div>
                <div class="detail-item">
                    <span>Pressão</span>
                    <strong id="pressure">${weatherData.current.pressure_mb} hPa</strong>
                </div>
                <div class="detail-item">
                    <span>Visibilidade</span>
                    <strong id="visibility">${weatherData.current.vis_km} km</strong>
                </div>
                <div class="detail-item">
                    <span>Índice UV</span>
                    <strong id="uv-index">${weatherData.current.uv}</strong>
                </div>
            </div>
    `
}
searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.toLowerCase().trim()
    if (cityName) {
        getWeatherData(cityName)
    }
})
