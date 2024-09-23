// age.js
(() => {
  const initAgeCalculator = () => {
    const birthDate = new Date(2003, 3, 30);
    const ageElement = document.querySelector(".age-number");
    const animationDuration = 1000;
    const decimalPlaces = 9;

    if (!ageElement) {
      console.error("Age display element with class 'age-number' not found.");
      return;
    }

    let previousAge = 0;

    const calculateCurrentAge = () => {
      const now = new Date();
      const ageInMilliseconds = now - birthDate;
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
      return ageInYears;
    };

    const animateAge = (startAge, endAge, duration) => {
      const startTime = performance.now();

      const animationLoop = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentAge = startAge + (endAge - startAge) * progress;
        ageElement.textContent = currentAge.toFixed(decimalPlaces);

        if (progress < 1) {
          requestAnimationFrame(animationLoop);
        }
      };

      requestAnimationFrame(animationLoop);
    };

    const updateAge = () => {
      const currentAge = calculateCurrentAge();
      animateAge(previousAge, currentAge, animationDuration);
      previousAge = currentAge;
    };

    updateAge();
    setInterval(updateAge, 1000);
  };

  document.addEventListener("DOMContentLoaded", initAgeCalculator);
})();
