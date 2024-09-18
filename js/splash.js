// splash.js
document.addEventListener("DOMContentLoaded", function () {
    const splash = document.querySelector(".splash");
    const splashText = document.querySelector(".splash-text");

    const typingIndicator = document.createElement("span");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.textContent = "_";

    function typeText(text, index = 0) {
        splashText.textContent = text.substring(0, index);
        splashText.appendChild(typingIndicator);

        setTimeout(() => {
            if (index < text.length) {
                typeText(text, index + 1);
            } else {
                setTimeout(() => {
                    splash.classList.add('fade-out');
                    splash.addEventListener('transitionend', () => {
                        splash.remove();
                        document.body.classList.remove('content-hidden');
                        document.body.classList.add('content-visible');
                    });
                }, 1000);
            }
        }, Math.random() * 100 + 50);
    }

    typeText("{tinsley.dev}");
});

// footer get current year
document.getElementById('current-year').textContent = new Date().getFullYear();