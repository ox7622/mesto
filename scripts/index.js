const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
];

const elementsList = document.querySelector('.elements');
const formElements = document.querySelectorAll('.popup__form');

//попапы
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddPicture = document.querySelector('.popup__add-picture');
const popupViewImage = document.querySelector('.popup__view-image');


const profileElement = document.querySelector('.profile');
let popupInputName = popupEditProfile.querySelector('.popup__input_field_name');
let popupInputRole = popupEditProfile.querySelector('.popup__input_field_role');
let profileName = profileElement.querySelector('.profile__name');
let profileRole = profileElement.querySelector('.profile__role');

let popupPictureTitle = popupAddPicture.querySelector('.popup__input_field_place-name');
let popupPictureLink = popupAddPicture.querySelector('.popup__input_field_place-link');

//кнопки
const profileEdit = profileElement.querySelector('.profile__edit-profile');
const addPictureButton = profileElement.querySelector('.profile__add-photo');
const popupClose = document.querySelectorAll('.popup__close');


function addPicture(title, link) {
    const placeTemplate = document.querySelector('#add-picture').content;
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

    placeElement.querySelector('.element__img').setAttribute('src', link);
    placeElement.querySelector('.element__img').setAttribute('alt', title);

    placeElement.querySelector('.element__title').textContent = title;
    placeElement.querySelector('.element__like').addEventListener('click', handleLike);
    placeElement.querySelector('.element__delete').addEventListener('click', removeItem);
    placeElement.querySelector('.element__img').addEventListener('click', openPopup);
    return placeElement;
};

function openPopup(evt) {
    if (evt.target.classList.contains('profile__edit-profile')) {
        popupInputName.value = profileName.textContent;
        popupInputRole.value = profileRole.textContent;
        popupEditProfile.classList.add('popup_open');
    } else if (evt.target.classList.contains('profile__add-photo')) {
        popupPictureTitle.value = '';
        popupPictureLink.value = '';
        popupAddPicture.classList.add('popup_open');
    } else {
        popupViewImage.classList.add('popup_open');
        popupViewImage.querySelector('.popup__image').setAttribute('src', evt.target.getAttribute('src'));
        popupViewImage.querySelector('.popup__image').setAttribute('alt', evt.target.getAttribute('alt'));
        popupViewImage.querySelector('.popup__title').textContent = evt.target.parentElement.querySelector('.element__title').textContent;
        popupViewImage.querySelector('.popup__title').classList.add('popup__title_type_large-view');

    }
};

function closeWindow(evt) {
    const elParent = evt.target.parentElement;
    elParent.parentElement.classList.remove('popup_open');
};

function saveButtonHandler(evt) {
    evt.preventDefault();
    if (evt.target.getAttribute('name') == "editProfile") {
        profileName.textContent = popupInputName.value;
        profileRole.textContent = popupInputRole.value;
    } else {
        elementsList.prepend(addPicture(popupPictureTitle.value, popupPictureLink.value));
    }
    closeWindow(evt);
};

function handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

function removeItem(evt) {
    evt.target.parentElement.remove();
}

initialCards.forEach(item => elementsList.append(addPicture(item.name, item.link)));
popupClose.forEach(item => item.addEventListener('click', closeWindow));
formElements.forEach(item => item.addEventListener('submit', saveButtonHandler));

profileEdit.addEventListener('click', openPopup);
addPictureButton.addEventListener('click', openPopup);