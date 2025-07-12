function addToCart(templateId) {
  sessionStorage.setItem('selectedTemplate', templateId);

  const displayField = document.getElementById("selectedDisplay");
  const planDisplay = document.getElementById("selectedPlanDisplay");

  const templateNames = {
    template1: "το πρώτο σχέδιο",
    template2: "το δεύτερο σχέδιο",
    template3: "το τρίτο σχέδιο"
  };

  const planNames = {
    template1: "το πρώτο πακέτο (BASIC)",
    template2: "το δεύτερο πακέτο (PRO+)",
    template3: "το δεύτερο πακέτο (PRO+)"
  };

  const userFriendlyName = templateNames[templateId] || "κάποιο σχέδιο";
  const planFriendlyName = planNames[templateId];

  displayField.textContent = `✔️ Έχεις επιλέξει ${userFriendlyName}.`;

  if (planFriendlyName) {
    planDisplay.textContent = `✔️ Έχεις επιλέξει ${planFriendlyName}.`;
  } else {
    planDisplay.textContent = ""; // κρύβεται αν δεν έχει σχέση με πακέτο
  }

  const hiddenInput = document.getElementById("selected_template");
  hiddenInput.value = templateId;

  // Καθάρισε τα κουμπιά από προηγούμενη επιλογή
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    btn.classList.remove('selected');
  });

  // Βρες και δώσε "selected" class στο ενεργό κουμπί
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    if (btn.onclick && btn.onclick.toString().includes(`'${templateId}'`)) {
      btn.classList.add('selected');
    }
  });
}



function previewTemplate(templateUrl) {
  window.open(templateUrl, '_blank');
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function () {
    const selectedTemplate = sessionStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
      document.getElementById("selected_template").value = selectedTemplate;
    }
  });

  document.querySelectorAll(".template-card").forEach(card => {
    card.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") return;
      const url = card.getAttribute("data-template-url");
      if (url) window.open(url, "_blank");
    });
  });
});



function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('show');
}