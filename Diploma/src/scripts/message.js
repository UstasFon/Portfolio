import toastr from "toastr";

{
    const formFields = {
        nameInput: document.getElementById('name'),
        mailInput: document.getElementById('mail'),
        messageInput: document.getElementById('message'),

    };

    const wrongValidFields = {
        nameInput: {
            isValid: false,
            showError: false

        },
        mailInput:  {
            isValid: false,
            showError: false

        },
        messageInput:  {
            isValid: false,
            showError: false

        }
    };

    let fieldsWrappers = {
        nameInput: {
            wrapper: document.querySelector('.form__wrapper_name'),
            hint: 'Please, enter your name'
        },

        mailInput: {
            wrapper: document.querySelector('.form__wrapper_mail'),
            hint: 'Please, check your email'
        },

        messageInput: {
            wrapper: document.querySelector('.form__wrapper_message'),
            hint: 'Please enter your message'
        }
    };


    const formButton = document.querySelector('.form__button');
    let messageData = {};
    const userMessagedAPI = '/api/message';
    let isFormComplete = false;

    let messageSubmit = (e) => {
        e.preventDefault(e);
        saveMessageData();
        sendUserMessage();
};

    let removeWrongValidateMessage = (name) => {
        if (!wrongValidFields[name].showError) {
            formFields[name].classList.remove('wrong-validation');
            wrongValidFields[name].showError = false;
            let alertMessage = document.querySelector('.form__wrapper_alert-' + [name]);
            removeAlertMessage(alertMessage, name);
        }
    };

    let removeAlertMessage = (alertMessage, name) => {
        if (alertMessage && !wrongValidFields[name].showError) {
            alertMessage.parentNode.removeChild(alertMessage);
        }
    };

    let wrongValidateMessage = (name) => {
        let alertMessage = document.querySelector('.form__wrapper_alert-' + [name]);

        if (wrongValidFields[name].showError && !alertMessage) {
            formFields[name].classList.add('wrong-validation');
            wrongValidFields[name].showError = false;

            alertMessage = document.createElement('p');
            alertMessage.innerText = fieldsWrappers[name].hint;
            alertMessage.classList.add('form__wrapper_alert-' + [name]);
            fieldsWrappers[name].wrapper.appendChild(alertMessage);
        }
    };

    let validateMessageForm = (name) => {
        const isNameValid = nameInputValidation();
        const isMailValid = mailInputValidation();
        const isMessageValid = messageValidate();
        const isFieldsValid = isNameValid && isMailValid && isMessageValid;
        
        if (wrongValidFields[name].isValid === false) {
            wrongValidFields[name].showError = true;
            wrongValidateMessage(name);
        } else {
            wrongValidFields[name].showError = false;
            removeWrongValidateMessage(name);
        }

        if (isFieldsValid !== isFormComplete) {
            isFormComplete = isFieldsValid;
            toggleButtonState(isFieldsValid);
        }

    };

    let toggleButtonState = (isFieldsValid) => {
        if (isFieldsValid) {
            formButton.removeAttribute('disabled');
            formButton.classList.remove('form__button_disabled');
        } else {
            formButton.setAttribute('disabled', 'disabled');
            formButton.classList.add('form__button_disabled');
        }
    };

    let saveMessageData = () => {
        let userName = formFields.nameInput.value.trim();
        let userMail = formFields.mailInput.value.trim();
        let userMessage = formFields.messageInput.value.trim();

        messageData.name = userName;
        messageData.maile = userMail;
        messageData.message = userMessage;
    };

    let sendUserMessage = () => {
        fetch(userMessagedAPI, {
                method: 'POST',
                body: JSON.stringify(messageData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((data) => {
                toastr.success('Your message was sent!');
                messageCleaningInputs();
            })
            .catch((data) => {
                toastr.error('We fucked up. Try later');
            });
    };

    let nameInputValidation = () => {
        let nameInputTrim = formFields.nameInput.value.trim();
        let nameValidate = true;

        if (!nameInputTrim) {
            nameValidate = false;
            wrongValidFields.nameInput.isValid = false;
        } else {
            wrongValidFields.nameInput.isValid = true;
        }

        return nameValidate;
    };

    let mailInputValidation = () => {
        let mailTrim = formFields.mailInput.value.trim();
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let mailValidate = true;

        if (!reg.test(mailTrim)) {
            mailValidate = false;
            wrongValidFields.mailInput.isValid = false;
        } else {
            wrongValidFields.mailInput.isValid = true;
        }

        return mailValidate;
    };

    let messageValidate = () => {
        let mailTrim = formFields.messageInput.value.trim();
        let messageValidate = true;

        if (!mailTrim) {
            messageValidate = false;
            wrongValidFields.messageInput.isValid = false;
        } else {
            wrongValidFields.messageInput.isValid = true;
        }

        return messageValidate;
    };

    let messageCleaningInputs = () => {
        formFields.nameInput.value = "";
        formFields.mailInput.value = "";
        formFields.messageInput.value = "";
    };

    formFields.nameInput.oninput = validateMessageForm.bind(this, 'nameInput');
    formFields.nameInput.onblur = validateMessageForm.bind(this, 'nameInput');
    formFields.mailInput.oninput = validateMessageForm.bind(this, 'mailInput');
    formFields.mailInput.onblur = validateMessageForm.bind(this, 'mailInput');
    formFields.messageInput.oninput = validateMessageForm.bind(this, 'messageInput');
    formFields.messageInput.onblur = validateMessageForm.bind(this, 'messageInput');
    formButton.onclick = messageSubmit;

}