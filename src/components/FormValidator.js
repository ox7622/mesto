
export default class FormValidator {

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
        this._button.disabled = true;
    };

    clearErrors() {
        this._inputList.forEach(input => this._hideError(input));
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