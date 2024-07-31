document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "1e0674ffbc52c5dd1b579888824059b1"; 
    const form = document.getElementById("cityForm");
    const currentWeatherDiv = document.getElementById("current-weather");
    const dailyForecastDiv = document.getElementById("daily-forecast");
    let map;
    let marker;

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const city = document.getElementById("cityInput").value;
        getWeather(city);
    });

    function getWeather(city) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.weather) {
                    displayCurrentWeather(data);
                    fetchFiveDayForecast(city);
                    updateMap(data.coord.lat, data.coord.lon, city);
                } else {
                    currentWeatherDiv.innerHTML = `<p>City not found.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                currentWeatherDiv.innerHTML = `<p>Error fetching weather data.</p>`;
            });
    }

    function fetchFiveDayForecast(city) {
        const dailyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        fetch(dailyUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.list) {
                    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.endsWith('12:00:00'));
                    displayFiveDayForecast(dailyForecasts);
                } else {
                    dailyForecastDiv.innerHTML = `<p>No 5-day forecast data available.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching 5-day forecast data:", error);
                dailyForecastDiv.innerHTML = `<p>Error fetching 5-day forecast data.</p>`;
            });
    }

    function displayCurrentWeather(data) {
        const cityName = data.name;
        const currentDate = new Date();
        const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        const date = currentDate.toLocaleDateString();
        const temperature = data.main.temp;
        const weather = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        document.getElementById("city-name").textContent = cityName;
        document.getElementById("current-day").textContent = day;
        document.getElementById("current-date").textContent = date;
        document.getElementById("current-icon").src = iconUrl;
        document.getElementById("current-weather-description").textContent = weather;
        document.getElementById("current-temperature").textContent = `${temperature}°C`;
    }

    function displayFiveDayForecast(data) {
        let forecastContent = '';
        data.forEach(day => {
            const date = new Date(day.dt_txt);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const temperature = day.main.temp;
            const weather = day.weather[0].description;
            const iconCode = day.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

            forecastContent += `
                <div class="daily-forecast">
                    <p>${dayName}</p>
                    <img src="${iconUrl}" alt="Weather Icon">
                    <p>${weather}</p>
                    <p>${temperature}°C</p>
                </div>
            `;
        });
        dailyForecastDiv.innerHTML = forecastContent;
    }

    function initializeMap(lat, lon) {
        map = L.map('map').setView([lat, lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        marker = L.marker([lat, lon]).addTo(map)
            .bindPopup('Current city location')
            .openPopup();
    }

    function updateMap(lat, lon, city) {
        if (!map) {
            initializeMap(lat, lon);
        } else {
            map.setView([lat, lon], 10);
            if (marker) {
                marker.setLatLng([lat, lon])
                    .setPopupContent(`${city}`)
                    .openPopup();
            } else {
                marker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(`${city}`)
                    .openPopup();
            }
        }
    }
});
