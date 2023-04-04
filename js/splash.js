// Select the splash and splashText elements
const splash = document.querySelector(".splash");
const splashText = document.querySelector(".splash-text");

// Create a typing indicator element
const typingIndicator = document.createElement("span");
typingIndicator.classList.add("typing-indicator");
typingIndicator.textContent = "_";
let typingTimeout;

// Function to type text one character at a time
function typeText(text, index = 0) {
  splashText.textContent = text.substring(0, index);
  splashText.appendChild(typingIndicator);

  // Set a timeout to type each character with a random delay
  typingTimeout = setTimeout(() => {
    if (index < text.length) {
      typeText(text, index + 1);
    } else {
      // After typing the text, fade it out and remove the splash screen
      setTimeout(() => {
        let opacity = 1;
        const fadeOutInterval = setInterval(() => {
          if (opacity <= 0) {
            clearInterval(fadeOutInterval);
            document.body.removeChild(splash);

            // Change the opacity of the main website elements after removing the splash screen
            const ageText = document.querySelector(".age-text");
            const constructionText =
              document.querySelector(".construction-text");
            const footerText = document.querySelector(".footer-text");
            const footerLinks = document.querySelector(".footer-links");
            ageText.style.opacity = "1";
            constructionText.style.opacity = "1";
            footerText.style.opacity = "1";
            footerLinks.style.opacity = "1";
          }
          splash.style.opacity = opacity;
          opacity -= 0.01;
        }, 10);
      }, 1000);
    }
  }, Math.random() * 200 + 100);
}

// Call the typeText function to type "{tinsley.dev}" on the splash screen
typeText("{tinsley.dev}");
