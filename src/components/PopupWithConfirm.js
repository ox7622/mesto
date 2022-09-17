import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, api, cardId, card }) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._api = api;
        this._cardId = cardId;
        this._card = card;
    }
    _handleImageRemove() {
        this._card.remove();
        this._card = null;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._api.deleteCard(this._cardId).then(() => {
                this.close();
                this._handleImageRemove();
            })
        })
    }
}