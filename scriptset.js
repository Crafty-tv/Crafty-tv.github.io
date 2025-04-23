// Chargement automatique des paramètres globaux
window.onload = () => {
  applyGlobalSettings();
};

// 🌓 Thème clair / sombre
function toggleTheme() {
  const isDark = document.body.classList.toggle("light-theme") === false;
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // mettre à jour texte du bouton
  updateLanguage(localStorage.getItem("lang") || "fr");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
}

function isDarkTheme() {
  return !document.body.classList.contains("light-theme");
}

// 🌍 Langue
function changeLanguage() {
  const lang = document.getElementById("language-select").value;
  localStorage.setItem("lang", lang);
  updateLanguage(lang);
}

function loadLanguage() {
  const savedLang = localStorage.getItem("lang") || "fr";
  const langSelect = document.getElementById("language-select");
  if (langSelect) langSelect.value = savedLang;
  updateLanguage(savedLang);
}

function updateLanguage(lang) {
  const isDark = isDarkTheme();

  if (lang === "en") {
    setText("settings-title", "Settings");
    setText("language-label", "Language");
    setText("theme-label", "Theme");
    setText("theme-button", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
    setText("username-label", "Username");
  } else {
    setText("settings-title", "Paramètres");
    setText("language-label", "Langue");
    setText("theme-label", "Thème");
    setText("theme-button", isDark ? "Passer en mode clair" : "Passer en mode sombre");
    setText("username-label", "Nom d'utilisateur");
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// 👤 Nom d'utilisateur
function saveUsername() {
  const username = document.getElementById("username-input").value.trim();
  if (username) {
    localStorage.setItem("username", username);
    alert("Nom d'utilisateur enregistré !");
  } else {
    alert("Veuillez entrer un nom.");
  }
}

function loadUsername() {
  const savedUsername = localStorage.getItem("username") || "";
  const input = document.getElementById("username-input");
  if (input) input.value = savedUsername;
}

// 🔁 Fonction globale utilisée sur chaque page
function applyGlobalSettings() {
  loadTheme();
  loadLanguage();
  loadUsername();
}

const username = localStorage.getItem("username");
if (username && document.getElementById("welcome-title")) {
  document.getElementById("welcome-title").textContent = `Bienvenue, ${username} !`;
}
  function saveUsername() {
    const username = document.getElementById("username-input").value.trim();
    if (username) {
      localStorage.setItem("username", username);
      alert("Nom enregistré !");
    } else {
      alert("Veuillez entrer un nom.");
    }
  }

  window.onload = () => {
    const saved = localStorage.getItem("username") || "";
    document.getElementById("username-input").value = saved;
  };