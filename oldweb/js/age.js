const birthDate = new Date(2003, 3, 30); // April 30, 2003
const ageNumber = document.querySelector(".age-number");
let previousAge = 0;

function updateAge() {
    const now = new Date();
    const ageInMilliseconds = now - birthDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    animateAge(previousAge, ageInYears, 1000); // duration in ms
    previousAge = ageInYears;
}

function animateAge(startAge, endAge, duration) {
    const startTime = performance.now();

    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentAge = startAge + (endAge - startAge) * progress;
        ageNumber.textContent = currentAge.toFixed(9); // Adjust decimal places as desired
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

updateAge();
setInterval(updateAge, 1000);
