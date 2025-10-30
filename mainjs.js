
const apiKey = "4f6620bd3c73e72facd9b9b4d2957973";
const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const weatherCard = document.querySelector('.weather-card');
const alertMessage = document.querySelector('.alert-message');

// Display alert message
function showAlert(msg) {
  alertMessage.textContent = msg;
  alertMessage.style.display = "block";
}
function hideAlert() {
  alertMessage.style.display = "none";
}

// Handle API and UI logic
async function fetchWeather(city) {
  showLoader();
  hideAlert();
  weatherCard.style.display = "none";
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error('City not found!');
    const data = await response.json();
    populateWeatherCard(data);
    weatherCard.style.display = "flex";
  } catch (e) {
    showAlert("City not found! Please try again.");
  }
  hideLoader();
}

// Show loading indicator on button
function showLoader() {
  const btn = document.querySelector('.search-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
}
function hideLoader() {
  const btn = document.querySelector('.search-btn');
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
}

// Update UI with fetched weather data
function populateWeatherCard(data) {
  document.querySelector('.city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.querySelector('.main-temperature').textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector('.weather-description').textContent = capitalize(data.weather[0].description);
  document.querySelector('.humidity-value').textContent = data.main.humidity;
  document.querySelector('.clouds-value').textContent = data.clouds.all;
  document.querySelector('.pressure-value').textContent = data.main.pressure;
  document.querySelector('.weather-icon-state').innerHTML = getWeatherIcon(data.weather[0].id);
}

// Weather icons map
function getWeatherIcon(id) {
  if (id >= 200 && id <= 232) return '<i class="fa-solid fa-bolt"></i>';
  if (id >= 300 && id <= 321) return '<i class="fa-solid fa-cloud-rain"></i>';
  if (id >= 500 && id <= 531) return '<i class="fa-solid fa-cloud-showers-heavy"></i>';
  if (id >= 600 && id <= 622) return '<i class="fa-solid fa-snowflake"></i>';
  if (id >= 701 && id <= 781) return '<i class="fa-solid fa-smog"></i>';
  if (id === 800) return '<i class="fa-solid fa-sun"></i>';
  if (id >= 801 && id <= 804) return '<i class="fa-solid fa-cloud"></i>';
  return '<i class="fa-solid fa-question"></i>';
}

// Capitalize weather description
function capitalize(text) {
  return text
    ? text.charAt(0).toUpperCase() + text.slice(1)
    : "";
}

// Handle user submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  hideAlert();
  const city = cityInput.value.trim();
  if (!city) {
    showAlert('Please enter a city name.');
    return;
  }
  fetchWeather(city);
});

// Dismiss alert on click
alertMessage.addEventListener('click', hideAlert);

// Autofocus city input on load and fetch for default city
window.onload = () => {
  cityInput.focus();
  fetchWeather("Cairo");
};