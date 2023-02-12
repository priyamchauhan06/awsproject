
let weather = {
  apiKey: "0918cd3447664c7280630113231202",
  fetchWeather: function (city) {
    fetch(
      "http://api.weatherapi.com/v1/current.json?q=" +
        city +
        "&aqi=yes&key=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const name  = data.location.name;
    const { icon, text } = data.current.condition;
    const  humidity  = data.current.humidity;
	const  temp  = data.current.temp_c;
    const  speed  = data.current.wind_kph;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https:" + icon;
    document.querySelector(".description").innerText = text;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/2400x1200/?" + text + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
	this.fetchForecast(document.querySelector(".search-bar").value);
  },
    fetchForecast: function (city) {
	console.log(city);
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?q=" +
        city +
        "&days=15&aqi=no&alerts=no&key=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((forecast) => this.displayForecast(forecast));
  },
  displayForecast: function (forecast) {
	console.log(forecast)
	const days = forecast.forecast.forecastday
	const slidocontainer = document.getElementById("slidocontainer");
	slidocontainer.innerHTML =  ""
	for (let i = 0; i < days.length; i++) {
		date =  days[i].date;
		condition = days[i].day.condition.icon;
		max_temp = days[i].day.maxtemp_c;
		min_temp = days[i].day.mintemp_c;
		wind = days[i].day.maxwind_kph;
		humidity = days[i].day.avghumidity;
		slidocontainer.innerHTML =  slidocontainer.innerHTML +    `
                    <div class="slidocard swiper-slide">
                        <div class="card-content">
                            <h2 class="date">${date}</h2>
							<img src="https:${condition}" alt="" class="icon" />
                            <div class="description">Temprature : ${max_temp} / ${min_temp} °C</div>
							<div class="description">Wind Speed : ${wind} Km/h</div>
							<div class="description">Humidity : ${humidity} %</div>
                        </div>
                    </div>`
	}
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Leh");
weather.fetchForecast("Leh");






 
var swiper = new Swiper(".slide-content", {
    slidesPerView: 5,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });


