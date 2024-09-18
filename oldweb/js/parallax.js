function parallaxEffect() {
  const scrollableContent = document.querySelector(".scrollable");

  if (window.innerWidth > 1024 && scrollableContent) {
      const ageText = document.querySelector(".age-text");
      const constructionText = document.querySelector(".construction-text");
      const scrollIndicator = document.querySelector(".scroll-down-indicator");
      const headname = document.querySelector(".headname");

      const headnameSpeed = 0.5;
      const ageTextSpeed = 0.47;
      const constructionTextSpeed = 0.52;
      const scrollIndicatorSpeed = 0.7;

      function updateParallax() {
          const scrollY = scrollableContent.scrollTop;

          headname.style.transform = `translateY(${scrollY * headnameSpeed}px)`;
          ageText.style.transform = `translateY(${scrollY * ageTextSpeed}px)`;
          constructionText.style.transform = `translateY(${scrollY * constructionTextSpeed}px)`;
          scrollIndicator.style.transform = `translateY(${-scrollY * scrollIndicatorSpeed}px)`;
      }

      scrollableContent.addEventListener('scroll', updateParallax);
  }
}

document.addEventListener("DOMContentLoaded", parallaxEffect);
