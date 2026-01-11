const cards = document.querySelectorAll(".progress-card");

cards.forEach(card => {
  // Unique ID for this subject (css, japanese, html, etc.)
  const cardId = card.dataset.id;

  // Elements inside this card
  const checkboxes = card.querySelectorAll("input[type='checkbox']");
  const progressBar = card.querySelector(".progress-bar");
  const progressText = card.querySelector(".progress-text");

  // Load saved progress (array of checked indexes)
  const savedProgress = JSON.parse(localStorage.getItem(cardId)) || [];

  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = savedProgress.includes(index);
  });

  function updateProgress() {
    const total = checkboxes.length;
    const completedIndexes = [];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        completedIndexes.push(index);
      }
    });

    const percentage =
      total === 0 ? 0 : Math.round((completedIndexes.length / total) * 100);

    // Update UI
    progressBar.style.width = percentage + "%";
    progressText.textContent = percentage + "%";

    // Save progress
    localStorage.setItem(cardId, JSON.stringify(completedIndexes));
  }

  // Listen for checkbox changes
  checkboxes.forEach(checkbox =>
    checkbox.addEventListener("change", updateProgress)
  );

  // Initialize on page load
  updateProgress();
});