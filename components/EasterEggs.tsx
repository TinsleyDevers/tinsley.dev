"use client";

import { useEffect, useState, useRef } from "react";

/**
 * EasterEggs component:
 * - Contains only Thanos, Matrix, Hack, Retro, and Tinsley ("skills" highlight).
 * - Ignores keystrokes if the user is typing in form fields.
 * - Fireworks triggered by 16 consecutive clicks on {tinsley.dev} title.
 * - 5-second global cooldown for all eggs.
 */

export default function EasterEggs() {
  // ----------------------------------------------------------------
  // 1) State & Refs
  // ----------------------------------------------------------------
  const [secretWord, setSecretWord] = useState("");
  const [eggCooldownTime, setEggCooldownTime] = useState(0); // Track last time an egg was triggered
  const [activeEgg, setActiveEgg] = useState<string | null>(null); // e.g. "hack", "retro", etc. if toggled on
  const [titleClickCount, setTitleClickCount] = useState(0);

  // For "Matrix code" and "Konami" references
  const [konami, setKonami] = useState<string[]>([]);
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  // We’ll store an Audio element reference for playing optional sounds
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ----------------------------------------------------------------
  // 2) Setup on mount (audio, console messages, etc.)
  // ----------------------------------------------------------------
  useEffect(() => {
    // Create an Audio element
    const audio = new Audio();
    audio.volume = 0.3;
    audioRef.current = audio;

    // Display your console ASCII messages
    const asciiText = `  _______  _          _            
 |__   __|(_)        | |           
    | |   _ _ __  ___| | ___ _   _ 
    | |  | | '_ \\/ __| |/ _ \\ | | |
    | |  | | | | \\__ \\ |  __/ |_| |
    |_|  |_|_| |_|___/_|\\___|\\___,|
                              __/ |
                             |___/ `;

    // Additional ASCII referencing “CONTACT ME”:
    const contactASCII = `
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
  
  Also, you can contact me via contact@tinsley.dev if you have any questions!
      `;

    console.log(
      `%c${asciiText}`,
      "font-family: monospace; font-size: 14px; color: #9333ea; font-weight: bold;"
    );

    console.info(
      `%c${contactASCII}`,
      "font-family: monospace; font-size: 12px; color: #a855f7"
    );
  }, []);

  // ----------------------------------------------------------------
  // 3) Utility: Check if user is in a form input
  // ----------------------------------------------------------------
  function isTypingInForm(e: KeyboardEvent | MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (!target) return false;
    // If the target is an input, textarea, or inside a .form container, skip triggers
    const tag = target.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") {
      return true;
    }
    // If the element is inside a form with querySelector
    const closestForm = target.closest("form");
    if (closestForm) {
      return true;
    }
    // You can add more checks if needed
    return false;
  }

  // ----------------------------------------------------------------
  // 4) Global 5s cooldown check
  // ----------------------------------------------------------------
  const canTriggerEgg = () => {
    const now = Date.now();
    if (now - eggCooldownTime < 5000) {
      // still cooling down
      return false;
    }
    return true;
  };
  const setEggTriggered = (eggName?: string) => {
    // set activeEgg if it is a toggled effect. For 'hack' or 'retro' we set them
    // for 'tinsley' or 'thanos' or 'matrix' that are mostly ephemeral, we can do a quick set
    setEggCooldownTime(Date.now());
    if (eggName) setActiveEgg(eggName);
  };

  // ----------------------------------------------------------------
  // 5) The requested Easter eggs
  // ----------------------------------------------------------------

  // (1) Tinsley => Skills highlight
  const skillsAnimation = () => {
    // If it's already active or we can't trigger => skip
    if (activeEgg === "tinsley" || !canTriggerEgg()) return;
    setEggTriggered("tinsley");

    // Quick skill highlight
    const skills = document.querySelectorAll(
      ".bg-purple-600, .bg-purple-600\\/40, .bg-purple-600\\/50"
    );
    skills.forEach((skill) => {
      skill.classList.add("activated-skill");
      const el = skill as HTMLElement;
      el.style.transition = "all 0.5s";
      el.style.background = "linear-gradient(90deg, #9333ea, #ec4899)";
      el.style.transform = "scale(1.1)";
      el.style.boxShadow = "0 0 15px rgba(236, 72, 153, 0.6)";

      setTimeout(() => {
        el.style.transform = "";
        el.style.background = "";
        el.style.boxShadow = "";
        skill.classList.remove("activated-skill");
      }, 2500);
    });

    // bottom right notification
    const note = document.createElement("div");
    note.textContent = "✨ Skills upgraded ✨";
    note.style.position = "fixed";
    note.style.bottom = "20px";
    note.style.right = "20px";
    note.style.backgroundColor = "rgba(147, 51, 234, 0.9)";
    note.style.color = "white";
    note.style.padding = "10px 15px";
    note.style.borderRadius = "4px";
    note.style.fontFamily = "monospace";
    note.style.fontSize = "14px";
    note.style.zIndex = "9999";
    note.style.opacity = "0";
    note.style.transform = "translateY(20px)";
    note.style.transition = "all 0.3s ease";
    document.body.appendChild(note);
    setTimeout(() => {
      note.style.opacity = "1";
      note.style.transform = "translateY(0)";
    }, 100);
    setTimeout(() => {
      note.style.opacity = "0";
      note.style.transform = "translateY(20px)";
      setTimeout(() => {
        if (document.body.contains(note)) document.body.removeChild(note);
      }, 300);
    }, 3000);

    // remove activeEgg after a short bit
    setTimeout(() => setActiveEgg(null), 5000);
  };

  // (2) Hack => Terminal
  const hackingEffect = () => {
    // If already active or cooldown => skip
    if (activeEgg === "hack" || !canTriggerEgg()) return;
    setEggTriggered("hack");

    // Optionally play sound
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/typing.mp3"; // change if needed
        audio.play().catch(() => console.log("Audio blocked"));
      }
    } catch (err) {
      console.log("Audio error", err);
    }

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.color = "#00ff00";
    overlay.style.fontFamily = "monospace";
    overlay.style.padding = "20px";
    overlay.style.boxSizing = "border-box";
    overlay.style.overflow = "hidden";
    overlay.style.zIndex = "10000";
    document.body.appendChild(overlay);

    // Terminal window
    const terminal = document.createElement("div");
    terminal.style.width = "80%";
    terminal.style.maxWidth = "800px";
    terminal.style.height = "500px";
    terminal.style.margin = "50px auto";
    terminal.style.backgroundColor = "rgba(0, 20, 0, 0.9)";
    terminal.style.border = "1px solid #00ff00";
    terminal.style.borderRadius = "5px";
    terminal.style.padding = "10px";
    terminal.style.overflow = "auto";
    terminal.style.boxShadow = "0 0 10px #00ff00";
    overlay.appendChild(terminal);

    const header = document.createElement("div");
    header.textContent = "Terminal - Access Granted";
    header.style.borderBottom = "1px solid #00ff00";
    header.style.padding = "5px";
    header.style.marginBottom = "10px";
    terminal.appendChild(header);

    const content = document.createElement("div");
    terminal.appendChild(content);

    const hackingLines = [
      "> Initializing hacking sequence...",
      "> Attempting to breach firewall...",
      "> Firewall bypassed successfully",
      "> Scanning for vulnerabilities...",
      "> Multiple vulnerabilities detected",
      "> Executing exploit code...",
      "> Exploit successful",
      "> Gaining root access...",
      "> Root access granted",
      "> Accessing hidden data...",
      "> EASTER EGGS UNLOCKED",
      "> System compromised",
      "",
      "Try these Easter eggs:",
      "- 'tinsley' for skill highlight",
      "- 'thanos' for snap effect",
      "- 'retro' for retro mode (toggle)",
      "- Konami code => Matrix",
      "",
      "> Press ESC to exit",
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = document.createElement("div");
    content.appendChild(currentLine);

    let typingInterval: number | undefined;
    const startTyping = (ms: number) => {
      typingInterval = window.setInterval(() => {
        if (lineIndex >= hackingLines.length) {
          if (typingInterval) clearInterval(typingInterval);
          return;
        }
        const line = hackingLines[lineIndex];
        if (charIndex < line.length) {
          currentLine.textContent += line.charAt(charIndex);
          charIndex++;
        } else {
          lineIndex++;
          charIndex = 0;
          if (lineIndex < hackingLines.length) {
            currentLine = document.createElement("div");
            content.appendChild(currentLine);
            terminal.scrollTop = terminal.scrollHeight;
            if (typingInterval) clearInterval(typingInterval);
            setTimeout(() => {
              startTyping(Math.random() * 30 + 20);
            }, 300);
          }
        }
      }, ms);
    };
    startTyping(30);

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.removeEventListener("keydown", handleEscKey);
        if (typingInterval) clearInterval(typingInterval);
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        setActiveEgg(null); // allow re-activate after they close
      }
    };
    document.addEventListener("keydown", handleEscKey);
  };

  // (3) Retro => toggle
  const toggleRetroMode = () => {
    // If already active => turn it OFF if typed again, or skip? We'll do toggle.
    if (!canTriggerEgg()) return;

    if (activeEgg === "retro") {
      // Turn OFF retro
      endRetro();
      return;
    }
    // Otherwise turn ON
    startRetro();
  };

  function startRetro() {
    setEggTriggered("retro");

    // Possibly play sound
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/retro.mp3"; // change if needed
        audio.play().catch(() => console.log("Audio blocked"));
      }
    } catch (err) {
      console.log("Audio error", err);
    }

    // Apply the “CRT” filter
    const retroFilter = document.createElement("div");
    retroFilter.id = "retro-filter-overlay";
    retroFilter.style.position = "fixed";
    retroFilter.style.top = "0";
    retroFilter.style.left = "0";
    retroFilter.style.width = "100%";
    retroFilter.style.height = "100%";
    retroFilter.style.zIndex = "9998";
    retroFilter.style.pointerEvents = "none";
    retroFilter.style.background =
      "linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%)";
    retroFilter.style.backgroundSize = "100% 4px";
    retroFilter.style.animation = "scanline 0.2s linear infinite";
    retroFilter.style.opacity = "0.8";
    retroFilter.style.mixBlendMode = "overlay";
    document.body.appendChild(retroFilter);

    const vignette = document.createElement("div");
    vignette.id = "retro-vignette";
    vignette.style.position = "fixed";
    vignette.style.top = "0";
    vignette.style.left = "0";
    vignette.style.width = "100%";
    vignette.style.height = "100%";
    vignette.style.zIndex = "9997";
    vignette.style.pointerEvents = "none";
    vignette.style.boxShadow = "inset 0 0 150px rgba(0,0,0,0.7)";
    vignette.style.mixBlendMode = "multiply";
    document.body.appendChild(vignette);

    const style = document.createElement("style");
    style.id = "retro-style";
    style.innerHTML = `
      @keyframes scanline {
        0% { transform: translateY(0); }
        100% { transform: translateY(4px); }
      }
      .retro-text {
        font-family: 'VT323', monospace, 'Courier New', Courier !important;
        text-shadow: 2px 2px 0 rgba(0, 255, 0, 0.4) !important;
        color: rgb(0, 255, 0) !important;
      }
      .retro-filter {
        filter: contrast(1.2) brightness(1.1) saturate(0.5) sepia(0.2) !important;
      }
    `;
    document.head.appendChild(style);

    document.body.classList.add("retro-filter");
    const allText = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, div, a"
    );
    allText.forEach((el) => el.classList.add("retro-text"));
  }

  function endRetro() {
    // Remove the overlays
    const styleEl = document.getElementById("retro-style");
    if (styleEl) styleEl.remove();
    const retroFilter = document.getElementById("retro-filter-overlay");
    if (retroFilter) retroFilter.remove();
    const vignette = document.getElementById("retro-vignette");
    if (vignette) vignette.remove();

    document.body.classList.remove("retro-filter");
    const allText = document.querySelectorAll(".retro-text");
    allText.forEach((el) => el.classList.remove("retro-text"));

    setActiveEgg(null);
  }

  // (4) Matrix => Konami code
  const triggerMatrixEasterEgg = () => {
    if (activeEgg === "matrix" || !canTriggerEgg()) return;
    setEggTriggered("matrix");

    // Optional sound
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/matrix.mp3";
        audio.play().catch(() => console.log("Audio blocked"));
      }
    } catch (err) {
      console.log("Audio error", err);
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setActiveEgg(null);
      return;
    }

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const characters =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF{}[]ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ".split(
        ""
      );
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let intervalId: number | undefined;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#fff";
        } else {
          ctx.fillStyle = "#0f0";
        }
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    intervalId = window.setInterval(draw, 33);

    setTimeout(() => {
      canvas.classList.add("fade-out");
      canvas.style.transition = "opacity 3s";
      canvas.style.opacity = "0";

      setTimeout(() => {
        if (intervalId) clearInterval(intervalId);
        if (document.body.contains(canvas)) {
          document.body.removeChild(canvas);
        }
        setActiveEgg(null);
      }, 3000);
    }, 5000);
  };

  // (5) Thanos => Snap
  const thanosSnap = () => {
    if (activeEgg === "thanos" || !canTriggerEgg()) return;
    setEggTriggered("thanos");

    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/snap.mp3";
        audio.play().catch(() => console.log("Audio blocked"));
      }
    } catch (err) {
      console.log("Audio error", err);
    }

    const selector = "h1, h2, h3, p, img, .w-10, .h-10, button, a, .blend-glow";
    const elements = Array.from(document.querySelectorAll(selector));
    elements.sort(() => Math.random() - 0.5);
    const half = Math.floor(elements.length / 2);
    const toSnap = elements.slice(0, half);

    // Flash
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.top = "0";
    flash.style.left = "0";
    flash.style.width = "100%";
    flash.style.height = "100%";
    flash.style.backgroundColor = "#fff";
    flash.style.opacity = "0";
    flash.style.zIndex = "9999";
    flash.style.pointerEvents = "none";
    document.body.appendChild(flash);
    flash.animate([{ opacity: 0 }, { opacity: 0.7 }, { opacity: 0 }], {
      duration: 1000,
      easing: "ease-out",
    });
    setTimeout(() => {
      if (document.body.contains(flash)) document.body.removeChild(flash);
    }, 1000);

    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @keyframes disintegrate {
        0% {
          opacity: 1;
          filter: brightness(1);
          transform: scale(1);
        }
        100% {
          opacity: 0;
          filter: brightness(3);
          transform: scale(1.2);
        }
      }
    `;
    document.head.appendChild(styleEl);

    toSnap.forEach((el, index) => {
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const particles = Math.max(
          5,
          Math.floor((rect.width * rect.height) / 1000)
        );
        for (let i = 0; i < particles; i++) {
          const p = document.createElement("div");
          p.style.position = "fixed";
          p.style.width = "3px";
          p.style.height = "3px";
          p.style.backgroundColor = "#ffb142";
          p.style.borderRadius = "50%";
          const x = rect.left + Math.random() * rect.width;
          const y = rect.top + Math.random() * rect.height;
          p.style.left = `${x}px`;
          p.style.top = `${y}px`;
          p.style.zIndex = "10000";
          document.body.appendChild(p);

          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 100 + 50;
          const dur = Math.random() * 1500 + 1000;
          p.animate(
            [
              { transform: "scale(1)", opacity: 1 },
              {
                transform: `scale(0) translate(${
                  Math.cos(angle) * distance
                }px, ${Math.sin(angle) * distance}px)`,
                opacity: 0,
              },
            ],
            { duration: dur, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
          );
          setTimeout(() => {
            if (document.body.contains(p)) document.body.removeChild(p);
          }, dur);
        }
        (el as HTMLElement).style.animation = "disintegrate 1.5s forwards";
        setTimeout(() => {
          (el as HTMLElement).style.visibility = "hidden";
        }, 1500);
      }, Math.random() * 1000 + index * 30);
    });

    setTimeout(() => {
      const msg = document.createElement("div");
      msg.textContent = "Perfectly balanced, as all things should be.";
      msg.style.position = "fixed";
      msg.style.top = "50%";
      msg.style.left = "50%";
      msg.style.transform = "translate(-50%, -50%)";
      msg.style.color = "white";
      msg.style.fontFamily = "sans-serif";
      msg.style.fontSize = "24px";
      msg.style.fontWeight = "bold";
      msg.style.textAlign = "center";
      msg.style.zIndex = "10001";
      msg.style.opacity = "0";
      msg.style.transition = "opacity 1s";
      document.body.appendChild(msg);
      setTimeout(() => {
        msg.style.opacity = "1";
      }, 100);

      // restore
      setTimeout(() => {
        msg.style.opacity = "0";
        setTimeout(() => {
          if (document.body.contains(msg)) document.body.removeChild(msg);
        }, 1000);

        toSnap.forEach((el) => {
          (el as HTMLElement).style.animation = "";
          (el as HTMLElement).style.visibility = "";
          (el as HTMLElement).style.opacity = "0";
          (el as HTMLElement).style.transition = "opacity 1s";
          setTimeout(() => {
            (el as HTMLElement).style.opacity = "";
          }, 100);
        });

        if (document.head.contains(styleEl)) {
          styleEl.remove();
        }
        setActiveEgg(null);
      }, 5000);
    }, 2000);
  };

  // ----------------------------------------------------------------
  // 6) Fireworks triggered by 16 clicks on site title
  // ----------------------------------------------------------------
  const triggerFireworks = () => {
    // Just do a quick ephemeral effect. Check cooldown
    if (!canTriggerEgg()) return;

    setEggTriggered(); // no name because ephemeral

    // We'll do a simpler confetti or fireworks effect
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "9999";
    container.style.overflow = "hidden";
    document.body.appendChild(container);

    for (let i = 0; i < 120; i++) {
      const spark = document.createElement("div");
      spark.style.position = "absolute";
      spark.style.width = "5px";
      spark.style.height = "5px";
      spark.style.backgroundColor = "#ffcc00";
      spark.style.borderRadius = "50%";
      spark.style.top = `${Math.random() * 100}%`;
      spark.style.left = `${Math.random() * 100}%`;
      container.appendChild(spark);

      const angle = Math.random() * 2 * Math.PI;
      const dist = Math.random() * 300 + 100;
      const dur = Math.random() * 1500 + 1000;

      spark.animate(
        [
          { transform: "scale(1) translate(0,0)", opacity: 1 },
          {
            transform: `scale(0) translate(${Math.cos(angle) * dist}px, ${
              Math.sin(angle) * dist
            }px)`,
            opacity: 0,
          },
        ],
        { duration: dur, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
      );
      setTimeout(() => {
        if (container.contains(spark)) container.removeChild(spark);
      }, dur);
    }

    setTimeout(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }, 2000);
  };

  // ----------------------------------------------------------------
  // 7) Handlers for keyboard
  // ----------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If the user is typing in a form, skip
      if (isTypingInForm(e)) return;

      // Konami
      setKonami((prev) => {
        const updated = [...prev, e.key];
        if (updated.length > konamiCode.length) {
          updated.shift();
        }
        if (updated.join(",") === konamiCode.join(",")) {
          // matrix
          triggerMatrixEasterEgg();
        }
        return updated;
      });

      // Alphanumeric => build secret word
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        setSecretWord((prev) => {
          const newWord = (prev + e.key.toLowerCase()).slice(-20);
          checkSecretWords(newWord);
          return newWord;
        });
      }

      // backspace
      if (e.key === "Backspace") {
        setSecretWord((prev) => prev.slice(0, -1));
      }

      // If alt+shift+t => retro toggle
      // Actually user only wants "tinsley" typed for skill highlight, "thanos", "hack", "retro", "matrix"
      // So we skip that other combos.
      // (We do not do alt+shift+t or ctrl+alt+g anymore since they weren't requested.)
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Helper: Check the typed word
  function checkSecretWords(word: string) {
    // TINSLEY
    if (word.endsWith("tinsley")) {
      skillsAnimation();
    }
    // THAnos
    else if (word.endsWith("thanos")) {
      thanosSnap();
    }
    // HACK
    else if (word.endsWith("hack")) {
      hackingEffect();
    }
    // RETRO
    else if (word.endsWith("retro")) {
      toggleRetroMode();
    }
  }

  // ----------------------------------------------------------------
  // 8) Handle clicks on the site title (16 times => fireworks)
  // ----------------------------------------------------------------
  useEffect(() => {
    // We'll assume your top-left site title has an id or class we can reference, e.g. #siteTitle
    const titleEl = document.getElementById("siteTitle");
    if (!titleEl) return;

    const handleClickTitle = (e: MouseEvent) => {
      // If user clicks the title, increment count
      setTitleClickCount((prev) => {
        const newVal = prev + 1;
        if (newVal >= 16) {
          // trigger fireworks
          triggerFireworks();
          return 0; // reset
        }
        return newVal;
      });
    };

    titleEl.addEventListener("click", handleClickTitle);
    return () => titleEl.removeEventListener("click", handleClickTitle);
  }, []);

  // ----------------------------------------------------------------
  // 9) Return nothing visible
  // ----------------------------------------------------------------
  return null;
}
