// easterEgg.js


// console message
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
    "\nHey There! I'm glad you liked the site. Want to see what's going on? Check out the repo at https://github.com/TinsleyDevers/tinsley.dev\n\nAlso, you can contact me via tinsley.devers@gmail.com if you have any questions!",
    "font-family:inherit; font-size: 12px"
  );  

// old website
console.log('Logo element:', logo);

document.addEventListener("DOMContentLoaded", function () {
    const requiredClicks = 5;
    let clickCount = 0;
    let clickTimeout;

    const logo = document.getElementById('logo');

    function resetClickCount() {
        clickCount = 0;
    }

    logo.addEventListener('click', function () {
        clickCount++;

        if (clickCount === requiredClicks) {
            window.location.href = './oldweb/index.html';
        }

        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(resetClickCount, 5000); // reset after 5 seconds of inactivity
    });
});


// more coming soon...