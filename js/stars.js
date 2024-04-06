function createStars() {
  const starCount = 100;
  const starContainer = document.getElementById("stars");
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starContainer.appendChild(star);
  }
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
    "\nHey There! I'm glad you liked the site. Want to see what's going on? Sure, check the repo at https://github.com/TinsleyDevers/tinsley.dev\n\nAnd don't forget to send me an email at tinsley.devers@gmail.com if you're interested in contacting me to work at your company",
  "font-family:inherit; font-size: 12px"
);
