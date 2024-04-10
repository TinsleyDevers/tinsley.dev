function parallaxEffect() {
  const ageText = document.querySelector(".age-text");
  const constructionText = document.querySelector(".construction-text");
  const scrollIndicator = document.querySelector(".scroll-down-indicator");
  const headname = document.querySelector(".headname");

  const headnameSpeed = 0.8;
  const ageTextSpeed = 0.47;
  const constructionTextSpeed = 0.51;
  const scrollIndicatorSpeed = 0.28;

  const scrollY = window.scrollY;

  headname.style.transform = `translateY(${scrollY * headnameSpeed}px)`;
  ageText.style.transform = `translateY(${scrollY * ageTextSpeed}px)`;
  constructionText.style.transform = `translateY(${
    scrollY * constructionTextSpeed
  }px)`;
  scrollIndicator.style.transform = `translateY(${
    scrollY * scrollIndicatorSpeed
  }px)`;

  requestAnimationFrame(parallaxEffect);
}

document.addEventListener("DOMContentLoaded", parallaxEffect);
