
const weatherimgs={
    'Haze':'weather-icons/haze.png',
    'Clear': 'weather-icons/clear-sky.png',
    "Clouds":"weather-icons/clouds.png",
    "Drizzle":"weather-icons/drizzle.png",
    "Fog":"weather-icons/fog.png",
    "Mist":"weather-icons/mist.png",
    "Rain":"weather-icons/rain.png",
    "Snow":"weather-icons/snow.png",
    "Thunderstorm":"weather-icons/thunderstorm.png"
}
const weatherbg= {
    'haze': 'linear-gradient(to right, #3E5151, #DECBA4)',
    'Clear': 'linear-gradient(to right, #ff7e5f, #feb47b)', 
    'Rain': 'linear-gradient(to right, #00c6ff, #0072ff)', 
    'Snow': 'linear-gradient(to right, #e6dada, #274046)',
    'Clouds': 'linear-gradient(to right, #bdc3c7, #2c3e50)', 
    'Thunderstorm': 'linear-gradient(to right, #1e3c72, #2a5298)', 
    'Drizzle': 'linear-gradient(to right, #89f7fe, #66a6ff)', 
    'Mist': 'linear-gradient(to right, #6190e8, #a7bfe8)', 
    'Fog': 'linear-gradient(to right, #3E5151, #B1B1B1)'
}

const apikey="8f521fd63ae2d5f8da60942ca82e7301";
let apiurl=`https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric`;



async function getweather(cityname){
    let weather= await fetch(apiurl+`&q=${cityname}`);
    if(weather.status!=404){
        var data= await weather.json();
        document.querySelector(".weathertype").innerHTML=data.weather[0].main;
        document.querySelector('.cityname').innerHTML=data.name;
        document.querySelector('.temprature').innerHTML=data.main.temp+"\u00B0C";
        document.querySelector('.humidity').lastElementChild.innerHTML=data.main.humidity+ "% Humidity";
        document.querySelector('.wind').lastElementChild.innerHTML=`${(data.wind.speed*3.6)}`.substring(0,4)+ "Km/h  Speed";
        updateWeatherImage(data);
        
    }
    else{
        document.querySelector("#srch").value='';
        document.querySelector("#srch").placeholder="enter a city name!";

    }
}


function updateWeatherImage(weatherData) {
    const weatherCondition = weatherData.weather[0].main;
    const weatherImage = weatherimgs[weatherCondition] || "weathericon.svg";
    const weatherImageElement = document.querySelector('.weatherimg');
    weatherImageElement.src = weatherImage;

    const weatherbgs = weatherbg[weatherCondition] || "linear-gradient(135deg,rgb(92, 226, 58),rgb(99, 43, 204))";
    document.getElementsByClassName('card')[0].style.background=weatherbgs;    
}

async function main() {
    getweather("Delhi");
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementsByClassName("srchbtn")[0].addEventListener('click', () => {
            let cityname = document.querySelector("#srch").value
            getweather(cityname);
        });
        document.getElementById("srch").addEventListener("keydown",(event)=>{
            if(event.key=='Enter'){
                setTimeout(() => {
                    let cityname = document.querySelector("#srch").value
                    getweather(cityname);  
                }, 500);
                
        }
        })
    });
}

main(); 
