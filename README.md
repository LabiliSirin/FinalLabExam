# Weather App

This is a simple weather app that provides current weather and a 5-day forecast for any city using the OpenWeatherMap API. It also displays the city's location on a map.

## Features

- Fetches and displays current weather information.
- Fetches and displays a 5-day weather forecast.
- Displays the city's location on an interactive map using Leaflet.js.

## Technologies Used

- HTML
- CSS
- JavaScript
- OpenWeatherMap API
- Leaflet.js

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/LabiliSirin/FinalLabExam.git
    ```
2. Navigate to the project directory:
    ```bash
    cd FinalLabExam
    ```
3. Open `index.html` in your preferred browser.

## Usage

1. Enter the name of the city you want to search for in the input field.
2. Click the `Get Weather` button.
3. View the current weather, 5-day forecast, and the city's location on the map.

## API Key

This project uses the OpenWeatherMap API. You need to get an API key from [OpenWeatherMap](https://openweathermap.org/api) and replace the placeholder in `app.js` with your API key:

```javascript
const apiKey = "YOUR_API_KEY";
