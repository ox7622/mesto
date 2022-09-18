export default class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleImageDelete }, cardTemplateSelector, selectors) {
        this._selectors = selectors;
        this._name = data.name;
        this._link = data.link;
        this._likeCount = data.likeCount;
        this._ownerId = data.ownerId;
        this._cardId = data.cardId;
        this._cardLikes = data.allLikes;
        this._myId = data.currentUserId;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleImageDelete = handleImageDelete;
    }

    _getTemplate() {
        return document.querySelector(this._cardTemplateSelector)
            .content
            .querySelector(this._selectors.cardBlock)
            .cloneNode(true);
    };

    generateCard() {
        this._card = this._getTemplate();

        this._cardImage = this._card.querySelector(this._selectors.cardImage);
        this._cardLike = this._card.querySelector(this._selectors.cardLike);
        this._likeCountDiv = this._card.querySelector(this._selectors.cardLikeCount);
        this._deleteButton = this._card.querySelector(this._selectors.cardDelete);

        if (this._ownerId !== this._myId) {
            this._deleteButton.classList.add('card__delete_hide');
            this._deleteButton.disabled = true;
        }
        if (this._cardLikes.some(item => (item._id === this._myId))) {
            this._cardLike.classList.add(this._selectors.isLiked)
        }
        this._likeCountDiv.textContent = this._likeCount;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._card.querySelector(this._selectors.cardTitle).textContent = this._name;
        this._setEventListeners();
        return this._card;
    }

    handleImageRemove() {
        this._card.remove();
        this._card = null;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {
            this._handleLikeClick({ cardId: this._cardId, card: this._card });
        })

        this._card.querySelector(this._selectors.cardDelete).addEventListener('click', () => {
            this._handleImageDelete({ cardId: this._cardId, card: this._card });
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick({ name: this._name, link: this._link });
        })
    }
};
