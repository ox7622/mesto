// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


function showErrorMessage(form, input, errorText, config) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorSpan.textContent = errorText;
    errorSpan.classList.add(config.errorClass);
};

function hideErrorMessage(form, input, config) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorSpan.textContent = "";
    errorSpan.classList.remove(config.errorClass);
};

function isValid(form, input, config) {
    if (!input.validity.valid) {
        showErrorMessage(form, input, input.validationMessage, config);
    } else {
        hideErrorMessage(form, input, config);
    }

};


function setInputListeners(form, config) {
    const inputsArray = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputsArray, button, config);

    inputsArray.forEach(input => {
        input.addEventListener('input', function () {
            isValid(form, input, config);
            toggleButtonState(inputsArray, button, config);
        });
        
    });
    
};


function hasInvalidInput(inputList) {
    return inputList.some(input => {
        return !input.validity.valid;
    })
};

function toggleButtonState(inputList, button, config) {
    if (hasInvalidInput(inputList)) {
        button.classList.add(config.inactiveButtonClass);
        button.setAttribute('disabled',true);
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.removeAttribute('disabled');
    }
};

function enableValidation(config) {
    const formsArray = Array.from(document.querySelectorAll(config.formSelector));
    formsArray.forEach(form => { setInputListeners(form, config);});
};

enableValidation(selectors);

