// stars.js
document.addEventListener("DOMContentLoaded", () => {
  function initStars() {
    const STAR_COUNT = 100;
    const starContainer = document.getElementById("stars");

    if (!starContainer) {
      console.error("Star container element with ID 'stars' not found.");
      return;
    }

    createStars(starContainer, STAR_COUNT);
  }

  const createStars = (container, count) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${getRandomPercentage()}%`;
      star.style.left = `${getRandomPercentage()}%`;
      star.style.animationDelay = `${getRandomDelay()}s`;
      fragment.appendChild(star);
    }

    container.appendChild(fragment);
  };

  const getRandomPercentage = () => Math.random() * 100;

  const getRandomDelay = () => Math.random() * 5;

  initStars();
});
