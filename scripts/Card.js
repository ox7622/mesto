import { openPopup } from "./utils.js";

const selectors = {
    cardBlock: '.card',
    cardImage: '.card__img',
    cardTitle: '.card__title',
    isLiked: 'card__like_active',
    cardLike: '.card__like',
    cardDelete: '.card__delete',
    popupViewImage: '.popup_view-image',
    popupViewImageImg: '.popup__image',
    popupViewImageTitle: '.popup__title'
}

export class Card {
    constructor(data, formTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._formTemplate = formTemplate;
        this._templateCard = this._formTemplate.content.querySelector(selectors.cardBlock).cloneNode(true);
        this._cardImage = this._templateCard.querySelector(selectors.cardImage);

    }

    _handleLike() {
        this._card.querySelector(selectors.cardLike).classList.toggle(selectors.isLiked);
    }
    _handleImageRemove() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this._card = this._templateCard;
        this._setEventListeners();

        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);

        this._card.querySelector(selectors.cardTitle).textContent = this._name;
        return this._card;
    }

    _handleOpenViewImage() {
        const popupViewImage = document.querySelector(selectors.popupViewImage);
        const popupViewImageImg = popupViewImage.querySelector(selectors.popupViewImageImg);
        const popupViewImageTitle = popupViewImage.querySelector(selectors.popupViewImageTitle);
        openPopup(popupViewImage);
        popupViewImageImg.setAttribute('src', this._link);
        popupViewImageImg.setAttribute('alt', this._name);
        popupViewImageTitle.textContent = this._name;
        popupViewImageTitle.classList.add('popup__title_type_large-view');
    };

    _setEventListeners() {
        this._card.querySelector(selectors.cardLike).addEventListener('click', () => {
            this._handleLike();
        })

        this._card.querySelector(selectors.cardDelete).addEventListener('click', () => {
            this._handleImageRemove();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleOpenViewImage();
        })
    }
};
