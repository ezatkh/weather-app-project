class city {
  constructor() {
    this.cities = [];
  }

  async saveDataFromDB() {
    this.cities = [];
    const fetchWeatherData = await axios.get("/cities");
    for (let city of fetchWeatherData.data) {
      this.cities.splice(this.cities.length, 1, city);
    }
  }

  async getCityData(cityToSearch) {
    try {
      const fetchWeatherData = await axios.get(`/city/${cityToSearch}`);
      this.cities.push(fetchWeatherData.data);
    } catch {
      console.log(`${cityToSearch} does not exist`);
    }
  }

  saveCity(cityData, render) {
    axios.post(`/city`, cityData, function (err, res) {
      console.log(res);
    });
  }

  removeCity(cityName) {
    axios.delete(`/city/${cityName}`, function (err, cityDeleted) {
      console.log(cityDeleted);
    });
  }
}
