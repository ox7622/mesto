import { openViewImage } from "./index.js";

const data = [
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

const selectors = {
    element: '.element',
    elementImage: '.element__img',
    elementTitle: '.element__title',
    isLiked: 'element__like_active',
    elementLike: '.element__like',
    elementDelete: '.element__delete'
}
export class Card {
    constructor(data, templateSelector, openViewImage) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openViewImage = openViewImage;
        this._templateCard = document.querySelector(this._templateSelector).content.querySelector(selectors.element).cloneNode(true);
    }

    _handleLike() {
        this._el.classList.toggle(selectors.isLiked);
    }
    _removeImage() {
        this._el.remove();
    }

    generateCard() {
        this._el = this._templateCard;
        this._setEventListeners();

        const elImg = this._el.querySelector(selectors.elementImage);
        elImg.setAttribute('src', this._link);
        elImg.setAttribute('alt', this._name);

        this._el.querySelector(selectors.elementTitle).textContent = this._name;
        return this._el;
    }
    _setEventListeners() {
        this._el.querySelector(selectors.elementLike).addEventListener('click', () => {
            this._handleLike();
        })

        this._el.querySelector(selectors.elementDelete).addEventListener('click', () => {
            this._removeImage();
        })

        this._el.querySelector(selectors.elementImage).addEventListener('click', () => {
            openViewImage(this._name, this._link);
        })
    }
};

data.forEach((item) => {
    const card = new Card(item, "#add-picture");
    const cardEl = card.generateCard();

    document.querySelector('.elements').append(cardEl);
});
