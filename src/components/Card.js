import { selectorsCard } from "../utils/constants.js";
export default class Card {
    constructor({ name, link, handleCardClick }, cardTemplateSelector) {
        this._name = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document.querySelector(this._cardTemplateSelector)
            .content
            .querySelector(selectorsCard.cardBlock)
            .cloneNode(true);
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

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._card.querySelector(selectorsCard.cardTitle).textContent = this._name;
        return this._card;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {
            this._handleLike();
        })

        this._card.querySelector(selectorsCard.cardDelete).addEventListener('click', () => {
            this._handleImageRemove();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        })
    }
};
