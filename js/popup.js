"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // popup
    function closeOpenedPopup() {
        document.querySelectorAll('.overlay.opened').forEach(element => {
            element.classList.remove('opened');
        });
    }

    document.querySelectorAll('.popup-toggle').forEach(element => {
        element.addEventListener("click", function (event) {
            closeOpenedPopup()

            let popup = document.querySelector(this.dataset.target);
            popup.classList.add('opened')
        });
    });

    // close popup 
    document.querySelectorAll('.overlay').forEach(element => {
        element.addEventListener("click", function (event) {
            if (event.target.classList.contains('opened')) {
                event.target.classList.remove('opened')
            }
        });
    });

    // sign-up form
    const signUpForm = {
        name: document.querySelector('#pop-up-signup .field-input[name="name"]'),
        email: document.querySelector('#pop-up-signup .field-input[name="email"]'),
        password: document.querySelector('#pop-up-signup .field-input[name="password"]'),
        agreement: document.querySelector('#pop-up-signup .user-agreement input[name="agreement"]'),
        button: document.querySelector('#pop-up-signup .button-send'),
        check: function () {
            if (signUpForm.name.value == '' || signUpForm.email.value == '' || signUpForm.password.value.length < 8 || signUpForm.agreement.checked == false) {
                signUpForm.button.classList.add('disabled');
                return;
            }
            signUpForm.button.classList.remove('disabled');
        },
        send: function () {
            if (signUpForm.button.classList.contains('disabled')) {
                return;
            }
            closeOpenedPopup();
            login(signUpForm.name.value);
        }
    }

    signUpForm.button.addEventListener('click', signUpForm.send);

    document.querySelectorAll('#pop-up-signup input').forEach(element => {
        element.addEventListener("keyup", signUpForm.check);
        element.addEventListener("click", signUpForm.check);
    });

    //log-in form
    const logInForm = {
        email: document.querySelector('#pop-up-login .field-input[name="email"]'),
        password: document.querySelector('#pop-up-login .field-input[name="password"]'),
        button: document.querySelector('#pop-up-login .button-send'),
        check: function () {
            if (logInForm.email.value == '' || logInForm.password.value == '') {
                logInForm.button.classList.add('disabled');
                return;
            }
            logInForm.button.classList.remove('disabled');
        },
        send: function () {
            if (logInForm.button.classList.contains('disabled')) {
                return;
            }
            if (logInForm.email.value != 'user@gmail.com' || logInForm.password.value != 'useruser') {
                alert('Incorrect email or password');
            }
            else {
                closeOpenedPopup();
                login('useruser');
            }
        }
    }
    document.querySelectorAll('#pop-up-login input').forEach(element => {
        element.addEventListener("keyup", logInForm.check);
    });
    logInForm.button.addEventListener('click', logInForm.send);

    //login
    const userHeader = document.querySelector('.authorization-links-block');
    const loginIcon = document.querySelector('.authorization-links-block .my-account-icon');

    function login(userName) {
        userHeader.classList.add('logged');
        loginIcon.title = userName;
    }

    //login with social
    const loginWithSocial = {
        facebook: document.querySelectorAll('.sign-in-facebook'),
        google: document.querySelectorAll('.sign-in-google'),
    }
    loginWithSocial.facebook.forEach(elem => {
        elem.addEventListener('click', function () {
            closeOpenedPopup();
            login('Logged in with Facebook');
        });
    });
    loginWithSocial.google.forEach(elem => {
        elem.addEventListener('click', function () {
            closeOpenedPopup();
            login('Logged in with Google')
        });
    });

    /// logout
    const logOutBtn = document.querySelector('.logout-btn');

    function closeLogoutMenu(e) {
        if (!e.target.classList.contains('logout-btn') && logOutBtn.classList.contains('visible')) {
            logOutBtn.classList.remove('visible');
        }
    }
    function newEvent() {
        window.addEventListener('click', closeLogoutMenu, true);
    }
    loginIcon.addEventListener('click', function () {
        logOutBtn.classList.add('visible');
        setTimeout(newEvent, 1000);
    });

    logOutBtn.addEventListener('click', function () {
        userHeader.classList.remove('logged');
    });
});