const birthDate = new Date(2003, 4, 30);
const ageText = document.querySelector(".age-text");
const ageNumber = document.querySelector(".age-number");

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
    ageNumber.textContent = `${currentAge.toFixed(9)}`;
  }, 10); /* change the currentAge.toFixed(#) to change the number of decimal places */
}

updateAge();
setInterval(updateAge, 1000);
