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
