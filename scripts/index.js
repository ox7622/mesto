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
const popups = document.querySelectorAll('.popup');

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
    placeElementImg.addEventListener('click', () => { openViewImage(title, link) });
    return placeElement;
};

function openEditProfile() {
    popupInputName.value = profileName.textContent;
    popupInputRole.value = profileRole.textContent;
    clearErrors(popupEditProfile);
    openPopup(popupEditProfile);
};

function openAddPhoto() {
    openPopup(popupAddPicture);
};

function openViewImage(title, link) {
    openPopup(popupViewImage);
    popupViewImageImg.setAttribute('src', link);
    popupViewImageImg.setAttribute('alt', title);
    popupViewImageTitle.textContent = title;
    popupViewImageTitle.classList.add('popup__title_type_large-view');
};

function openPopup(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closeOnEscape);
};

function closeWindow(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closeOnEscape);
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
    evt.target.reset();
    evt.submitter.classList.add('popup__submit_disabled');
    evt.submitter.setAttribute('disabled', true);
    closeWindow(popupAddPicture);
};

function handleLike(evt) {
    evt.target.classList.toggle('element__like_active');
};

function removeItem(evt) {
    const item = evt.target.closest('.element');
    item.remove();
};

function clearErrors(form) {
    const errorSpans = form.querySelectorAll('.popup__error-message');
    const inputs = form.querySelectorAll('.popup__input');
    errorSpans.forEach(item => item.textContent = '');
    inputs.forEach(item => item.classList.remove('popup__input_type_error'));
};

initialCards.forEach(item => elementsList.append(addPicture(item.name, item.link)));

popups.forEach(item => item.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close')) {
        closeWindow(item);
    }
})
);

function closeOnEscape(evt) {
    if (evt.key == "Escape") {
        closeWindow(document.querySelector('.popup_open'));
    }
};


profileEditButton.addEventListener('click', openEditProfile);
addPictureButton.addEventListener('click', openAddPhoto);
formEditProfile.addEventListener('submit', saveEditProfile);
formAddPhoto.addEventListener('submit', saveAddPhoto);
