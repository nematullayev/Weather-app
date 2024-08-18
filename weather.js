const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weahter-box");
const error404 = document.querySelector(".not-found");
const weahterDetailes = document.querySelector(".weahter-details");

search.addEventListener("click", () => {
  const APIKey = "523064decbd9394dd193bb1cc35a3a2e";
  const city = document.querySelector(".search-box input").value;

  if (city == ``) return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == `404`) {
        container.style.height = "440px";
        weatherBox.classList.remove(`active`);
        weahterDetailes.classList.remove(`active`);
        error404.classList.add(`active`);
        return;
      }
      container.style.height = "555px";
      weatherBox.classList.add(`active`);
      weahterDetailes.classList.add(`active`);
      error404.classList.remove(`active`);

      const image = document.querySelector(".weahter-img");
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const humidity = document.querySelector(".hum");
      const wind = document.querySelector(".win");

      switch (json.weather[0].main) {
        case `Clear`:
          image.src = `./image/clear.png`;
          break;
        case `Rain`:
          image.src = `./image/rain.png`;
          break;
        case `Snow`:
          image.src = `./image/snow.png`;
          break;
        case `Clouds`:
          image.src = `./image/cloud.png`;
          break;
        case `Mist`:
          image.src = `./image/mist.png`;
          break;
        case `Haze`:
          image.src = `./image/mist.png`;
          break;

        default:
          image.src = `./image/cloud.png`;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
