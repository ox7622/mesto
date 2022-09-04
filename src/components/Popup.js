export default class Popup {
    constructor(popupSelector) {
        this._selector = popupSelector;
        this._popup = document.querySelector(this._selector);
        this._popupCloseButton = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    _handleClosePopup(evt) {
        if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            this._handleClosePopup(evt);
        })
    }
}
