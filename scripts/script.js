// registrattion form validation
const form = document.getElementById('registration-form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const country = document.getElementById('country');
const password = document.getElementById('password');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!fname.checkValidity()) {
    alert('Please enter a valid first name.');
    return;
  }

  if (!lname.checkValidity()) {
    alert('Please enter a valid last name.');
    return;
  }

  if (!email.checkValidity()) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!username.checkValidity()) {
    alert('Please enter a valid username.');
    return;
  }

  if (!phone.checkValidity()) {
    alert('Please enter a valid phone number.');
    return;
  }

  if (!country.checkValidity()) {
    alert('Please enter a valid country.');
    return;
  }

  if (!password.checkValidity()) {
    alert('Please enter a valid password.');
    return;
  }

  // If all fields are valid, submit the form
  form.submit();
});

// login form validation
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

passwordInput.addEventListener("input", function () {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]\\:;'<>,.?/])[A-Za-z\d!@#$%^&*()_+~`|}{[\]\\:;'<>,.?/]{8,}$/;

    if (!passwordRegex.test(passwordInput.value)) {
        passwordInput.setCustomValidity("Password must include a capital letter, a number, and other characters");
        passwordError.textContent = "Password must include a capital letter, a number, and other characters";
    } else {
        passwordInput.setCustomValidity("");
        passwordError.textContent = "";
    }
});

// link to header and footer
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }