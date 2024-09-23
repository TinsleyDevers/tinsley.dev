// parallax.js
(() => {
  const parallaxEffect = () => {
    const SCROLL_THRESHOLD = 1024;
    const scrollableContent = document.querySelector(".scrollable");

    if (!scrollableContent) {
      console.error(
        "Scrollable content element with class 'scrollable' not found."
      );
      return;
    }

    const parallaxConfig = {
      headname: 0.5,
      ageText: 0.47,
      constructionText: 0.52,
      scrollIndicator: -0.7,
    };

    const parallaxElements = {
      headname: document.querySelector(".headname"),
      ageText: document.querySelector(".age-text"),
      constructionText: document.querySelector(".construction-text"),
      scrollIndicator: document.querySelector(".scroll-down-indicator"),
    };

    const allElementsExist = Object.values(parallaxElements).every(
      (element) => element !== null
    );

    if (!allElementsExist) {
      console.error("One or more parallax target elements are missing.");
      return;
    }

    const throttle = (func, limit) => {
      let lastFunc;
      let lastRan;
      return function (...args) {
        const context = this;
        if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    };

    const updateParallax = () => {
      const scrollY = scrollableContent.scrollTop;

      Object.entries(parallaxConfig).forEach(([key, speed]) => {
        parallaxElements[key].style.transform = `translateY(${
          scrollY * speed
        }px)`;
      });
    };

    const throttledUpdateParallax = throttle(() => {
      requestAnimationFrame(updateParallax);
    }, 16);

    const enableParallax = () => {
      scrollableContent.addEventListener("scroll", throttledUpdateParallax);
      updateParallax();
    };

    const disableParallax = () => {
      scrollableContent.removeEventListener("scroll", throttledUpdateParallax);
      Object.keys(parallaxElements).forEach((key) => {
        parallaxElements[key].style.transform = "translateY(0)";
      });
    };

    const handleResize = () => {
      if (window.innerWidth > SCROLL_THRESHOLD) {
        enableParallax();
      } else {
        disableParallax();
      }
    };

    handleResize();
    window.addEventListener("resize", throttle(handleResize, 200));
  };

  document.addEventListener("DOMContentLoaded", parallaxEffect);
})();
