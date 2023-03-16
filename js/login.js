const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
  if (usernameInput.value === "hackerman" && passwordInput.value === "leave") {
    window.location.href = "#";
  } else {
    usernameInput.classList.add("invalid-input");
    passwordInput.classList.add("invalid-input");
    usernameInput.style.color = "red";
    passwordInput.style.color = "red";
    loginButton.style.color = "red";
    setTimeout(() => {
      usernameInput.classList.remove("invalid-input");
      passwordInput.classList.remove("invalid-input");
      usernameInput.style.color = "white";
      passwordInput.style.color = "white";
      loginButton.style.color = "white";
    }, 1000);
  }
});

/* stealing my admin password and username???? i will report you to the police. */
