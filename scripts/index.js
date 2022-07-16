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

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddPhoto = document.querySelector('.popup__form_type_add-photo');
const placeTemplate = document.querySelector('#add-picture').content;

//попапы
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPicture = document.querySelector('.popup_add-picture');
const popupViewImage = document.querySelector('.popup_view-image');

//popup view-image
const popupViewImageImg = popupViewImage.querySelector('.popup__image');
const popupViewImageTitle = popupViewImage.querySelector('.popup__title');

const profileElement = document.querySelector('.profile');
const popupInputName = popupEditProfile.querySelector('.popup__input_field_name');
const popupInputRole = popupEditProfile.querySelector('.popup__input_field_role');
const profileName = profileElement.querySelector('.profile__name');
const profileRole = profileElement.querySelector('.profile__role');

const popupPictureTitle = popupAddPicture.querySelector('.popup__input_field_place-name');
const popupPictureLink = popupAddPicture.querySelector('.popup__input_field_place-link');

//кнопки
const profileEditButton = profileElement.querySelector('.profile__edit-profile');
const addPictureButton = profileElement.querySelector('.profile__add-photo');
const popupCloseButtons = document.querySelectorAll('.popup__close');


function addPicture(title, link) {
    const placeElement = placeTemplate.cloneNode(true);
    const placeElementImg = placeElement.querySelector('.element__img');
    const placeElementTitle = placeElement.querySelector('.element__title');
    const placeElementLike = placeElement.querySelector('.element__like');
    const placeElementDelete = placeElement.querySelector('.element__delete');

    placeElementImg.setAttribute('src', link);
    placeElementImg.setAttribute('alt', title);

    placeElementTitle.textContent = title;
    placeElementLike.addEventListener('click', handleLike);
    placeElementDelete.addEventListener('click', removeItem);
    placeElementImg.addEventListener('click', openViewImage);
    return placeElement;
};

function openEditProfile() {
    popupInputName.value = profileName.textContent;
    popupInputRole.value = profileRole.textContent;
    openPopup(popupEditProfile);
};

function openAddPhoto() {
    popupPictureTitle.value = '';
    popupPictureLink.value = '';
    openPopup(popupAddPicture);
};

function openViewImage(evt) {
    const alt = evt.target.getAttribute('alt');
    openPopup(popupViewImage);
    popupViewImageImg.setAttribute('src', evt.target.getAttribute('src'));
    popupViewImageImg.setAttribute('alt', alt);
    popupViewImageTitle.textContent = alt;
    popupViewImageTitle.classList.add('popup__title_type_large-view');
};

function openPopup(popup) {
    popup.classList.add('popup_open');
};

function closeWindow(popup) {
    popup.classList.remove('popup_open');
};

function saveEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileRole.textContent = popupInputRole.value;
    closeWindow(popupEditProfile);
};

function saveAddPhoto(evt) {
    evt.preventDefault();
    elementsList.prepend(addPicture(popupPictureTitle.value, popupPictureLink.value));
    closeWindow(popupAddPicture);
};

function handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
};

function removeItem(evt) {
    const item = evt.target.closest('.element')
    item.remove();
};

initialCards.forEach(item => elementsList.append(addPicture(item.name, item.link)));

popupCloseButtons.forEach(item => {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => closeWindow(popup));
});

profileEditButton.addEventListener('click', openEditProfile);
addPictureButton.addEventListener('click', openAddPhoto);
formEditProfile.addEventListener('submit', saveEditProfile);
formAddPhoto.addEventListener('submit', saveAddPhoto);

