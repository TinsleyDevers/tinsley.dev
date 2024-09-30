// revealSections.js

document.addEventListener("DOMContentLoaded", () => {
  const hiddenSections = document.querySelectorAll(".hidden-section");
  const scrollableContent = document.querySelector(".scrollable");
  const scrollIndicator = document.querySelector(".scroll-down-indicator");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible-section");
        entry.target.classList.remove("hidden-section");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, options);

  hiddenSections.forEach((section) => {
    observer.observe(section);
  });

  const hideScrollIndicator = () => {
    if (scrollableContent.scrollTop > 50) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
    }
  };

  scrollableContent.addEventListener("scroll", hideScrollIndicator);
});
