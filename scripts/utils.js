// View image popup
const popupViewImage = document.querySelector('.popup_view-image');
const popupViewImageImg = popupViewImage.querySelector('.popup__image');
const popupViewImageTitle = popupViewImage.querySelector('.popup__title');

export function openPopup(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closeOnEscape);
};

export function closeOnEscape(evt) {
    if (evt.key === "Escape") {
        closeWindow(document.querySelector('.popup_open'));
    }
};

export function closeWindow(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closeOnEscape);
};

export function openImagePopup(data) {
    popupViewImageImg.src = data.link;
    popupViewImageImg.alt = data.name;
    popupViewImageTitle.textContent = data.name;
    popupViewImageTitle.classList.add('popup__title_type_large-view');
    openPopup(popupViewImage);
}
