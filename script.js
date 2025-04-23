// Initialisation des jeux si absents
if (!localStorage.getItem("games")) {
  const defaultGames = [
    {
      title: "La Chambre Secrète",
      desc: "Résolvez des énigmes pour sortir d'une chambre verrouillée.",
      img: "A_2D_digital_illustration_depicts_an_interactive_e.png",
      locked: false
    },
    {
      title: "L’Enigme du Temple",
      desc: "Explorez un ancien temple rempli de mystères.",
      img: "A_digital_illustration_depicts_an_ancient,_dimly_l.png",
      locked: true
    },
    {
      title: "Le Laboratoire Abandonné",
      desc: "Fouillez un ancien laboratoire à la recherche d'une formule secrète.",
      img: "A_2D_digital_illustration_depicts_an_abandoned_lab.png",
      locked: true
    },
	{
      title: "Le Grenier Oublié",
      desc: "Un héritage familial… ou un passage secret ?",
      img: "A_2D_digital_illustration_depicts_an_attic_filled_.png",
      locked: true
    }
  ];
  localStorage.setItem("games", JSON.stringify(defaultGames));
}

// Affichage des jeux disponibles sur index.html
function displayGames(containerId) {
  const container = document.getElementById(containerId);
  const games = JSON.parse(localStorage.getItem("games")) || [];
  container.innerHTML = "";

  games.forEach((game, index) => {
    if (!game.locked) {
      const card = document.createElement("div");
      card.classList.add("game-card");
      card.innerHTML = `
        <img src="${game.img}" alt="${game.title}">
        <h3>${game.title}</h3>
        <p>${game.desc}</p>
        <a href="game${index + 1}.html" class="btn">Jouer</a>
      `;
      container.appendChild(card);
    }
  });
}

// Affichage côté admin
function loadAdminGames(containerId) {
  const container = document.getElementById(containerId);
  const games = JSON.parse(localStorage.getItem("games")) || [];
  container.innerHTML = "";

  games.forEach((game, index) => {
    const div = document.createElement("div");
    div.classList.add("game-card");
    div.innerHTML = `
      <img src="${game.img}" alt="${game.title}" style="opacity:${game.locked ? 0.3 : 1}">
      <h3>${game.title}</h3>
      <p>${game.desc}</p>
      <p>Status: ${game.locked ? "🔒 Bloqué" : "✅ Actif"}</p>
      <button class="btn" onclick="toggleLock(${index})">${game.locked ? "Déverrouiller" : "Bloquer"}</button>
      <button class="btn" onclick="editGame(${index})">Modifier</button>
      <button class="btn" onclick="deleteGame(${index})">Supprimer</button>
    `;
    container.appendChild(div);
  });
}

function toggleLock(index) {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  games[index].locked = !games[index].locked;
  localStorage.setItem("games", JSON.stringify(games));
  loadAdminGames("game-list");
}

function editGame(index) {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  const newTitle = prompt("Nouveau titre :", games[index].title);
  const newDesc = prompt("Nouvelle description :", games[index].desc);
  const newImg = prompt("Nouveau lien image :", games[index].img);

  if (newTitle && newDesc && newImg) {
    games[index].title = newTitle;
    games[index].desc = newDesc;
    games[index].img = newImg;
    localStorage.setItem("games", JSON.stringify(games));
    loadAdminGames("game-list");
  }
}

function deleteGame(index) {unlockNextGame()
  let games = JSON.parse(localStorage.getItem("games")) || [];
  if (confirm("Supprimer ce jeu ?")) {
    games.splice(index, 1);
    localStorage.setItem("games", JSON.stringify(games));
    loadAdminGames("game-list");
  }
}

function unlockNextGame(currentIndex) {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  if (games[currentIndex + 1]) {
    games[currentIndex + 1].locked = false;
    localStorage.setItem("games", JSON.stringify(games));
  }
}

function addNewGame() {
  const title = document.getElementById("new-title").value;
  const desc = document.getElementById("new-desc").value;
  const img = document.getElementById("new-img").value;

  if (!title || !desc || !img) {
    alert("Merci de remplir tous les champs !");
    return;
  }

  const games = JSON.parse(localStorage.getItem("games")) || [];
  games.push({ title, desc, img, locked: false });
  localStorage.setItem("games", JSON.stringify(games));
  alert("Jeu ajouté !");

  document.getElementById("new-title").value = "";
  document.getElementById("new-desc").value = "";
  document.getElementById("new-img").value = "";

  loadAdminGames("game-list");
}

// Déverrouiller le jeu suivant (à appeler dans chaque jeu)
function unlockNextGame(currentIndex) {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  if (games[currentIndex + 1]) {
    games[currentIndex + 1].locked = false;
    localStorage.setItem("games", JSON.stringify(games));
  }
}

// Affichage du nom utilisateur si défini
function showUsername() {
  const username = localStorage.getItem("username");
  const title = document.getElementById("welcome-title");
  if (username && title) {
    title.textContent = "Bienvenue, " + username + " !";
  }
}

// Menu latéral activable
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar.classList.contains("hidden")) {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("visible");
  } else {
    sidebar.classList.add("hidden");
    sidebar.classList.remove("visible");
  }
}

// Chargement automatique à l’ouverture
window.addEventListener("DOMContentLoaded", () => {
  showUsername();
  if (document.getElementById("game-cards")) displayGames("game-cards");
});
