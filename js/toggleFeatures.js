// toggleFeatures.js

document.addEventListener("DOMContentLoaded", function () {
    // Toggle Light Mode
    const toggleLightModeBtn = document.getElementById('toggleLightMode');
    toggleLightModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        toggleLightModeBtn.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';

        // Toggle Constellation Effect
        if (isLightMode) {
            startConstellation();
        } else {
            stopConstellation();
        }
    });

    // Toggle Custom Cursor
    const toggleCursorBtn = document.getElementById('toggleCursor');
    toggleCursorBtn.addEventListener('click', () => {
        document.body.classList.toggle('hide-cursor');
        const isCursorHidden = document.body.classList.contains('hide-cursor');
        toggleCursorBtn.textContent = isCursorHidden ? 'Show Cursor' : 'Hide Cursor';

        if (isCursorHidden) {
            document.body.classList.remove('custom-cursor-enabled');
            document.getElementById('customCursor').style.display = 'none';
            document.getElementById('mouseCircle').style.display = 'none';
        } else {
            document.body.classList.add('custom-cursor-enabled');
            document.getElementById('customCursor').style.display = 'block';
            document.getElementById('mouseCircle').style.display = 'block';
        }
    });

    // start state: custom cursor is enabled
    document.body.classList.add('custom-cursor-enabled');

    // start constellation effect if light mode is enabled by default
    if (document.body.classList.contains('light-mode')) {
        startConstellation();
    }
});