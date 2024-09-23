// customCursor.js
(() => {
  const initCustomCursor = () => {
    const cursorInner = document.getElementById("cursorInner");
    const cursorOuter = document.getElementById("cursorOuter");

    if (!cursorInner || !cursorOuter) {
      console.error(
        "Elements with IDs 'cursorInner' and/or 'cursorOuter' not found."
      );
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      cursorInner.style.display = "none";
      cursorOuter.style.display = "none";
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorInnerX = mouseX;
    let cursorInnerY = mouseY;
    let cursorOuterX = mouseX;
    let cursorOuterY = mouseY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      cursorInnerX += (mouseX - cursorInnerX) * 0.35;
      cursorInnerY += (mouseY - cursorInnerY) * 0.35;

      const dx = cursorInnerX - cursorOuterX;
      const dy = cursorInnerY - cursorOuterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const activationDistance = 25;

      if (distance > activationDistance) {
        cursorOuterX += (cursorInnerX - cursorOuterX) * 0.05;
        cursorOuterY += (cursorInnerY - cursorOuterY) * 0.05;
      }

      cursorInner.style.transform = `translate(${cursorInnerX}px, ${cursorInnerY}px) translate(-50%, -50%)`;
      cursorOuter.style.transform = `translate(${cursorOuterX}px, ${cursorOuterY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    };

    const addInteractivity = () => {
      const hoverElements = document.querySelectorAll(
        "a, button, .hover-effect"
      );

      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursorInner.classList.add("hover");
          cursorOuter.classList.add("hover");
        });

        el.addEventListener("mouseleave", () => {
          cursorInner.classList.remove("hover");
          cursorOuter.classList.remove("hover");
        });
      });

      document.addEventListener("mousedown", () => {
        cursorInner.classList.add("active");
        cursorOuter.classList.add("active");
      });

      document.addEventListener("mouseup", () => {
        cursorInner.classList.remove("active");
        cursorOuter.classList.remove("active");
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    animateCursor();
    addInteractivity();
  };

  document.addEventListener("DOMContentLoaded", initCustomCursor);
})();
