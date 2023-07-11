import { Recipe } from "./Recipe.js";
import { UI } from "./UI.js";

// DOM Events
document
  .getElementById("product-form")
  .addEventListener("submit", async function (e) {
    // Override the default Form behaviour
    e.preventDefault();

    // Getting Form Values
    const name = document.getElementById("name").value,
      description = document.getElementById("description").value,
      measur = document.getElementById("measur").value,
      kitchen = document.getElementById("kitchen-list").value,
      measur_unit = document.getElementById("measur-list").value;

    // Create a new Oject Recipe
    const recipe = new Recipe(name, description, measur, measur_unit, kitchen);

    // Create a new UI instance
    const ui = new UI();

    // Input User Validation
    if (
      name === "" ||
      description === "" ||
      measur === "" ||
      measur_unit === "" ||
      kitchen === ""
    ) {
      return ui.showMessage(
        "Por favor, llenar los campos del formulario",
        "danger"
      );
    }

    // Save recipe
    let saveRecipe = await ui.addRecipe(recipe);
    console.log(saveRecipe);

    if (!saveRecipe) {
      return;
    }
    // ui.showMessage("Product Added Successfully", "success");
    ui.resetForm();
  });

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("recipe-details").classList.add("d-none");
  const ui = new UI();
  ui.getRecipes();
  ui.getKitchesList();
  ui.getMeasurList();
});

document.getElementById("recipe-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.getRecipe(e.target);
  e.preventDefault();
});

const goBackFn = () => {
  document.getElementById("recipe-details").classList.add("d-none");
  document.getElementById("app").classList.add("d-block");
};