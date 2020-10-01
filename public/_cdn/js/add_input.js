const addIngredient = document.querySelector('.add-ingredient');
const addPrepatation = document.querySelector('.add-preparation');
const btnAdd = document.querySelectorAll('#actions');
const ingredients = document.querySelector("#ingredients");
const preparation = document.querySelector("#preparation");

btnAdd.forEach(btn => {
  if (btn.addEventListener('click', () => {
    if (btn.contains(addIngredient)) {
      const fieldContainer = document.querySelectorAll(".field-ingredients");
      addInputs(fieldContainer, ingredients);
    }

    if (btn.contains(addPrepatation)) {
      const fieldContainer = document.querySelectorAll(".field-preparation");
      addInputs(fieldContainer, preparation);
    }
  }));
});

function addInputs(fieldContainer, parentContainer) {
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  if (newField.children[0].value == '') return true;

  newField.children[0].value = '';
  parentContainer.appendChild(newField);
}

const RemoveIngredient = document.querySelector('.rem-ingredient');
const RemovePreparation = document.querySelector('.rem-preparation');
const btnRemove = document.querySelectorAll('#remove');

btnRemove.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.contains(RemoveIngredient)) {
      removeInputs(ingredients);
    }

    if (btn.contains(RemovePreparation)) {
      removeInputs(preparation);
    }
  });
});

function removeInputs(parentContainer) {
  const totalChild = parentContainer.childElementCount;
  const index = parentContainer.lastElementChild;
  if (totalChild > 2) {
    parentContainer.removeChild(index);
  }
}
