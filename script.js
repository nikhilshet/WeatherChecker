

let days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", ]
let city = document.querySelector(".city");
let climate = document.querySelector(".climate");
let temp = document.querySelector(".temp");
let timeandDate = document.querySelector(".timeAndDate");
let locationBox = document.querySelector(".locBox");
let submitButton = document.querySelector(".submitBtn");
let speed = document.querySelector(".speed");
let visibility = document.querySelector(".visibility");
let pressure = document.querySelector(".pressure");
let direction = document.querySelector(".direction");
let chills = document.querySelector(".chill");
let humidity = document.querySelector(".humid");



submitButton.addEventListener("click" , function(){
    let location = locationBox.value.toLowerCase();
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'APIKEY',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };
   
    async function getData(location){
    try {
        const response = await fetch(`${url}${location}&format=json&u=c`, options);
        const weatherData = await response.json();
        console.log(weatherData);
        let todayDate = new Date(weatherData.current_observation.pubDate * 1000);
        let date = todayDate.toLocaleDateString('en-GB');
        let hour = todayDate.getHours();
        let minutes = todayDate.getMinutes();
        let day = todayDate.getDay();
        let merridean = 'AM'
        if(hour > 12){
            hour - 12;
            merridean = 'PM'
        }
    
    
        climate.textContent = weatherData.current_observation.condition.text;
        city.textContent = weatherData.location.city;
        temp.textContent = weatherData.current_observation.condition.temperature + "°C";
        timeandDate.textContent = `${hour}:${minutes} ${merridean} , ${date} , ${days[day]} `
        
        speed.textContent = weatherData.current_observation.wind.speed + " km/h";
        chills.textContent = weatherData.current_observation.wind.chill + " C";
        direction.textContent = weatherData.current_observation.wind.direction ;
    
        humidity.textContent = weatherData.current_observation.atmosphere.humidity + " %";
        visibility.textContent = weatherData.current_observation.atmosphere.visibility + " km";
        pressure.textContent = Math.floor(weatherData.current_observation.atmosphere.pressure) + " mb/hPa";
    
        
        
        weatherData.forecasts.forEach((e , i)=>{
                let date1 = new Date(e.date * 1000);
                document.querySelector(`.miniWeather${i + 1}`).textContent = e.text;
                document.querySelector(`.miniDate${i + 1}`).textContent = `${date1.toLocaleDateString('en-GB')}`;
                document.querySelector(`.miniDay${i + 1}`).textContent = e.day;
                document.querySelector(`.miniLow${i + 1}`).textContent = "Low- "+e.low+" °C";
                document.querySelector(`.miniHigh${i + 1}`).textContent = "High-  "+e.high+" °C";
    
        
                
        })
    } catch (error) {
        console.error(error);
    }
    }

    getData(location);
    
   

  
})

