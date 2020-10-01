const currentPath = location.pathname;
const itemMenu = document.querySelectorAll('.menu ul li a');

for (item of itemMenu) {
  if (currentPath.includes('/dashboard') &&
    currentPath.includes(item.getAttribute('href'))) {
    item.classList.add('dash-active-menu-item');
  } else if (currentPath.includes(item.getAttribute('href'))) {
    item.classList.add('site-active-menu-item');
  }
}

const VisibilityAndHiddenPassword = {
  inputPassword: document.querySelector('input[type=password]'),
  iconInput: document.querySelector('.show-hidden-password'),

  handleClickIconInput() {
    const { inputPassword, iconInput, iconInputReset } = VisibilityAndHiddenPassword;
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      iconInput.innerHTML = 'visibility_off';
    } else {
      inputPassword.type = 'password';
      iconInput.innerHTML = 'visibility';
    }
  },
}

const ImageGallery = {
  image: document.querySelector('.recipe-info header img'),
  previews: document.querySelectorAll('.recipe-gallery img'),

  setImage(event) {
    const { target } = event;
    ImageGallery.previews.forEach(item => {
      item.classList.remove('active');
    });

    target.classList.add('active');
    ImageGallery.image.src = target.src;
  }
}

const actionRecipe = document.querySelectorAll('#action-recipe');
const ingredientContainer = document.querySelector('.ingredients');
const preparationContainer = document.querySelector('.preparation');
const informationContainer = document.querySelector('.information');

actionRecipe.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.contains(ingredientContainer)) {
      const content = document.querySelector('.content-ingredients .content');
      content.classList.toggle('hidden');
      toggleInnerHtml(btn);
    }

    if (btn.contains(preparationContainer)) {
      const content = document.querySelector('.content-preparation .content');
      content.classList.toggle('hidden');
      toggleInnerHtml(btn);
    }

    if (btn.contains(informationContainer)) {
      const content = document.querySelector('.content-information .content');
      content.classList.toggle('hidden');
      toggleInnerHtml(btn);
    }
  });
});

function toggleInnerHtml(btn) {
  if (btn.innerHTML === 'MOSTRAR') {
    btn.innerHTML = 'ESCONDER'
  } else {
    btn.innerHTML = 'MOSTRAR'
  }
}

const pageSelected = document.querySelectorAll('.pagination a');
const currentPagination = location.search;

pageSelected.forEach(selected => {
  if (currentPagination.includes(selected.innerHTML)) {
    selected.classList.add('active-pagination');
  }
});



