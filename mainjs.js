// main var 
const mainInput = document.querySelector(".city-input");
const subBtn = document.querySelector(".subBtn");
const apiKey = "4f6620bd3c73e72facd9b9b4d2957973";
const msg = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather"); 
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let city = "Cairo";
function callApi () {
    subBtn.addEventListener("click" , function(event){
        event.preventDefault();
        if(mainInput.value === ""){
        showError("Please Enter A City!");
        }
        else{
            msg.textContent = "";
            msg.classList.remove("displayy");
            city = mainInput.value.trim();
            generate(city , apiKey);
            mainInput.value = "";
        }
    });    
}

async function generate(city , apiKey){
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    try{
    const response = await fetch(link);
    const data = await response.json();
    console.log(data);
    if(data.cod != 404){
        showData(data);
    }
    else{
        showError("Please Enter A Valid City");
    }
    }
    catch(error){
        showError("Oops There Is A Problem Try Again Later")
    }
}

function showData (data) {
    const {
        name: cityName,
        clouds: {all:cloudsTemp},
        main: {
            temp: tempHeat,
            pressure: pressurePer,
            humidity: humidityPer
        },
        weather: [{id: ID}]
    } = data;
    
    weatherDiv.classList.add("show");
    const card = document.querySelector(".card");
    card.classList.add("extend"); 
    document.querySelector(".city").textContent = `${cityName}`;

    document.querySelector(".state").innerHTML = `${state(ID)}`;

    document.querySelector(".temp").textContent = `${(tempHeat - 273.25).toFixed(1)}°C`;

    document.querySelector(".details").textContent = `${detailed(ID)}`;
    
    document.querySelector(".lapPerHum").textContent = `${humidityPer}%`;
    document.querySelector(".lapPerCloud").textContent = `${cloudsTemp}%`;
    document.querySelector(".lapPerPre").textContent = `${pressurePer}Mpe`;

}

function state(ID) {
    let icon = "";

    switch (true) {
        case (ID >= 200 && ID <= 232):
            icon = '<i class="fa-solid fa-bolt"></i>';
            break;
        case (ID >= 300 && ID <= 321):
            icon = '<i class="fa-solid fa-cloud-rain"></i>'; 
            break;
        case (ID >= 500 && ID <= 531):
            icon = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
            break;
        case (ID >= 600 && ID <= 622):
            icon = '<i class="fa-solid fa-snowflake"></i>'; 
            break;
        case (ID >= 701 && ID <= 781):
            icon = '<i class="fa-solid fa-smog"></i>'; 
            break;
        case (ID === 800):
            icon = '<i class="fa-solid fa-sun"></i>';
            break;
        case (ID >= 801 && ID <= 804):
            icon = '<i class="fa-solid fa-cloud"></i>'; 
            break;
        default:
            icon = '<i class="fa-solid fa-question"></i>'; 
    }

    return icon;
}
function detailed(ID) {
    switch (true) {
        case (ID >= 200 && ID <= 232):
            return "Thunderstorm";
        case (ID >= 300 && ID <= 321):
            return "Drizzle";
        case (ID >= 500 && ID <= 531):
            return "Rain";
        case (ID >= 600 && ID <= 622):
            return "Snow";
        case (ID >= 701 && ID <= 781):
            return "Atmosphere (Mist/Fog/Smoke)";
        case (ID === 800):
            return "Clear Sky";
        case (ID >= 801 && ID <= 804):
            return "Clouds";
        default:
            return "Unknown";
    }
}


function showError (message){
    if(msg.hideTimeout) clearTimeout(msg.hideTimeout);
    msg.textContent = message;
    msg.classList.add("displayy");    
    msg.hideTimeout = setTimeout(() => {
        msg.classList.remove("displayy");
        
    }, 2000);
    msg.hideTimeout = setTimeout(()=>{msg.textContent = "";}, 3000)
    
}




window.onload = () => {
    callApi();
};