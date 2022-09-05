import './index.css';

import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator, selectorsValidation } from "../components/FormValidator.js";
import { dataArray } from "../utils/initialCardsArray.js";


const indexSelectors = {
    profile: '.profile',
    buttonEditProfile: '.profile__edit-profile',
    buttonAddPicture: '.profile__add-photo',
    profileName: '.profile__name',
    profileRole: '.profile__role',
    nameInput: '.popup__input_field_name',
    roleInput: '.popup__input_field_role',
    popupAddPicture: '.popup_add-picture',
    popupEditProfile: '.popup_edit-profile',
    popupViewImage: '.popup_view-image'
}

const popupEditProfile = document.querySelector(indexSelectors.popupEditProfile);
const popupAddPicture = document.querySelector(indexSelectors.popupAddPicture);

const profileSection = document.querySelector(indexSelectors.profile);
const buttonProfileEdit = profileSection.querySelector(indexSelectors.buttonEditProfile);
const buttonAddPicture = profileSection.querySelector(indexSelectors.buttonAddPicture);

const userInfo = new UserInfo(indexSelectors.profileName, indexSelectors.profileRole);

const editProfileForm = new PopupWithForm({
    popupSelector: indexSelectors.popupEditProfile,
    handleFormSubmit: (userData) => {
        userInfo.setUserInfo(userData);
        editProfileForm.close();
    }
});

editProfileForm.setEventListeners();

const addPhotoForm = new PopupWithForm({
    popupSelector: indexSelectors.popupAddPicture,
    handleFormSubmit: (cardData) => {
        const card = renderCard(cardData);
        cardsSection.addItem(card);
        addPhotoValidation.disableSubmitButton();
        addPhotoForm.close();
    }
});

addPhotoForm.setEventListeners();

function handleOpenEditProfile() {
    editProfileValidation.clearErrors();
    const updatedData = userInfo.getUserInfo();
    editProfileForm.setInputValues(updatedData);
    editProfileForm.open();
};

const imagePopup = new PopupWithImage(indexSelectors.popupViewImage);
imagePopup.setEventListeners();

function handleCardClick({ name, link }) {
    imagePopup.open({ name, link });
};

function renderCard({ name, link }) {
    const card = new Card({ name, link, handleCardClick }, "#add-picture");
    return card.generateCard();
}

const cardsSection = new Section({
    items: dataArray,
    renderer: ({ name, link }) => {
        const card = renderCard({ name, link });
        cardsSection.addItem(card);
    }
}, '.cards');

cardsSection.renderItem();

buttonProfileEdit.addEventListener('click', handleOpenEditProfile);
buttonAddPicture.addEventListener('click', () => {
    addPhotoValidation.clearErrors();
    addPhotoForm.open();
})

const editProfileValidation = new FormValidator(selectorsValidation, popupEditProfile);
editProfileValidation.enableValidation();

const addPhotoValidation = new FormValidator(selectorsValidation, popupAddPicture);
addPhotoValidation.enableValidation();
