// ===== SWEEPSTAKE DATA =====
// Add the rest of your entries here following the same pattern.
const entries = [
  {
    name: "Joe Bird",
    paid: true,
    primaryPlayer: "Michael Smith",
    extraPlayers: ["O Bates", "B Brooks", "D Labanauskas"],
  },
  {
    name: "Aaron Timmis",
    paid: true,
    primaryPlayer: "Luke Littler",
    extraPlayers: ["Jonny Clayton", "Joe Comito", "David Cameron"],
  },
  {
    name: "Jack Briody",
    paid: true,
    primaryPlayer: "Nathan Aspinall",
    extraPlayers: ["Niko Springer", "Ian White", "Mervyn King"],
  },
  {
    name: "Amy Hammet",
    paid: false,
    primaryPlayer: "LUKE HUMPHRIES",
    extraPlayers: ["HAUPAI PUHA", "GEMMA HAYTER", "JEFFREY DE GRAAF"],
  },
  {
    name: "James Osbourne",
    paid: true,
    primaryPlayer: "Rob Cross",
    extraPlayers: ["Paul Lim", "Krzystof Ratajski", "Andreas Harryson"],
  },
  // ...continue with the rest from your Enterants sheet
];

// ===== DOM ELEMENTS =====

const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search");
const paidOnlyCheckbox = document.getElementById("show-paid-only");
const clearWinnersBtn = document.getElementById("clear-winners");

// ===== RENDER FUNCTION =====

function renderCards() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const paidOnly = paidOnlyCheckbox.checked;

  cardsContainer.innerHTML = "";

  const filtered = entries.filter((entry) => {
    if (paidOnly && !entry.paid) return false;

    if (!searchTerm) return true;

    const haystack = [
      entry.name,
      entry.primaryPlayer,
      ...(entry.extraPlayers || []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(searchTerm);
  });

  if (filtered.length === 0) {
    cardsContainer.innerHTML =
      '<p style="opacity:0.8;">No entries found. Try a different search.</p>';
    return;
  }

  filtered.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "ticket-card";

    card.innerHTML = `
      <div class="ticket-header">
        <h2 class="ticket-name">${entry.name}</h2>
        <span class="ticket-paid-badge ${
          entry.paid ? "paid" : "unpaid"
        }">${entry.paid ? "Paid" : "Not paid"}</span>
      </div>

      <div class="ticket-body">
        <div class="ticket-section">
          <div class="ticket-label">Dart player</div>
          <div class="ticket-player-main">${entry.primaryPlayer || "-"}</div>
        </div>

        ${
          entry.extraPlayers && entry.extraPlayers.length
            ? `
          <div class="ticket-players-extra">
            ${entry.extraPlayers
              .map((p) => `<span class="tag-player">${p}</span>`)
              .join("")}
          </div>
        `
            : ""
        }
      </div>

      <div class="ticket-ribbon">Winner</div>
    `;

    // Click to toggle winner highlight
    card.addEventListener("click", () => {
      card.classList.toggle("winner");
    });

    cardsContainer.appendChild(card);
  });
}

// ===== EVENTS =====

searchInput.addEventListener("input", renderCards);
paidOnlyCheckbox.addEventListener("change", renderCards);

clearWinnersBtn.addEventListener("click", () => {
  document
    .querySelectorAll(".ticket-card.winner")
    .forEach((card) => card.classList.remove("winner"));
});

// Initial render
renderCards();
