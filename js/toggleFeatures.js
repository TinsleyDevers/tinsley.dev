// toggleFeatures.js
document.addEventListener("DOMContentLoaded", () => {
  const toggleLightModeBtn = document.getElementById("toggleLightMode");
  const toggleCursorBtn = document.getElementById("toggleCursor");
  const customCursor = document.getElementById("customCursor");
  const mouseCircle = document.getElementById("mouseCircle");

  if (!toggleLightModeBtn) {
    console.error("Toggle Light Mode button not found.");
    return;
  }

  if (!toggleCursorBtn) {
    console.error("Toggle Cursor button not found.");
    return;
  }

  if (!customCursor || !mouseCircle) {
    console.error("Custom cursor elements not found.");
  }

  initializeFeatures();

  toggleLightModeBtn.addEventListener("click", () => {
    toggleLightMode();
  });

  toggleCursorBtn.addEventListener("click", () => {
    toggleCustomCursor();
  });

  function initializeFeatures() {
    if (!document.body.classList.contains("hide-cursor")) {
      document.body.classList.add("custom-cursor-enabled");
      if (customCursor) customCursor.style.display = "block";
      if (mouseCircle) mouseCircle.style.display = "block";
    } else {
      document.body.classList.remove("custom-cursor-enabled");
      if (customCursor) customCursor.style.display = "none";
      if (mouseCircle) mouseCircle.style.display = "none";
    }

    if (document.body.classList.contains("light-mode")) {
      startConstellation();
      toggleLightModeBtn.textContent = "Dark Mode";
    } else {
      toggleLightModeBtn.textContent = "Light Mode";
    }

    const isCursorHidden = document.body.classList.contains("hide-cursor");
    toggleCursorBtn.textContent = isCursorHidden
      ? "Show Cursor"
      : "Hide Cursor";
  }

  function toggleLightMode() {
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");

    toggleLightModeBtn.textContent = isLightMode ? "Dark Mode" : "Light Mode";

    if (isLightMode) {
      startConstellation();
    } else {
      stopConstellation();
    }
  }

  function toggleCustomCursor() {
    document.body.classList.toggle("hide-cursor");
    const isCursorHidden = document.body.classList.contains("hide-cursor");

    toggleCursorBtn.textContent = isCursorHidden
      ? "Show Cursor"
      : "Hide Cursor";

    if (isCursorHidden) {
      document.body.classList.remove("custom-cursor-enabled");
      if (customCursor) customCursor.style.display = "none";
      if (mouseCircle) mouseCircle.style.display = "none";
    } else {
      document.body.classList.add("custom-cursor-enabled");
      if (customCursor) customCursor.style.display = "block";
      if (mouseCircle) mouseCircle.style.display = "block";
    }
  }
});
