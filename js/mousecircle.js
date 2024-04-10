document.addEventListener("mousemove", function (e) {
  const circle = document.getElementById("mouseCircle");
  circle.style.left = `${e.pageX}px`;
  circle.style.top = `${e.pageY}px`;
});
