
import { createOpenViewImagePopup } from "./index.js";
export const selectorsCard = {
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
    constructor(data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate() {
        return this._templateCard = document.querySelector(this._cardTemplateSelector).content.querySelector(selectorsCard.cardBlock).cloneNode(true);
    };

    _handleLike() {
        this._cardLike.classList.toggle(selectorsCard.isLiked);
    }
    _handleImageRemove() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector(selectorsCard.cardImage);
        this._cardLike = this._card.querySelector(selectorsCard.cardLike);
        this._setEventListeners();

        this._cardImage.src=this._link;
        this._cardImage.alt= this._name;

        this._card.querySelector(selectorsCard.cardTitle).textContent = this._name;
        return this._card;
    }

    _handleOpenViewImage() {
        createOpenViewImagePopup(this._name, this._link);
    };

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {
            this._handleLike();
        })

        this._card.querySelector(selectorsCard.cardDelete).addEventListener('click', () => {
            this._handleImageRemove();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleOpenViewImage();
        })
    }
};
