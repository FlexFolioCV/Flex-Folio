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
    planDisplay.textContent = "";
  }

  const hiddenInput = document.getElementById("selected_template");
  hiddenInput.value = templateId;

  // Καθάρισε τα κουμπιά από προηγούμενη επιλογή
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    btn.classList.remove('selected');
  });

  // Δώσε "selected" class στο ενεργό κουμπί
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    if (btn.onclick && btn.onclick.toString().includes(`'${templateId}'`)) {
      btn.classList.add('selected');
    }
  });

  // ✅ Ενημέρωσε το καλάθι (popup)
  const popup = document.getElementById("cartPopup");
  const badge = document.getElementById("cartBadge");

  if (popup && badge) {
    document.getElementById("popupTemplate").textContent = userFriendlyName;
    document.getElementById("popupPlan").textContent = planFriendlyName || "-";
    badge.style.display = "inline-block";
  }
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

  // Αν έχει προηγούμενη επιλογή, εμφάνισε την στο καλάθι
  const saved = sessionStorage.getItem('selectedTemplate');
  if (saved) {
    addToCart(saved); // Επαναχρησιμοποίηση της ίδιας συνάρτησης
  }
});

// ✅ Λειτουργία εμφάνισης/απόκρυψης popup
function toggleCart() {
  const popup = document.getElementById("cartPopup");
  if (!popup) return;

  if (popup.classList.contains("show")) {
    popup.classList.remove("show");
    setTimeout(() => popup.style.display = "none", 300);
  } else {
    popup.style.display = "block";
    setTimeout(() => popup.classList.add("show"), 10);
  }
}


// ✅ Λειτουργία καθαρισμού επιλογών
function clearCart() {
  sessionStorage.removeItem("selectedTemplate");

  document.getElementById("selectedDisplay").textContent = "Δεν έχει επιλεχθεί ακόμα template.";
  document.getElementById("selectedPlanDisplay").textContent = "";

  const hiddenInput = document.getElementById("selected_template");
  hiddenInput.value = "";

  const popup = document.getElementById("cartPopup");
  const badge = document.getElementById("cartBadge");
  if (popup && badge) {
    document.getElementById("popupTemplate").textContent = "–";
    document.getElementById("popupPlan").textContent = "–";
    badge.style.display = "none";
    popup.style.display = "none";
  }

  // Καθαρισμός κουμπιών
  document.querySelectorAll('.choose-btn, .order-button').forEach(btn => {
    btn.classList.remove('selected');
  });
}
