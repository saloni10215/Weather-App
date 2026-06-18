const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

const themeToggle = document.getElementById("themeToggle");

const apiKey = "df5e97aeee149fc442b23eedbb625a10";

/* =========================
   WEATHER FUNCTION
========================= */

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        searchBtn.textContent = "Loading...";
        searchBtn.disabled = true;

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (Number(data.cod) !== 200) {

            cityName.textContent = "City Not Found";
            temperature.textContent = "🌡️ Temperature: --°C";
            feelsLike.textContent = "🤗 Feels Like: --°C";
            description.textContent = "☁️ Weather: --";
            humidity.textContent = "💧 Humidity: --%";
            wind.textContent = "🌬️ Wind Speed: -- m/s";
            weatherIcon.src = "";

            alert(data.message);
            return;
        }

        cityName.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `🌡️ Temperature: ${data.main.temp}°C`;

        feelsLike.textContent =
            `🤗 Feels Like: ${data.main.feels_like}°C`;

        description.textContent =
            `☁️ Weather: ${data.weather[0].description}`;

        humidity.textContent =
            `💧 Humidity: ${data.main.humidity}%`;

        wind.textContent =
            `🌬️ Wind Speed: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherIcon.alt =
            data.weather[0].description;

        /* SAVE LAST CITY */

        localStorage.setItem("lastCity", city);

    } catch (error) {

        console.error(error);
        alert("Error fetching weather data");

    } finally {

        searchBtn.textContent = "Search";
        searchBtn.disabled = false;

    }
}

/* =========================
   ENTER KEY SEARCH
========================= */

cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});

/* =========================
   DARK MODE
========================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";

    }

});

/* =========================
   LOAD LAST SEARCHED CITY
========================= */

window.addEventListener("load", () => {

    const lastCity = localStorage.getItem("lastCity");

    if (lastCity) {

        cityInput.value = lastCity;
        getWeather();

    }

});