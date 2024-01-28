document.addEventListener('DOMContentLoaded', function () {
    var checkbutton = document.querySelector('input[type="button"]');
    var resetbutton = document.querySelector('input[type="reset"]');
    var checks = document.querySelectorAll('.fa-xmark');
    var tekstregex = /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    var dataRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var addressRegex = /^[A-Za-z0-9\s]+$/;
    var postalCodeRegex = /^\d{2}-\d{3}$/;
    var passwordtexts = document.querySelector('.password-texts');
    var circle = document.querySelectorAll('.fa-circle');

    // Dodane dla hasła
    var passwordField = document.getElementById('password');
    var progressBar = document.querySelector('.progressbar');
    var regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    var regexDigit = /\d/;
    var regexUpperCase = /[A-Z]/;
    var hasMinLength = false;
    var hasUpperCase = false;
    var hasDigit = false;
    var hasSpecialChar = false;

    checkbutton.addEventListener('click', function () {
        checkField(document.getElementById("username"), checks[0], tekstregex);
        checkField(document.getElementById('Surname'), checks[1], tekstregex);
        checkField(document.getElementById('calendar'), checks[2], dataRegex);
        checkField(document.getElementById('email'), checks[3], emailRegex);
        checkField(document.getElementById('password'), checks[4], regexSpecialChar); // Poprawiono na regexSpecialChar
        checkPasswordField(document.getElementById('password'), checks[4]);
        checkField(document.getElementById('address'), checks[5], addressRegex);
        checkField(document.getElementById('zipcode'), checks[6], postalCodeRegex);
    });

    resetbutton.addEventListener("click", function () {
        for (var i = 0; i < checks.length; i++) {
            checks[i].style.display = 'none';
        }
        progressBar.style.width = 0;
        passwordtexts.style.display = 'none';
    });

    function checkField(field, check, regex) {
        var value = field.value;
        if (!regex.test(value)) {
            check.classList.remove('fa-check');
            check.classList.add('fa-xmark');
        } else {
            check.classList.remove('fa-xmark');
            check.classList.add('fa-check');
        }

        check.style.display = 'block';
        check.classList.remove('animate-check');
        void check.offsetWidth;
        check.classList.add('animate-check');
    }

    // Funkcja dla hasła
    function checkPasswordField(field, check) {
        var value = field.value;
        hasMinLength = value.length >= 6;
        hasUpperCase = regexUpperCase.test(value);
        hasDigit = regexDigit.test(value);
        hasSpecialChar = regexSpecialChar.test(value);

        updateProgressBar();
    }

    function updateProgressBar() {
        var requirementsMet = [hasMinLength, hasUpperCase, hasDigit, hasSpecialChar];
        var countMet = requirementsMet.filter(Boolean).length;

        var percent;
        if (countMet === 1) {
            percent = 20;
        } else if (countMet === 2) {
            percent = 50;
        } else if (countMet === 3) {
            percent = 80;
        } else if (countMet === 4) {
            percent = 100;
        } else {
            percent = 0;
        }

        progressBar.style.width = percent + '%';

        passwordtexts.style.display = 'flex';
        var passwordText1 = document.getElementById('password-text-1');
        var passwordText2 = document.getElementById('password-text-2');
        var passwordText3 = document.getElementById('password-text-3');
        var passwordText4 = document.getElementById('password-text-4');
        passwordText1.innerHTML = '';
        passwordText2.innerHTML = '';
        passwordText3.innerHTML = '';
        passwordText4.innerHTML = '';

        if (!hasMinLength) {
            circle[0].style.display = 'block';
            passwordText1.innerHTML += 'minimum 6 characters required';
        }

        if (!hasUpperCase) {
            circle[1].style.display = 'block';
            passwordText2.innerHTML += 'missing capital letter';
        }

        if (!hasDigit) {
            circle[2].style.display = 'block';
            passwordText3.innerHTML += 'at least one digit missing';
        }

        if (!hasSpecialChar) {
            circle[3].style.display = 'block';
            passwordText4.innerHTML += 'Missing special character.';
        }

        if (hasMinLength) {
            circle[0].style.display = 'none';
        }

        if (hasUpperCase) {
            circle[1].style.display = 'none';
        }

        if (hasDigit) {
            circle[2].style.display = 'none';
        }

        if (hasSpecialChar) {
            circle[3].style.display = 'none';
        }
    }

    // haslo

    var showpassword = document.querySelector('#show-password');

    var passwordfield = document.querySelector('#password');

    showpassword.addEventListener("click", function () {
        this.classList.toggle("fa-eye-slash");
        this.classList.toggle('fa-eye');
        var type = passwordfield.getAttribute("type") === "password" ? "text" : "password";
        passwordfield.setAttribute("type", type);
    });

    var sendbutton = document.querySelector('input[type="submit"]');

    sendbutton.addEventListener('click', function (e) {
        e.preventDefault();
        var isFormValid = true;

        for (var i = 0; i < checks.length; i++) {
            if (checks[i].classList.contains('fa-xmark')) {
                isFormValid = false;
                break;
            }
        }

        if (isFormValid) {
            alert("Form submitted successfully!");
            document.getElementById("username").value = '';
            document.getElementById('Surname').value = '';
            document.getElementById('calendar').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('address').value = '';
            document.getElementById('zipcode').value = '';

            for (var i = 0; i < checks.length; i++) {
                checks[i].style.display = 'none';
            }
            progressBar.style.width = 0;
            passwordtexts.style.display = 'none';
        } else {
            alert("Form requirements not met. Please check and try again.");
        }
    });

});
