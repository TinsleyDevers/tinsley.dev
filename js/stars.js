function createStars() {
  const starCount = 100;
  const starContainer = document.getElementById("stars");
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    starContainer.appendChild(star);
    setRandomPosition(star);
    star.addEventListener('animationiteration', () => setRandomPosition(star));
  }
}

function setRandomPosition(star) {
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 2.5}s`;
}

createStars();

console.log(
  "%c\n" +
    "     CONTACT ME\n" +
    "   ----------------------------------------\n" +
    "     .   *   .           *       *  .  *   .\n" +
    "  *      .      .  *  .  +     *  .     +\n" +
    " . Tinsley *        *        .     *        *\n" +
    "     *  .    +   *   .    .  +     .     *    *\n" +
    "  *        .     +  *  .     *        .      +\n" +
    "     .  +    .   *   .    .     *        *\n" +
    "  *       .        *  +  .     .   Devers . *\n" +
    "     *        .  +     *        *        .   +\n" +
    "  .     *        .     +  *       *        .\n" +
    "\nHey There! I'm glad you liked the site. Want to see what's going on? check out the repo at https://github.com/TinsleyDevers/tinsley.dev\n\nAlso, you can contact me via tinsley.devers@gmail.com if you have any questions!",
  "font-family:inherit; font-size: 12px"
);
