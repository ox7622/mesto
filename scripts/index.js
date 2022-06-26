const popupElement = document.querySelector('.popup');
const popupClose = popupElement.querySelector('.popup__close');
const popupSubmit = popupElement.querySelector('.popup__submit');
const profileEdit = document.querySelector('.profile__edit-profile');

profileEdit.addEventListener('click', function () {
    popupElement.classList.add('popup_open');
});

popupClose.addEventListener('click', function () {
    popupElement.classList.remove('popup_open');
});

let nameValue = popupElement.getElementsByClassName('popup_input-name').value;
console.log(nameValue);