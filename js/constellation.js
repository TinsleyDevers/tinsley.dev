// constellation.js
// (thank you codepen.io/JulianLaval for the inspiration)

let constellationAnimationFrame;
let constellationCanvas;
let constellationCtx;
let stars = [];
const numStars = 100;
const maxStarSize = 3;
const maxLineDistance = 150;

function startConstellation() {
  // Create the canvas if it doesn't exist
  if (!document.getElementById("constellationCanvas")) {
    constellationCanvas = document.createElement("canvas");
    constellationCanvas.id = "constellationCanvas";
    constellationCanvas.style.position = "fixed";
    constellationCanvas.style.top = "0";
    constellationCanvas.style.left = "0";
    constellationCanvas.style.width = "100%";
    constellationCanvas.style.height = "100%";
    constellationCanvas.style.zIndex = "0";
    constellationCanvas.style.pointerEvents = "none";
    document.body.appendChild(constellationCanvas);
    constellationCtx = constellationCanvas.getContext("2d");
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Initialize stars
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * constellationCanvas.width,
      y: Math.random() * constellationCanvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * maxStarSize,
    });
  }

  animateConstellation();
}

function stopConstellation() {
  window.cancelAnimationFrame(constellationAnimationFrame);
  window.removeEventListener("resize", resizeCanvas);

  // Remove the canvas
  if (constellationCanvas) {
    constellationCanvas.parentNode.removeChild(constellationCanvas);
    constellationCanvas = null;
    constellationCtx = null;
  }
}

function resizeCanvas() {
  if (constellationCanvas) {
    constellationCanvas.width = window.innerWidth;
    constellationCanvas.height = window.innerHeight;
  }
}

function animateConstellation() {
  constellationCtx.clearRect(
    0,
    0,
    constellationCanvas.width,
    constellationCanvas.height
  );

  // Update star positions
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];
    star.x += star.vx;
    star.y += star.vy;

    // Wrap around the edges
    if (star.x < 0) star.x = constellationCanvas.width;
    if (star.x > constellationCanvas.width) star.x = 0;
    if (star.y < 0) star.y = constellationCanvas.height;
    if (star.y > constellationCanvas.height) star.y = 0;
  }

  // Draw stars
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];
    constellationCtx.fillStyle = "rgba(0, 0, 0, 0.7)";
    constellationCtx.beginPath();
    constellationCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    constellationCtx.fill();
  }

  // Draw lines between close stars
  for (let i = 0; i < numStars; i++) {
    for (let j = i + 1; j < numStars; j++) {
      let starA = stars[i];
      let starB = stars[j];

      let dx = starA.x - starB.x;
      let dy = starA.y - starB.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxLineDistance) {
        let opacity = 1 - distance / maxLineDistance;
        constellationCtx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.7})`;
        constellationCtx.lineWidth = 1;
        constellationCtx.beginPath();
        constellationCtx.moveTo(starA.x, starA.y);
        constellationCtx.lineTo(starB.x, starB.y);
        constellationCtx.stroke();
      }
    }
  }

  constellationAnimationFrame = requestAnimationFrame(animateConstellation);
}
