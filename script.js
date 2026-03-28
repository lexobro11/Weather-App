const BASE_URL = "https://api.weatherapi.com/v1/";
const API_KEY = "2bf31856e78943a7b04105355262503";

// ELEMENTS
const locationName = document.querySelector("#locationName");
const currentCondition = document.querySelector("#currentCondition");
const localTime = document.querySelector("#localTime");
const currentTemp = document.querySelector("#currentTemp");
const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const uv = document.querySelector("#uv");
const rainChance = document.querySelector("#rainChance");
const currentIcon = document.querySelector("#currentIcon");
const currentRange = document.querySelector("#currentRange");

const pressure = document.querySelector("#pressure");
const visibility = document.querySelector("#visibility");
const cloud = document.querySelector("#cloud");
const windDir = document.querySelector("#windDir");

const weeklyContainer = document.querySelector("#weeklyContainer");
const hourlyContainer = document.querySelector("#hourlyContainer");

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

// API
async function getWeather(query) {
    const url = `${BASE_URL}forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=no&alerts=no`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    return await res.json();
}

// RENDER CURRENT
function renderCurrent(w) {
    locationName.textContent = `${w.location.name}, ${w.location.country}`;
    currentCondition.textContent = w.current.condition.text;
    localTime.textContent = `Local time: ${w.location.localtime}`;
    currentTemp.textContent = `${Math.round(w.current.temp_c)}°`;
    feelsLike.textContent = `Feels like ${Math.round(w.current.feelslike_c)}°`;
    humidity.textContent = `${w.current.humidity}%`;
    wind.textContent = `${w.current.wind_kph} km/h`;
    uv.textContent = w.current.uv;
    rainChance.textContent = `${w.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    currentIcon.src = "https:" + w.current.condition.icon;

    currentRange.textContent =
        `H: ${Math.round(w.forecast.forecastday[0].day.maxtemp_c)}° / L: ${Math.round(w.forecast.forecastday[0].day.mintemp_c)}°`;
}

// DETAILS
function renderDetails(w) {
    pressure.textContent = `${w.current.pressure_mb} mb`;
    visibility.textContent = `${w.current.vis_km} km`;
    cloud.textContent = `${w.current.cloud}%`;
    windDir.textContent = w.current.wind_dir;
}

// HOURLY
function renderHourly(w) {
    hourlyContainer.innerHTML = "";
    const hours = w.forecast.forecastday[0].hour.slice(0, 12);

    hours.forEach(h => {
        const div = document.createElement("div");
        div.className = "bg-slate-800 p-3 rounded-xl text-center min-w-[90px]";
        div.innerHTML = `
            <p>${h.time.split(" ")[1]}</p>
            <img src="https:${h.condition.icon}" class="mx-auto w-10"/>
            <p>${Math.round(h.temp_c)}°</p>
        `;
        hourlyContainer.appendChild(div);
    });
}

// WEEKLY
function renderWeekly(w) {
    weeklyContainer.innerHTML = "";

    w.forecast.forecastday.forEach(d => {
        const div = document.createElement("div");
        div.className = "bg-slate-800 p-4 rounded-xl flex justify-between items-center";

        div.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="https:${d.day.condition.icon}" class="w-10"/>
                <div>
                    <p>${new Date(d.date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                    <p class="text-sm text-gray-400">${d.day.condition.text}</p>
                </div>
            </div>
            <p>${Math.round(d.day.maxtemp_c)}° / ${Math.round(d.day.mintemp_c)}°</p>
        `;

        weeklyContainer.appendChild(div);
    });
}

// LOAD
async function loadWeather(query) {
    try {
        const w = await getWeather(query);
        renderCurrent(w);
        renderDetails(w);
        renderHourly(w);
        renderWeekly(w);
    } catch (err) {
        alert("City topilmadi!");
    }
}

// SEARCH
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) loadWeather(city);
});

// DEFAULT CITY darhol chiqadi
loadWeather("Tashkent");

// GEOLOCATION fon rejimida
setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
        pos => loadWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
        () => {}
    );
}, 1500);