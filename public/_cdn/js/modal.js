const modalOverlay = document.getElementById('modal-confirmation');
const openModal = document.querySelectorAll('.open-modal');
const closeModal = document.querySelectorAll('.close');
const UserDeleteId = document.getElementById('idUser');
const userDelteName = document.getElementById('name-user-delete');

openModal.forEach(open => {
  open.addEventListener('click', () => {
    modalOverlay.classList.add('show-modal', 'fade');
    let name = open.dataset.name;
    let id = +open.dataset.id;
    UserDeleteId.value = id;
    userDelteName.innerHTML = name;
  });
});

closeModal.forEach(close => {
  close.addEventListener('click', () => {
    modalOverlay.classList.remove('show-modal', 'fade');
  });
});

