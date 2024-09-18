const mouseCircle = document.getElementById("mouseCircle");

document.addEventListener("mousemove", function (e) {
    mouseCircle.style.left = `${e.clientX}px`;
    mouseCircle.style.top = `${e.clientY}px`;
});
