const customCursor = document.getElementById('customCursor');

document.addEventListener('mousemove', function(e) {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

document.body.style.cursor = 'none';

const allElements = document.querySelectorAll('*');
allElements.forEach(el => {
    el.style.cursor = 'none';
});

const hoverElements = document.querySelectorAll('a, button, .hover-effect');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
    });
});

document.addEventListener('mousedown', () => {
    customCursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    customCursor.classList.remove('active');
});
