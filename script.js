(function () {
  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Accordion toggle (accessible)
  document.querySelectorAll(".accordion").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.closest(".panel");
      if (!panel) return;
      const content = panel.querySelector(".content");
      const icon = btn.querySelector(".icon");
      const expanded = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", String(!expanded));
      if (content) content.hidden = expanded;
      if (icon) icon.textContent = expanded ? "+" : "–";
    });
  });

  // Search filter for evidence cards
  const search = document.getElementById("search");
  const cardsWrap = document.getElementById("cards");
  const noResults = document.getElementById("noResults");

  function filterCards(q) {
    const query = (q || "").trim().toLowerCase();
    const cards = cardsWrap ? Array.from(cardsWrap.querySelectorAll(".panel")) : [];
    let visibleCount = 0;

    cards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const text = card.innerText.toLowerCase();
      const match = !query || tags.includes(query) || text.includes(query);
      card.style.display = match ? "" : "none";
      if (match) visibleCount += 1;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  }

  if (search) {
    search.addEventListener("input", () => filterCards(search.value));
  }

  // Form validation demo (Unit 9)
  const form = document.getElementById("form");
  if (!form) return;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const msg = document.getElementById("msg");
  const nameErr = document.getElementById("nameErr");
  const emailErr = document.getElementById("emailErr");
  const msgErr = document.getElementById("msgErr");
  const status = document.getElementById("status");

  const validEmail = (x) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(x).trim());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (status) status.textContent = "";
    if (nameErr) nameErr.textContent = "";
    if (emailErr) emailErr.textContent = "";
    if (msgErr) msgErr.textContent = "";

    let ok = true;

    if (!name.value || name.value.trim().length < 2) {
      if (nameErr) nameErr.textContent = "Name must be at least 2 characters.";
      ok = false;
    }
    if (!validEmail(email.value)) {
      if (emailErr) emailErr.textContent = "Please enter a valid email address.";
      ok = false;
    }
    if (!msg.value || msg.value.trim().length < 25) {
      if (msgErr) msgErr.textContent = "Message must be at least 25 characters.";
      ok = false;
    }

    if (!ok) return;

    if (status) status.textContent = "Validated successfully (coursework demonstration only).";
    form.reset();
  });
})();
