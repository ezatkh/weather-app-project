class Renderer {
  constructor() {
    this.weatherContainer = $("#container");
    this.weatherTemplateHTML = $("#weather-template");
  }

  renderData(cities) {
    this.weatherContainer.empty();
    const source = this.weatherTemplateHTML.html();
    const template = Handlebars.compile(source);
    const newHTML = template({ cities: cities });
    this.weatherContainer.append(newHTML);
  }
}
