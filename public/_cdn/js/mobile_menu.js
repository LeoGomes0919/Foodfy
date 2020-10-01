const mobile = document.querySelector('.mobile-menu');
const menu = document.querySelector('.site-menu');
mobile.addEventListener('click', function () {
  mobile.classList.toggle('active-menu');
  if (mobile.classList.contains('active-menu')) {
    menu.style.width = '250px';
  } else {
    menu.style.width = '0';
  }
});