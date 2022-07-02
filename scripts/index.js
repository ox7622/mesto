const popupElement = document.querySelector('.popup');
const profileElement = document.querySelector('.profile');
let popupInputName = popupElement.querySelector('.popup__input_name');
let popupInputRole = popupElement.querySelector('.popup__input_role');
let profileName = profileElement.querySelector('.profile__name');
let profileRole = profileElement.querySelector('.profile__role');
const popupClose = popupElement.querySelector('.popup__close');
const profileEdit = profileElement.querySelector('.profile__edit-profile');
const formElement = popupElement.querySelector('.popup__form');

profileEdit.addEventListener('click', function () {
    popupElement.classList.add('popup_open');
});

function closeWindow() {
    popupElement.classList.remove('popup_open');
};

popupClose.addEventListener('click', closeWindow);

formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileRole.textContent = popupInputRole.value;
    closeWindow();
});
