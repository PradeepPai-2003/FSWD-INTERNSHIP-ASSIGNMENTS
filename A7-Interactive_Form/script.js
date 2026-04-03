let form = document.getElementById("myForm");
let message = document.getElementById("message");
let submitBtn = document.querySelector("button[type='submit']");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let togglePasswordBtn = document.getElementById("togglePassword");

let isPasswordVisible = false;

// Toggle password visibility
togglePasswordBtn.addEventListener("click", function(e) {
  e.preventDefault();
  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? "text" : "password";
  togglePasswordBtn.innerText = isPasswordVisible ? "Hide" : "Show";
});

// Enable/Disable submit button based on input
function updateButtonState() {
  const isValid = nameInput.value.trim() && emailInput.value.trim() && passwordInput.value.trim();
  submitBtn.disabled = !isValid;
}

nameInput.addEventListener("input", updateButtonState);
emailInput.addEventListener("input", updateButtonState);
passwordInput.addEventListener("input", updateButtonState);

// Form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value;

  if (password.length < 6) {
    message.innerText = "Password must be at least 6 characters!";
    message.style.color = "red";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  setTimeout(function() {
    message.innerText = "✓ Registration successful!";
    message.style.color = "green";
    submitBtn.classList.add("success");

    setTimeout(function() {
      form.reset();
      message.innerText = "";
      submitBtn.classList.remove("success");
      submitBtn.innerText = "Submit";
      updateButtonState();
    }, 1500);
  }, 1500);
});

updateButtonState();