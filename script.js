const cards = document.querySelectorAll(".progress-card");

cards.forEach(card => {
  
  const cardId = card.dataset.id;

  const checkboxes = card.querySelectorAll("input[type='checkbox']");
  const progressBar = card.querySelector(".progress-bar");
  const progressText = card.querySelector(".progress-text");

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


    progressBar.style.width = percentage + "%";
    progressText.textContent = percentage + "%";


    localStorage.setItem(cardId, JSON.stringify(completedIndexes));
  }


  checkboxes.forEach(checkbox =>
    checkbox.addEventListener("change", updateProgress)
  );


  updateProgress();

});
