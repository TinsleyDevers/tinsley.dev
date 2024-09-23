// easterEggs.js

(() => {
  // console message
  const displayConsoleMessage = () => {
    const message = `
  %c
       CONTACT ME
     ----------------------------------------
       .   *   .           *       *  .  *   .
    *      .      .  *  .  +     *  .     +
   . Tinsley *        *        .     *        *
       *  .    +   *   .    .  +     .     *    *
    *        .     +  *  .     *        .      +
       .  +    .   *   .    .     *        *
    *       .        *  +  .     .   Devers . *
       *        .  +     *        *        .   +
    .     *        .     +  *       *        .
  
  Hey There! I'm glad you liked the site. Want to see what's going on? Check out the repo at https://github.com/TinsleyDevers/tinsley.dev
  
  Also, you can contact me via tinsley.devers@gmail.com if you have any questions!
      `;

    const styles = "font-family:inherit; font-size: 12px";

    console.info(message, styles);
  };

  const initEasterEgg = () => {
    displayConsoleMessage();
    initClickEasterEgg();
  };

  // old website
  const initClickEasterEgg = () => {
    const REQUIRED_CLICKS = 5;
    const RESET_TIMEOUT = 5000;
    let clickCount = 0;
    let clickTimeout;

    const logo = document.getElementById("logo");

    if (!logo) {
      console.error("Element with ID 'logo' not found.");
      return;
    }

    const resetClickCount = () => {
      clickCount = 0;
    };

    const handleLogoClick = () => {
      clickCount++;

      if (clickCount === REQUIRED_CLICKS) {
        redirectToOldWebsite();
        resetClickCount();
        clearTimeout(clickTimeout);
        return;
      }

      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(resetClickCount, RESET_TIMEOUT);
    };

    const redirectToOldWebsite = () => {
      const oldWebsiteURL = "./oldweb/index.html";
      window.location.href = oldWebsiteURL;
    };

    logo.addEventListener("click", handleLogoClick);
  };

  document.addEventListener("DOMContentLoaded", initEasterEgg);
})();
