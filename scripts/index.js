const popupElement = document.querySelector('.popup');
const profileElement = document.querySelector('.profile');
let popupInputName = popupElement.querySelector('.popup__input_field_name');
let popupInputRole = popupElement.querySelector('.popup__input_field_role');
let profileName = profileElement.querySelector('.profile__name');
let profileRole = profileElement.querySelector('.profile__role');
const popupClose = popupElement.querySelector('.popup__close');
const profileEdit = profileElement.querySelector('.profile__edit-profile');
const formElement = popupElement.querySelector('.popup__form');

function openPopup() {
    popupElement.classList.add('popup_open');
};

function closeWindow() {
    popupElement.classList.remove('popup_open');
};
function saveButtonHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileRole.textContent = popupInputRole.value;
    closeWindow();
};

popupClose.addEventListener('click', closeWindow);
formElement.addEventListener('submit', saveButtonHandler);
profileEdit.addEventListener('click', openPopup);