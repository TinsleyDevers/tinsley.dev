const splash = document.querySelector(".splash");
const splashText = document.querySelector(".splash-text");

const typingIndicator = document.createElement("span");
typingIndicator.classList.add("typing-indicator");
typingIndicator.textContent = "_";
let typingTimeout;

document.body.style.overflowY = "hidden";

function typeText(text, index = 0) {
  splashText.textContent = text.substring(0, index);
  splashText.appendChild(typingIndicator);

  typingTimeout = setTimeout(() => {
    if (index < text.length) {
      typeText(text, index + 1);
    } else {
      setTimeout(() => {
        let opacity = 1;
        const fadeOutInterval = setInterval(() => {
          if (opacity <= 0) {
            clearInterval(fadeOutInterval);
            document.body.removeChild(splash);
            document.body.style.overflowY = "scroll";

            const contentElements = document.querySelectorAll(
              ".headname, .age-text, .construction-text, .footer-text, .footer-links, #mouseCircle, .scroll-down-indicator"
            );
            contentElements.forEach((el) => {
              el.style.opacity = "1";
            });
          }
          splash.style.opacity = opacity;
          opacity -= 0.01;
        }, 10);
      }, 1000);
    }
  }, Math.random() * 200 + 100);
}

typeText("{tinsley.dev}");
