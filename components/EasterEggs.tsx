// components/EasterEggs.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function EasterEggs() {
  const [, setSecretWord] = useState("");
  const [, setKonami] = useState<string[]>([]);

  const [eggCooldownTime, setEggCooldownTime] = useState(0);
  const [activeEgg, setActiveEgg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.3;
    audioRef.current = audio;
    console.log(`  _______  _          _            
 |__   __|(_)        | |           
    | |   _ _ __  ___| | ___ _   _ 
    | |  | | '_ \\/ __| |/ _ \\ | | |
    | |  | | | | \\__ \\ |  __/ |_| |
    |_|  |_|_| |_|___/_|\\___|\\___,|
                              __/ |
                             |___/ `);
    console.info(`
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
  
  Hey There! I'm glad you liked the site. Check out the repo at https://github.com/TinsleyDevers/tinsley.dev
  Also, you can contact me via contact@tinsley.dev if you have any questions!
    `);
  }, []);

  function isTypingInForm(e: KeyboardEvent | MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (!target) return false;
    const tag = target.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") {
      return true;
    }
    const closestForm = target.closest("form");
    if (closestForm) {
      return true;
    }
    return false;
  }

  const canTriggerEgg = () => {
    const now = Date.now();
    if (now - eggCooldownTime < 5000) {
      return false;
    }
    return true;
  };

  const setEggTriggered = (eggName?: string) => {
    setEggCooldownTime(Date.now());
    if (eggName) setActiveEgg(eggName);
  };

  const skillsAnimation = useCallback(() => {
    if (activeEgg === "tinsley" || !canTriggerEgg()) return;
    setEggTriggered("tinsley");
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
    setTimeout(() => setActiveEgg(null), 5000);
  }, [activeEgg, canTriggerEgg]);

  const hackingEffect = useCallback(() => {
    if (activeEgg === "hack" || !canTriggerEgg()) return;
    setEggTriggered("hack");
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/typing.mp3";
        audio.play().catch(() => {});
      }
    } catch {}
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

    const startTyping = (ms: number) => {
      const typingInterval = window.setInterval(() => {
        if (lineIndex >= hackingLines.length) {
          clearInterval(typingInterval);
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
            clearInterval(typingInterval);
            setTimeout(() => {
              startTyping(Math.random() * 30 + 20);
            }, 300);
          }
        }
      }, ms);
    };
    startTyping(30);

    const handleEscKey = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        document.removeEventListener("keydown", handleEscKey);
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
        setActiveEgg(null);
      }
    };
    document.addEventListener("keydown", handleEscKey);
  }, [activeEgg, canTriggerEgg]);

  const startRetro = useCallback(() => {
    setEggTriggered("retro");
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/retro.mp3";
        audio.play().catch(() => {});
      }
    } catch {}
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
  }, []);

  const endRetro = useCallback(() => {
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
  }, []);

  const toggleRetroMode = useCallback(() => {
    if (!canTriggerEgg()) return;
    if (activeEgg === "retro") {
      endRetro();
      return;
    }
    startRetro();
  }, [activeEgg, canTriggerEgg, endRetro, startRetro]);

  const triggerMatrixEasterEgg = useCallback(() => {
    if (activeEgg === "matrix" || !canTriggerEgg()) return;
    setEggTriggered("matrix");
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/matrix.mp3";
        audio.play().catch(() => {});
      }
    } catch {}

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
    const intervalId = window.setInterval(draw, 33);

    setTimeout(() => {
      canvas.classList.add("fade-out");
      canvas.style.transition = "opacity 3s";
      canvas.style.opacity = "0";
      setTimeout(() => {
        clearInterval(intervalId);
        if (document.body.contains(canvas)) {
          document.body.removeChild(canvas);
        }
        setActiveEgg(null);
      }, 3000);
    }, 5000);
  }, [activeEgg, canTriggerEgg]);

  const thanosSnap = useCallback(() => {
    if (activeEgg === "thanos" || !canTriggerEgg()) return;
    setEggTriggered("thanos");
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = "/assets/snap.mp3";
        audio.play().catch(() => {});
      }
    } catch {}
    const selector = "h1, h2, h3, p, img, .w-10, .h-10, button, a, .blend-glow";
    const elements = Array.from(document.querySelectorAll(selector));
    elements.sort(() => Math.random() - 0.5);
    const half = Math.floor(elements.length / 2);
    const toSnap = elements.slice(0, half);
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
  }, [activeEgg, canTriggerEgg]);

  // Check typed words
  const checkSecretWords = useCallback(
    (word: string) => {
      if (word.endsWith("tinsley")) {
        skillsAnimation();
      } else if (word.endsWith("thanos")) {
        thanosSnap();
      } else if (word.endsWith("hack")) {
        hackingEffect();
      } else if (word.endsWith("retro")) {
        toggleRetroMode();
      }
    },
    [skillsAnimation, thanosSnap, hackingEffect, toggleRetroMode]
  );

  // Keydown listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTypingInForm(e)) return;
      setKonami((prev) => {
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
        const updated = [...prev, e.key];
        if (updated.length > konamiCode.length) {
          updated.shift();
        }
        if (updated.join(",") === konamiCode.join(",")) {
          triggerMatrixEasterEgg();
        }
        return updated;
      });
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        setSecretWord((prev) => {
          const newWord = (prev + e.key.toLowerCase()).slice(-20);
          checkSecretWords(newWord);
          return newWord;
        });
      }
      if (e.key === "Backspace") {
        setSecretWord((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [checkSecretWords, triggerMatrixEasterEgg]);

  return null;
}
