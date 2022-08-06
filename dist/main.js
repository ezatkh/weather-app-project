const Cities = new city();
const render = new Renderer();
async function loadPage() {
  await Cities.saveDataFromDB();
  await render.renderData(Cities.cities);
}
window.addEventListener("DOMContentLoaded", async () => {
  loadPage();
  saveIcon();
  deleteIcon();
});

$("#btn").on("click", async function () {
  const cityName = $("#inputName").val();
  await Cities.getCityData(cityName);
  render.renderData(Cities.cities);
});

const saveIcon = async () => {
  $("#container").on("click", ".iconAdd", async function () {
    let cityObject = {
      name: $(this).closest(".favourite").find(".name").text(),
      temperature: $(this)
        .closest(".favourite")
        .find(".temperature")
        .text()
        .replace(/[^\d.-]/g, ""),
      condition: $(this).closest(".favourite").find(".condition").text(),
      conditionPic: $(this)
        .closest(".favourite")
        .find(".conditionPic")
        .attr("src"),
      favourite: true,
    };
    await Cities.saveCity(cityObject);
  });
};
const deleteIcon = async () => {
  $("#container").on("click", ".iconDelete", async function () {
    let cityName = $(this).closest(".favourite").find(".name").text();
    await Cities.removeCity(cityName);
  });
};
