import './index.css';
import Api from '../components/Api.js';
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator, selectorsValidation } from "../components/FormValidator.js";
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { selectorsCard } from '../utils/constants.js';

const indexSelectors = {
    profile: '.profile',
    buttonEditProfile: '.profile__edit-profile',
    buttonAddPicture: '.profile__add-photo',
    profileName: '.profile__name',
    profileRole: '.profile__role',
    profileAvatar: ".profile__avatar",
    nameInput: '.popup__input_field_name',
    roleInput: '.popup__input_field_role',
    popupAddPicture: '.popup_add-picture',
    popupEditProfile: '.popup_edit-profile',
    popupViewImage: '.popup_view-image',
    popupConfirm: '.popup_confirm',
    popupAvatar: '.popup_change-avatar',
    popupSubmit: ".popup__submit"
}

// popups
const popupEditProfile = document.querySelector(indexSelectors.popupEditProfile);
const popupAddPicture = document.querySelector(indexSelectors.popupAddPicture);
const popupChangeAvatar = document.querySelector(indexSelectors.popupAvatar);

const profileSection = document.querySelector(indexSelectors.profile);
const buttonProfileEdit = profileSection.querySelector(indexSelectors.buttonEditProfile);
const buttonAddPicture = profileSection.querySelector(indexSelectors.buttonAddPicture);
const profileAvatar = profileSection.querySelector(indexSelectors.profileAvatar);


const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
    headers: {
        authorization: "5c6bea92-b6ce-497a-bd3b-67e992c0fccd",
        "Content-Type": "application/json"
    }
});

const cardList = new Section({
    renderer: (data) => {
        const card = renderCard(data);
        cardList.addItem(card);
    }
}, ".cards")

const userInfo = new UserInfo(indexSelectors.profileName, indexSelectors.profileRole, indexSelectors.profileAvatar);
let myUserId = null;


function getData() {
    Promise.all([api.getProfileInfo(), api.getCardsInfo()])
        .then(([userData, cards]) => {
            myUserId = userData._id;
            userInfo.setUserInfo({ name: userData.name, role: userData.about, avatarLink: userData.avatar });
            const data = cards.reverse().map(item => ({ name: item.name, link: item.link, allLikes: item.likes, likeCount: item.likes.length, ownerId: item.owner._id, cardId: item._id }));
            cardList.renderItem(data);
        })
        .catch(err => console.log(err));
}

getData();

const changeAvatarForm = new PopupWithForm({
    popupSelector: indexSelectors.popupAvatar,
    handleFormSubmit: (avatarLink) => {
        renderLoading(true, indexSelectors.popupAvatar);
        api.changeAvatar(avatarLink).then(res => {
            profileAvatar.style.backgroundImage = `url(${avatarLink})`;
            getData();
            changeAvatarValidation.disableSubmitButton();
            changeAvatarForm.close();
        })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, indexSelectors.popupAvatar));
    }
});

changeAvatarForm.setEventListeners();


function patchInputValues(data) {
    renderLoading(true, indexSelectors.popupEditProfile);
    api.editProfileInfo({ name: data.name, about: data.role })
        .then((res) => {
            userInfo.setUserInfo({ name: res.name, role: res.about, avatarLink: res.avatar });
            editProfileForm.setInputValues(res);
        })
        .catch(err => console.log(err))
        .finally(() => renderLoading(false, indexSelectors.popupEditProfile));
}

const editProfileForm = new PopupWithForm({
    popupSelector: indexSelectors.popupEditProfile,
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data);
        patchInputValues(data);
        editProfileForm.close();
    },
});

editProfileForm.setEventListeners();

function handleOpenEditProfile() {
    editProfileValidation.clearErrors();
    const updatedData = userInfo.getUserInfo();
    editProfileValidation.disableSubmitButton();
    editProfileForm.setInputValues(updatedData);
    editProfileForm.open();
};


const addPhotoForm = new PopupWithForm({
    popupSelector: indexSelectors.popupAddPicture,
    handleFormSubmit: (cardData) => {
        renderLoading(true, indexSelectors.popupAddPicture);
        api.sendCardData(cardData)
            .then(res => {
                const data = [{ name: res.name, link: res.link, likeCount: res.likes.length, allLikes: res.likes, ownerId: res.owner._id, cardId: res._id }]
                cardList.renderItem(data);
                addPhotoValidation.disableSubmitButton();
                addPhotoForm.close();
            })
            .catch(err => console.log(err))
            .finally(() => renderLoading(false, indexSelectors.popupAddPicture));
    }
});

addPhotoForm.setEventListeners();

const imagePopup = new PopupWithImage(indexSelectors.popupViewImage);
imagePopup.setEventListeners();

function renderCard(cardData) {
    const card = new Card({
        data: { ...cardData, currentUserId: myUserId },
        handleCardClick: () => {
            imagePopup.open({ name: data.name, link: data.link });
        },

        handleImageDelete: (data) => {
            const confirmPopup = new PopupWithConfirm({ popupSelector: indexSelectors.popupConfirm, api: api, cardId: data.cardId, card: data.card });
            confirmPopup.open();
            confirmPopup.setEventListeners();
        },
        handleLikeClick: (data) => {
            const cardLike = data.card.querySelector(selectorsCard.cardLike);
            const likeCount = data.card.querySelector(selectorsCard.cardLikeCount);
            if (cardLike.classList.contains(selectorsCard.isLiked)) {
                api.removeLike(data.cardId).then(res => {
                    cardLike.classList.remove(selectorsCard.isLiked);
                    likeCount.textContent = res.likes.length;
                })
                    .catch(err => console.log(err))
            } else {
                api.setLike(data.cardId).then(res => {
                    cardLike.classList.add(selectorsCard.isLiked);
                    likeCount.textContent = res.likes.length;
                })
                    .catch(err => console.log(err));
            }
        }
    }, "#add-picture");
    return card.generateCard();
}

function renderLoading(isLoading, popupSelector) {
    const popup = document.querySelector(popupSelector);

    if (isLoading) {
        popup.querySelector(indexSelectors.popupSubmit).textContent = "Сохранение...";

    }
    else {
        if (popupSelector == indexSelectors.popupConfirm) {
            popup.querySelector(indexSelectors.popupSubmit).textContent = "Да";

        } else if (popupSelector == indexSelectors.popupEditProfile) {

            popup.querySelector(indexSelectors.popupSubmit).textContent = "Создать";

        } else {
            popup.querySelector(indexSelectors.popupSubmit).textContent = "Сохранить";
        }

    }
}


buttonProfileEdit.addEventListener('click', handleOpenEditProfile);
buttonAddPicture.addEventListener('click', () => {
    addPhotoValidation.clearErrors();
    addPhotoForm.open();
})
profileAvatar.addEventListener("click", () => {
    changeAvatarForm.open();
});


const editProfileValidation = new FormValidator(selectorsValidation, popupEditProfile);
editProfileValidation.enableValidation();

const addPhotoValidation = new FormValidator(selectorsValidation, popupAddPicture);
addPhotoValidation.enableValidation();

const changeAvatarValidation = new FormValidator(selectorsValidation, popupChangeAvatar);
changeAvatarValidation.enableValidation();