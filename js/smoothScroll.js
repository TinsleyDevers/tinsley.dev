// smoothScroll.js
document.addEventListener("DOMContentLoaded", () => {
  const scrollableContent = document.querySelector(".scrollable");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!scrollableContent) {
    console.error("Scrollable content element not found.");
    return;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetPosition = targetSection.offsetTop;

        scrollToPosition(scrollableContent, targetPosition, 800);
      } else {
        console.error(`Section with ID '${targetId}' not found.`);
      }
    });
  });

  function scrollToPosition(container, to, duration) {
    const start = container.scrollTop;
    const change = to - start;
    const increment = 20;

    let currentTime = 0;

    const animateScroll = function () {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      container.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
});
