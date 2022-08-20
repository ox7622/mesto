export const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorSpan: '.popup__error-message'
};

export class FormValidator {

    constructor(selectors, form) {
        this._selectors = selectors;
        this._form = form;
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
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
    };


    _hasInvalidInput() {
        return this._inputList.some(input => {
            return !input.validity.valid;
        })
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this._button.classList.remove(this._selectors.inactiveButtonClass);
            this._button.removeAttribute('disabled');
        }
    };

    disableSubmitButton() {
        this._button.classList.add(this._selectors.inactiveButtonClass);
        this._button.setAttribute('disabled', true);
    };

    clearErrors() {
        const errorSpans = this._form.querySelectorAll(this._selectors.errorSpan);
        errorSpans.forEach(span => span.textContent = '');
        console.log('errors are cleared');
        this._inputList.forEach(input => input.classList.remove('popup__input_type_error'));
    };


    _setInputListeners() {
        this._toggleButtonState();
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this._toggleButtonState();
            })
        });
    };

    enableValidation() {
        this._setInputListeners();
    };

}