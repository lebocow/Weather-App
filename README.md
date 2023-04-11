# Overview

This Weather App is a React-based application that provides users with the current weather, hourly forecast, and a daily forecast for a specific location. Users can search for weather information by city, and they can also add and remove cities from their favorites list.

## Features

- Search for weather information by city
- Display current weather
- Display hourly forecast
- Display daily forecast
- Add and remove cities from favorites list
- Toggle between light and dark themes

## Components

- SearchBar: Allows users to search for a city's weather data
- CurrentWeather: Displays the current weather information
- HourlyForecast: Displays the hourly forecast information
- Forecast: Displays the daily forecast information
- ThemeToggleButton: Allows users to toggle between light and dark themes
- FavoritesToggleButton: Allows users to view their favorites list
- FavoritesDropdown: A dropdown menu to display the user's favorite cities and manage the favorites list

## Dependencies

- `react`: Required for creating React components
- `react-icons`: Provides icons for the application

## Contexts

- ThemeContext: Manages the application's theme state (dark or light mode)
- FavoriteContext: Manages the favorites list state

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Vite will automatically open your browser or you can manually navigate to `http://localhost:xxxx`, where 'xxxx' is the port number displayed in your terminal output.

## Usage

To use the Weather App, simply type the name of the city you want to search for in the search bar and hit Enter. The app will display the current weather, hourly forecast, and daily forecast for the specified location. You can add cities to your favorites list by clicking on the heart icon.

To access your favorites list, click the FavoritesToggleButton. From the FavoritesDropdown, you can remove cities from your favorites list or click on a city to view its weather data.

Toggle between light and dark themes using the ThemeToggleButton located in the top right corner of the app.
