const cards = document.querySelectorAll(".progress-card");

cards.forEach(card => {
  const checkboxes = card.querySelectorAll("input[type='checkbox']");
  const bar = card.querySelector(".progress-bar");
  const text = card.querySelector(".progress-text");

  function updateProgress() {
    const total = checkboxes.length;
    const completed = card.querySelectorAll("input[type='checkbox']:checked").length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    bar.style.width = percent + "%";
    text.textContent = percent + "%";
  }

  checkboxes.forEach(cb => cb.addEventListener("change", updateProgress));
  updateProgress();
});
