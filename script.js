const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const weatherIcon = document.getElementById("weatherIcon");

const themeToggle = document.getElementById("themeToggle");

const apiKey = "df5e97aeee149fc442b23eedbb625a10";

// Fetch Weather
async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (Number(data.cod) !== 200) {
            alert(data.message);
            return;
        }

        cityName.textContent = data.name;

        temperature.textContent =
            `🌡️ Temperature: ${data.main.temp}°C`;

        description.textContent =
            `☁️ Weather: ${data.weather[0].description}`;

        humidity.textContent =
            `💧 Humidity: ${data.main.humidity}%`;

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherIcon.alt =
            data.weather[0].description;

        // Save city
        localStorage.setItem("lastCity", city);

    } catch (error) {

        console.error(error);
        alert("Error fetching weather data");

    }
}

// Search Button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);

});

// Enter Key Support
cityInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        searchBtn.click();
    }

});

// Theme Toggle
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeToggle.textContent = "☀️";
    }else{
        localStorage.setItem("theme","light");
        themeToggle.textContent = "🌙";
    }

});

// Load Saved Theme
const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

// Load Last City
const lastCity = localStorage.getItem("lastCity");

if(lastCity){
    cityInput.value = lastCity;
    getWeather(lastCity);
}