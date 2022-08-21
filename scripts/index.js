import { Card } from "./Card.js";
import { FormValidator, selectorsValidation} from "./FormValidator.js";
import { dataArray } from "./initialCardsArray.js";
import { openPopup, closeWindow } from "./utils.js";

const cardsContainer = document.querySelector('.cards');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddPhoto = document.querySelector('.popup__form_type_add-photo');

//попапы
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPicture = document.querySelector('.popup_add-picture');
const popups = document.querySelectorAll('.popup');

const profileSection = document.querySelector('.profile');
const popupInputName = popupEditProfile.querySelector('.popup__input_field_name');
const popupInputRole = popupEditProfile.querySelector('.popup__input_field_role');
const profileName = profileSection.querySelector('.profile__name');
const profileRole = profileSection.querySelector('.profile__role');

const popupPictureTitle = popupAddPicture.querySelector('.popup__input_field_place-name');
const popupPictureLink = popupAddPicture.querySelector('.popup__input_field_place-link');

//кнопки
const profileEditButton = profileSection.querySelector('.profile__edit-profile');
const addPictureButton = profileSection.querySelector('.profile__add-photo');

function handleOpenEditProfile() {
    popupInputName.value = profileName.textContent;
    popupInputRole.value = profileRole.textContent;
    editProfileValidation.enableValidation();
    editProfileValidation.clearErrors();
    openPopup(popupEditProfile);
};

function handleOpenAddPhoto() {
    openPopup(popupAddPicture);

};

function handleSaveEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileRole.textContent = popupInputRole.value;
    closeWindow(popupEditProfile);
};

function handleSaveAddPhoto(evt) {
    evt.preventDefault();
    const cardData = {
        name: popupPictureTitle.value,
        link: popupPictureLink.value
    }
    const card = renderCard(cardData);
    cardsContainer.prepend(card);
    evt.target.reset();
    addPhotoValidation.disableSubmitButton();
    closeWindow(popupAddPicture);
};

function renderCard(cardDetails) {
    const card = new Card(cardDetails, "#add-picture");
    return card.generateCard();
}

function handleClosePopups(evt, popup) {
    if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close')) {
        closeWindow(popup);
    }
};

dataArray.forEach((cardDetails) => {
    const card = renderCard(cardDetails);
    cardsContainer.append(card);
});


popups.forEach(popup => popup.addEventListener('mousedown', (evt) => {
    handleClosePopups(evt, popup);
}));


profileEditButton.addEventListener('click', handleOpenEditProfile);
addPictureButton.addEventListener('click', handleOpenAddPhoto);
formEditProfile.addEventListener('submit', handleSaveEditProfile);
formAddPhoto.addEventListener('submit', handleSaveAddPhoto);

const editProfileValidation = new FormValidator(selectorsValidation, popupEditProfile);
editProfileValidation.enableValidation();

const addPhotoValidation = new FormValidator(selectorsValidation, popupAddPicture);
addPhotoValidation.enableValidation();