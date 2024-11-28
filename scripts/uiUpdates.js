function toggleVisibility(elementId, show) {
  const element = document.getElementById(elementId);
  if (show) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}