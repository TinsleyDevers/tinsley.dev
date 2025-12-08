"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = [
      "color: #171717",
      "font-size: 14px",
      "font-family: monospace",
      "line-height: 1.4",
    ].join(";");

    const linkStyles = [
      "color: #2563eb",
      "font-size: 14px",
      "font-family: monospace",
      "text-decoration: underline",
    ].join(";");

    const asciiArt = `
%c
  ████████╗██╗███╗   ██╗███████╗██╗     ███████╗██╗   ██╗
  ╚══██╔══╝██║████╗  ██║██╔════╝██║     ██╔════╝╚██╗ ██╔╝
     ██║   ██║██╔██╗ ██║███████╗██║     █████╗   ╚████╔╝ 
     ██║   ██║██║╚██╗██║╚════██║██║     ██╔══╝    ╚██╔╝  
     ██║   ██║██║ ╚████║███████║███████╗███████╗   ██║   
     ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝   ╚═╝   
                                                    .dev
`;

    console.log(asciiArt, "color: #171717; font-family: monospace;");

    console.log(
      "%cHey there! I'm glad you liked the site. Want to see what's going on? Check out the repo at https://github.com/TinsleyDevers/tinsley.dev\n\nAlso, you can contact me via contact@tinsley.dev if you have any questions!",
      styles
    );
  }, []);

  return null;
}
