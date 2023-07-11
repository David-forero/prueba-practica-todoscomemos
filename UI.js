/**
 * User Interface Class
 */
const URL = "https://interno.todoscomemos.com";

export class UI {
  async getRecipes() {
    const response = await fetch(`${URL}/api/kitchens/recipes`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    result.map((recipe) => {
      const recipesList = document.getElementById("recipe-list");
      const element = document.createElement("div");

      element.innerHTML = `
    <div class="card text-center mb-4">
        <div class="card-body">
            <strong>Nombre de la receta</strong>: <p id="${recipe.id}" class="text-primary m-0" style="cursor: pointer">${recipe.name} </p> 
            <strong>Descripción</strong>: ${recipe.description} - 
            <strong>Measur</strong>: ${recipe.measur}
            
        </div>
    </div>
`;
      recipesList.appendChild(element);
    });
  }

  async getKitchesList() {
    const response = await fetch(`${URL}/api/kitchens/options/kitchens`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    
    result.map((kitchen) => {
      const recipesList = document.getElementById("kitchen-list");

      const element = document.createElement("option");
      element.id = kitchen.id;
      element.value = kitchen.id;
      element.text = kitchen.name

      recipesList.appendChild(element);
    });
  }

  async getMeasurList() {
    const response = await fetch(`${URL}/api/kitchens/options/measured_units`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    result.map((measur) => {
      const recipesList = document.getElementById("measur-list");

      const element = document.createElement("option");
      element.id = measur.id;
      element.value = measur.id;
      element.text = measur.unit

      recipesList.appendChild(element);
    });
  }


  async addRecipe(recipe) {
    try {
      const response = await fetch(`${URL}/api/kitchens/recipes`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: recipe.name,
          description: recipe.description,
          measur: recipe.measur,
          measur_unit: recipe.measur_unit,
          kitchen: recipe.kitchen,
        }),
      });

      if ((response.status === 400)) {
        this.showMessage("Error al guardar receta", "danger");
        return false;
      }

      this.getRecipes();
      this.showMessage("Guardado Correctamente", "success");

      return true;
    } catch (error) {
      console.log("⭕️ Error save recipe", error);
      this.showMessage("Error al guardar receta", "danger");
      return false;
    }
  }

  /**
   * Reset Form Values
   */
  resetForm() {
    document.getElementById("product-form").reset();
  }

  async getRecipe(e) {
    const response = await fetch(`${URL}/api/kitchens/recipes/details/${e.id}`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });

    if ((response.status === 400)) {
      this.showMessage("Error al guardar receta", "danger");
      return false;
    }

    const result = await response.json();

    console.log(result);

    document.getElementById('App').classList.add('d-none')
    document.getElementById('recipe-details').classList.add('d-block')
    

  

    const recipesList = document.getElementById("recipe-details");
    const element = document.createElement("div");

    element.innerHTML = `

    <h2 id="goBack" class="text-primary text-bold" onclick="window.location.reload()"><-- Atrás</h2>

    <img src="https://images.wallpaperscraft.com/image/single/peanuts_nuts_plate_107866_1024x768.jpg" width="100%" height="500px" />
        

        <h1 class="mt-3">${result.name}</h1>

        <p>${result.description}</p>

        <h3>Ingredientes</h3>
      <ul>
      ${result.details.ingredients.map(item => {
        return `
          <li>
              ${item.ingredient_name} - ${item.qty}${item.measur_unit}
          </li>
        `
       })}
      </ul>
`;
    recipesList.appendChild(element);
    
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    // Show in The DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    // Insert Message in the UI
    container.insertBefore(div, app);

    // Remove the Message after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}
