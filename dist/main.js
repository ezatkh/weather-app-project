const Cities = new city();
const render = new Renderer();
async function loadPage() {
  await Cities.saveDataFromDB();
  render.renderData(Cities.cities);
}
window.addEventListener("DOMContentLoaded", async () => {
  loadPage();
  saveIcon();
  deleteIcon();
});

$("#btn").on("click", async function () {
  const cityName = $("#inputName").val();
  $("#inputName").val("");
  await Cities.getCityData(cityName);
  render.renderData(Cities.cities);
});

const saveIcon = () => {
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
    Cities.saveCity(cityObject);
    await Cities.saveDataFromDB();
    $(this).hide();
    $(this).closest(".favourite").find("#delete").show();
  });
};
const deleteIcon = () => {
  $("#container").on("click", ".iconDelete", async function () {
    let cityName = $(this).closest(".favourite").find(".name").text();
    Cities.removeCity(cityName);
    await Cities.saveDataFromDB();
    $(this).hide();
    $(this).closest(".favourite").find("#add").show();
  });
};
