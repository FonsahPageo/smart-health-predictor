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