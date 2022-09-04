import './index.css';

import { Card } from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { FormValidator, selectorsValidation } from "../scripts/components/FormValidator.js";
import { dataArray } from "../scripts/initialCardsArray.js";


const indexSelectors = {
    profile: '.profile',
    editProfileButton: '.profile__edit-profile',
    addPictureButton: '.profile__add-photo',
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
const profileEditButton = profileSection.querySelector(indexSelectors.editProfileButton);
const addPictureButton = profileSection.querySelector(indexSelectors.addPictureButton);

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
    editProfileForm.setInputValues(indexSelectors.nameInput, indexSelectors.roleInput, updatedData);
    editProfileForm.open();
};

function handleCardClick(name, link) {
    const imagePopup = new PopupWithImage({ name, link }, indexSelectors.popupViewImage);
    imagePopup.setEventListeners();
    imagePopup.open();
};

function renderCard(cardDetails) {
    cardDetails = { name: Object.values(cardDetails)[0], link: Object.values(cardDetails)[1] };
    const card = new Card({ data: cardDetails, handleCardClick }, "#add-picture");
    return card.generateCard();
}

const cardsSection = new Section({
    items: dataArray,
    renderer: (cardDetails) => {
        const card = renderCard(cardDetails);
        cardsSection.addItem(card);
    }
}, '.cards');

cardsSection.renderItem();

profileEditButton.addEventListener('click', handleOpenEditProfile);
addPictureButton.addEventListener('click', () => {
    addPhotoValidation.clearErrors();
    addPhotoForm.open();
})

const editProfileValidation = new FormValidator(selectorsValidation, popupEditProfile);
editProfileValidation.enableValidation();

const addPhotoValidation = new FormValidator(selectorsValidation, popupAddPicture);
addPhotoValidation.enableValidation();
