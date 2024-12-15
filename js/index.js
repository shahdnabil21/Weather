



// key =2cf92da1d5cb4b6192f145901241312 
let cityName = document.querySelector("#cityName");
let submit = document.querySelector("#submit");
let city = 'Cairo';
async function getCityName() {
    city = cityName.value;
}
submit.addEventListener('click',function(){
    getCityName()
    getWeather(city)
})
cityName.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        getCityName();  
        getWeather(city); 
        clearSearch() 
    }
});

// const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=2cf92da1d5cb4b6192f145901241312&q=${city}&days=3`
async function getWeather() {
const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=2cf92da1d5cb4b6192f145901241312&q=${city}&days=3`
    let req = await fetch (apiUrl)
    let data = await req.json()
    console.log(data);
    displayWeather(data) 
    displayFurcast1(data)
    displayFurcast2(data)
    
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function displayWeather(data) {
    let chosenCity ={
        city: data.location.name,  
        temp: data.current.temp_c,  
        day: '' ,  
        month: '', 
        desc: data.current.condition.text,  
        icon: data.current.condition.icon,
    }
    let date = new Date(data.location.localtime);
    let day = daysOfWeek[date.getDay()];
    let month = months[date.getMonth()];
    let dayMonth = date.getDate();
         
    

    document.querySelector("#city").innerHTML = chosenCity.city;
    document.querySelector("#temp").innerHTML = chosenCity.temp + "°C";
    document.querySelector("#today").innerHTML = day;
    document.querySelector("#todaysDate").innerHTML = dayMonth + month;
    document.querySelector("#status").innerHTML = chosenCity.desc;
    document.querySelector("#icon1").setAttribute("src", "https:" + chosenCity.icon);
    

}
async function displayFurcast1(data) {
    let nextDay = {
        day: '',
        icon2: data.forecast.forecastday[1].day.condition.icon,
        temp1: data.forecast.forecastday[1].day.maxtemp_c,  
        temp2: data.forecast.forecastday[1].day.mintemp_c,  
        desc: data.forecast.forecastday[1].day.condition.text, 
    };
    let date = new Date(data.forecast.forecastday[1].date)
    let day = daysOfWeek[date.getDay()];
    
    document.querySelector("#tommorow").innerHTML = day;
    document.querySelector("#icon2").setAttribute("src", "https:" + nextDay.icon2);
    document.querySelector("#tempL1").innerHTML = nextDay.temp1 + "°C";
    document.querySelector("#tempL2").innerHTML = nextDay.temp2 + "°";
    document.querySelector("#desc").innerHTML = nextDay.desc;

}


async function displayFurcast2(data) {
    let afternextDay = {
        day: '',
        icon3: data.forecast.forecastday[2].day.condition.icon,
        temp1: data.forecast.forecastday[2].day.maxtemp_c,  
        temp2: data.forecast.forecastday[2].day.mintemp_c,  
        desc2: data.forecast.forecastday[2].day.condition.text, 
    };
    let date = new Date(data.forecast.forecastday[2].date)
    let day = daysOfWeek[date.getDay()];
    
    document.querySelector("#aftertommorow").innerHTML = day;
    document.querySelector("#icon3").setAttribute("src", "https:" + afternextDay.icon3);
    document.querySelector("#tempR1").innerHTML = afternextDay.temp1 + "°C";
    document.querySelector("#tempR2").innerHTML = afternextDay.temp2 + "°";
    document.querySelector("#desc2").innerHTML = afternextDay.desc2;
}


getWeather(city);

function clearSearch(){
    cityName.value = ''
}