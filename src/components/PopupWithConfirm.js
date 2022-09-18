import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__submit')

    }

    submitHandler(submitAction) {
        this._handleSubmit = submitAction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
    }
}