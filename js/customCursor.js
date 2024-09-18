// customCursor.js
document.addEventListener("DOMContentLoaded", function () {
    const cursorInner = document.getElementById('cursorInner');
    const cursorOuter = document.getElementById('cursorOuter');

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cursorInnerX = mouseX, cursorInnerY = mouseY;
    let cursorOuterX = mouseX, cursorOuterY = mouseY;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // update the inner cursor (moon) position
        cursorInnerX += (mouseX - cursorInnerX) * 0.35;
        cursorInnerY += (mouseY - cursorInnerY) * 0.35;

        // calculate the distance between the planet and the moon cursor
        let dx = cursorInnerX - cursorOuterX;
        let dy = cursorInnerY - cursorOuterY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        const activationDistance = 25; // distance to activate

        // move the planet cursor (outer) if the distance is greater than the activation distance
        if (distance > activationDistance) {
            cursorOuterX += (cursorInnerX - cursorOuterX) * 0.05;
            cursorOuterY += (cursorInnerY - cursorOuterY) * 0.05;
        }

        cursorInner.style.transform = `translate(${cursorInnerX}px, ${cursorInnerY}px) translate(-50%, -50%)`;
        cursorOuter.style.transform = `translate(${cursorOuterX}px, ${cursorOuterY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    }

    animate();

    // hover effect
    const hoverElements = document.querySelectorAll('a, button, .hover-effect');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorInner.classList.add('hover');
            cursorOuter.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorInner.classList.remove('hover');
            cursorOuter.classList.remove('hover');
        });
    });

    document.addEventListener('mousedown', () => {
        cursorInner.classList.add('active');
        cursorOuter.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        cursorInner.classList.remove('active');
        cursorOuter.classList.remove('active');
    });
});
