const FilterChefsRecipe = {
  input: document.querySelector('#filter'),
  listContainer: document.querySelector('.list-item'),
  list: document.querySelector('#list'),
  items: document.querySelectorAll('.item'),

  handleFilterChef() {
    const { input, listContainer, list } = FilterChefsRecipe;
    const option = listContainer.getElementsByTagName('option');
    const filtered = input.value.toUpperCase();
    for (let i = 0; i < option.length; i++) {
      txtValue = option[i].textContent || option[i].innerText;
      if (txtValue.toUpperCase().indexOf(filtered) > -1) {
        option[i].style.display = '';
        list.style.height = '168px';
      } else {
        option[i].style.display = 'none';
        list.style.height = 'auto';
      }
    }
  },

  handelActiveContainerSelectBox() {
    const { list } = FilterChefsRecipe;
    list.classList.toggle('hidden');
  },

  handleGetValueList() {
    const { items, list } = FilterChefsRecipe;
    const inputChef = document.querySelector('#input_chef');
    const idChef = document.querySelector('#id_chef');
    items.forEach(item => {
      if (item.addEventListener('click', () => {
        inputChef.value = item.innerText;
        idChef.value = item.value;
        list.classList.toggle('hidden');
      }));
    })
  },

  handleScrollContainer() {
    const { items, list } = FilterChefsRecipe;
    if (items.length > 3) {
      list.classList.add('scroll');
    } 
  }
}
FilterChefsRecipe.handleScrollContainer();
FilterChefsRecipe.handleGetValueList();



