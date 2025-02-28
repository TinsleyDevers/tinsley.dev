// components/EasterEggs.tsx

"use client";

import { useEffect } from "react";

export default function EasterEggs() {
  useEffect(() => {
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

    displayConsoleMessage();
  }, []);

  return null;
}
