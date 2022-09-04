import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ name, link }, popupSelector) {
        super(popupSelector);
        this._name = name;
        this._link = link;
        this._popup = document.querySelector(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupTitle = this._popup.querySelector('.popup__title');
    }
    open() {

        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupTitle.textContent = this._name;
        this._popupTitle.classList.add('popup__title_type_large-view');
        super.open();
    }

}