const apiKey = "df5e97aeee149fc442b23eedbb625a10";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const themeToggle = document.getElementById("themeToggle");

// Weather Function

async function getWeather(city){

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if(Number(data.cod)!==200){
            alert("City not found");
            return;
        }

        cityName.textContent = data.name;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        humidity.textContent =
            `${data.main.humidity}%`;

        description.textContent =
            data.weather[0].description;

        const iconCode =
            data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Sunrise & Sunset

        sunrise.textContent = new Date(
            data.sys.sunrise * 1000
        ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        sunset.textContent = new Date(
            data.sys.sunset * 1000
        ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        localStorage.setItem(
            "lastCity",
            city
        );

    }catch(error){

        alert("Error fetching weather");

    }

}

// Search Button

searchBtn.addEventListener("click",()=>{

    const city =
        cityInput.value.trim();

    if(city){
        getWeather(city);
    }

});

// Enter Key

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        const city =
            cityInput.value.trim();

        if(city){
            getWeather(city);
        }

    }

});

// Theme Toggle

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem(
            "theme",
            "dark"
        );

        themeToggle.textContent="☀";

    }else{

        localStorage.setItem(
            "theme",
            "light"
        );

        themeToggle.textContent="🌙";
    }

});

// Load Theme

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");
    themeToggle.textContent="☀";

}

// Load Last City

const lastCity =
    localStorage.getItem("lastCity");

if(lastCity){

    cityInput.value = lastCity;
    getWeather(lastCity);

}