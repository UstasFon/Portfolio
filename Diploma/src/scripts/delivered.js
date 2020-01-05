import toastr from  'toastr'

import '../scripts/toastr';

{
    let deliveredForm = document.querySelector('.delivered__mail');
    let deliveredInput = document.querySelector('.delivered-mail__email');
    let deliveredButton = document.querySelector('.delivered-mail__button');
    let deliveredAPI = '/api/subscribe';
    let isEmailValid = true;

    let delivered = (e) => {
        e.preventDefault();
        deliveredValidate();
        removeWrongMessage();
    };

    let deliveredSendMail = () => {
        // let deliveredFormData = new FormData(deliveredForm);
        // let xhr = new XMLHttpRequest();
        // xhr.open("POST", deliveredAPI);
        // xhr.send(deliveredFormData);
        fetch(deliveredAPI, {
                method: 'POST',
                body: JSON.stringify({ email: deliveredInput.value }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((data) => {
                toastr.success('You was successfully subscribed');
                deliveredCleaningInput();
            })
            .catch((data) => {
                toastr.error('We fucked up. Try later');
            });
    };

    let deliveredValidate = () => {
        let emailValue = deliveredInput.value.trim();
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (!reg.test(emailValue)) {
            inputWrongValidation();
            isEmailValid = false;
            wrongEmailMessage();
            toastr.error('Wrong email');
        } else {
            deliveredSendMail();
        }
    };

    let inputWrongValidation = () => {
        deliveredInput.classList.add('wrong-validation');
    };

    let deliveredCleaningInput = () => {
        deliveredInput.value = "";
    };

    let onEmailInput = ()=> {
        if (!isEmailValid) {
            deliveredInput.classList.remove('wrong-validation');
            isEmailValid = true;
        }
    };

    let wrongEmailMessage = ()=> {
        deliveredForm.classList.add('delivered__mail_invalid');
    };

    let removeWrongMessage = ()=> {
        if (isEmailValid) {
            deliveredForm.classList.remove('delivered__mail_invalid');
        }
    };

    deliveredButton.onclick = delivered;
    deliveredInput.oninput = onEmailInput;

}