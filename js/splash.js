// splash.js
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.querySelector(".splash");
  const splashText = document.querySelector(".splash-text");
  const currentYearElement = document.getElementById("current-year");

  if (!splash || !splashText) {
    console.error("Splash elements not found.");
    return;
  }

  initSplash();
  setCurrentYear();

  function initSplash() {
    const message = "{tinsley.dev}";
    const typingSpeedRange = { min: 50, max: 150 };
    const fadeOutDelay = 1000;
    const fadeOutDuration = 1000;

    const typingIndicator = createTypingIndicator();

    typeText(message, 0, typingIndicator, typingSpeedRange, () => {
      initiateFadeOut(fadeOutDelay, fadeOutDuration);
    });
  }

  function createTypingIndicator() {
    const indicator = document.createElement("span");
    indicator.classList.add("typing-indicator");
    indicator.textContent = "_";
    splashText.appendChild(indicator);
    return indicator;
  }

  function typeText(text, index, indicator, speedRange, callback) {
    if (index > 0) {
      splashText.innerHTML = `${text.substring(
        0,
        index
      )}<span class="typing-indicator">_</span>`;
    }

    if (index < text.length) {
      const delay = getRandomDelay(speedRange.min, speedRange.max);
      setTimeout(
        () => typeText(text, index + 1, indicator, speedRange, callback),
        delay
      );
    } else {
      setTimeout(callback, 500);
    }
  }

  function initiateFadeOut(delay, duration) {
    setTimeout(() => {
      splash.classList.add("fade-out");

      setTimeout(() => {
        handleSplashRemoval();
      }, duration);
    }, delay);
  }

  function handleSplashRemoval() {
    splash.remove();
    document.body.classList.remove("content-hidden");
    document.body.classList.add("content-visible");

    const mainContent = document.querySelector(".scrollable");
    if (mainContent) {
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
    }
  }

  function setCurrentYear() {
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  }

  function getRandomDelay(min, max) {
    return Math.random() * (max - min) + min;
  }
});
