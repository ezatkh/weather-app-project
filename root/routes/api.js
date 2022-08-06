const express = require("express");
const City = require("../../model/city");
const router = express.Router();
const APK_KEY = "e614b588d80dbb02d7872f9ead9f1154";
const axios = require("axios");

const getWeatherData = (city) => {
  const fetchWeatherData = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APK_KEY}`
    )
    .then((res) => {
      const cityObject = {
        name: res.data.name,
        temperature: (res.data.main.temp - 273.15).toFixed(2),
        condition: res.data.weather[0].description,
        conditionPic: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
        favourite: false,
      };
      return cityObject;
    });
  return fetchWeatherData;
};

router.get("/city/:cityName", async function (request, respone) {
  cityParameter = request.params.cityName;
  try {
    const WeatherDataOfCity = await getWeatherData(cityParameter);
    respone.send(WeatherDataOfCity);
  } catch (error) {
    respone.sendStatus(401);
  }
});

router.get("/cities", async function (request, respone) {
  City.find({}).exec(function (err, cities) {
    respone.send(cities);
  });
});

router.post("/city", function (request, respone) {
  const newCity = request.body;
  if (Object.keys(newCity).length !== 0) {
    const city = new City({
      name: newCity.name,
      temperature: newCity.temperature,
      condition: newCity.condition,
      conditionPic: newCity.conditionPic,
      favourite: newCity.favourite,
    });
    city.save();
  }
  City.find({}).exec(function (err, cities) {
    respone.send(cities);
  });
});

router.delete("/city/:cityName", function (request, respone) {
  const cityName = request.params.cityName;
  City.findOneAndDelete({ name: cityName }).exec(function (err, res) {
    console.log(res);
  });
  respone.send("deleted success");
});

module.exports = router;
