const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", () => {
  if (usernameInput.value === "hackerman" && passwordInput.value === "leave") {
    window.location.href = "page2.html";
  } else {
    alert("Incorrect username or password.");
  }
});
