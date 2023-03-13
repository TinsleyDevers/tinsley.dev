const birthDate = new Date(2003, 3, 30);
const ageText = document.querySelector(".age-text");

function updateAge() {
  const now = new Date();
  const diff = now - birthDate;
  const age = diff / (1000 * 60 * 60 * 24 * 365.25);
  const startAge = Number(ageText.textContent.match(/\d+\.\d+/));
  const endAge = age;
  const duration = 1000;
  const range = endAge - startAge;
  let currentAge = startAge;
  const increment = range / (duration / 10);
  const roll = setInterval(() => {
    currentAge += increment;
    if (currentAge >= endAge) {
      clearInterval(roll);
      currentAge = endAge;
    }
    ageText.textContent = `I'm a ${currentAge.toFixed(9)} year-old developer.`;
  }, 10);
}

updateAge();
setInterval(updateAge, 1000);
