# Sky Pulse - Weather Forecast Application

Sky Pulse is a real-time weather forecast application that provides weather updates based on the user's location or a city search. Built with a clean, responsive design, it displays the current weather conditions and a 3-day weather forecast.

## Features
- **Real-time Weather Updates**: Fetches weather information based on the user's location or a city search.
- **3-Day Forecast**: Displays weather data for the next three days.
- **Responsive Design**: Works seamlessly across devices (desktop, tablet, mobile).
- **Weather Information**: Includes temperature, wind speed, humidity, and weather condition.
  
## Technologies Used
- **HTML**: Structure of the application.
- **CSS**: Styling for the responsive design.
- **JavaScript**: Dynamic functionality for fetching and displaying weather data.
- **APIs**:
  - **OpenCage Geocoding API**: For obtaining location data based on latitude and longitude.
  - **WeatherAPI**: For fetching weather data, including current weather and forecasts.

## How It Works
1. The app fetches the user's current location using the browser’s Geolocation API or allows users to search for weather in any city.
2. It sends a request to the **OpenCage Geocoding API** to retrieve location data.
3. The location is then used to query **WeatherAPI** for current weather and a 3-day forecast.
4. The data is displayed on the app’s interface with information like temperature, humidity, wind speed, and weather conditions.


