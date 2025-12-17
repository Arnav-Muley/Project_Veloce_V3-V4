
// ===== CONFIG =====
const ADMIN_PASSWORD = "veloce"; // change this password

// ===== ELEMENTS =====
const loginModal = document.getElementById("loginModal");
const mainContent = document.getElementById("mainContent");
const loginError = document.getElementById("loginError");
const passwordInput = document.getElementById("adminPassword");

// ===== LOGIN HANDLER =====
function handleLogin(event) {
  event.preventDefault();

  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === ADMIN_PASSWORD) {
    // SUCCESS
    loginModal.style.display = "none";
    mainContent.classList.remove("locked");
    loginError.style.display = "none";
  } else {
    // ERROR
    loginError.textContent = "❌ Incorrect password";
    loginError.style.display = "block";
  }
}

// ===== PASSWORD TOGGLE =====
function togglePasswordVisibility() {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
}
