document.addEventListener("mousemove", function (e) {
  const circle = document.getElementById("mouseCircle");
  const maxX = window.innerWidth;
  const maxY = window.innerHeight;
  let newPosX = e.clientX;
  let newPosY = e.clientY;
  newPosX = Math.min(maxX, Math.max(0, newPosX));
  newPosY = Math.min(maxY, Math.max(0, newPosY));
  circle.style.left = `${newPosX}px`;
  circle.style.top = `${newPosY}px`;
});
