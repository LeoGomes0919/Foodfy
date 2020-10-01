const userName = document.querySelector('.user-name');
const name = userName.innerHTML;

function myFunction(resolution) {
  if (resolution.matches) {
    let nameUpdate = userName.innerHTML;
    let initials = nameUpdate.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

    userName.innerHTML = initials;
  } else {
    userName.innerHTML = name;
  }
}

let resolution = window.matchMedia("(max-width: 50em)");
myFunction(resolution);
resolution.addEventListener('change', myFunction);

const menuMobile = document.querySelector('.dash-menu');
const elementToggleActive = document.querySelector('.dropdown-submenu');
const overlayMenu = document.querySelector('.overlay-menu');
const ActiveMenuMobile = {
  handleToggleMenu() {
    elementToggleActive.classList.toggle('active-menu');
    overlayMenu.classList.toggle('overly-visible');
  },

  handleOverlayToggle() {
    elementToggleActive.classList.remove('active-menu');
    if (menuMobile.classList.contains('active-menu')) {
      menuMobile.classList.remove('active-menu');
    }
    if (overlayMenu.classList.contains('overly-visible')) {
      overlayMenu.classList.remove('overly-visible');
    }
  },

  handleTogglePrimaryMenu() {
    menuMobile.classList.toggle('active-menu');
    overlayMenu.classList.toggle('overly-visible');
  }
}

const VeritcalMenuOptions = {
  handleActive() {
    const containerMenu = document.querySelector('.container-actions');
    containerMenu.classList.toggle('show');
  }
}

