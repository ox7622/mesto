export const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export class FormValidator {
    constructor(selectors, form) {
        this._selectors = selectors;
        this._form = document.querySelector(form);
        this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        this._button = this._form.querySelector(this._selectors.submitButtonSelector);
    };

    _showError(input, errorText) {
        const errorSpan = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._selectors.inputErrorClass);
        errorSpan.textContent = errorText;
        errorSpan.classList.add(this._selectors.errorClass);
    };

    _hideError(input) {
        const errorSpan = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._selectors.inputErrorClass);
        errorSpan.textContent = "";
        errorSpan.classList.remove(this._selectors.errorClass);
    };

    _isValid(input) {

        if (!input.validity.valid) {
            this._setCustomErrors(input);
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    };

    _setCustomErrors(input) {
        const validity = input.validity;
        input.setCustomValidity('');
        if (validity.tooShort) {
            const inputLength = input.value.length;
            const min = input.getAttribute('minlength');
            const max = input.getAttribute('maxlength');
            input.setCustomValidity(`Вы ввели ${inputLength} символ. Введите от ${min} до ${max} символов`);
        }

    }

    _hasInvalidInput() {
        return this._inputList.some(input => {
            return !input.validity.valid;
        })
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._button.classList.add(this._selectors.inactiveButtonClass);
            this._button.setAttribute('disabled', true);
        } else {
            this._button.classList.remove(this._selectors.inactiveButtonClass);
            this._button.removeAttribute('disabled');
        }
    };

    _setInputListeners() {
        this._toggleButtonState()
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonState();
            })
        });
    };

    enableValidation() {
        const formsArray = Array.from(document.querySelectorAll(this._selectors.formSelector));
        formsArray.forEach(form => {
            this._setInputListeners();
        });
    };

}