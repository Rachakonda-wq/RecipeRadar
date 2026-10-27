
"use strict";

const RECIPES = [
  { name: "Hyderabadi Chicken Biryani", category: "Main Course", emoji: "🍗", image: "chicken Briyani.jpg", description: "Fragrant rice layered with spiced chicken and the signature flavours of Hyderabad." },
  { name: "Hyderabadi Mutton Biryani", category: "Main Course", emoji: "🍖", image: "mutton b.jpg", description: "A rich and aromatic rice dish featuring tender mutton and traditional spices." },
  { name: "Kacchi Gosht Biryani", category: "Main Course", emoji: "🍛", image: "Kacchi Gosht Biryani.jpg", description: "A traditional dum biryani prepared with marinated raw meat and fragrant rice." },
  { name: "Butter Chicken", category: "Main Course", emoji: "🍗", image: "Butter Chicken.jpg", description: "Tender chicken in a creamy, tomato-based sauce with warming spices." },
  { name: "Chicken 65", category: "Snacks", emoji: "🌶️", image: "chicken 65.jpg", description: "A spicy, tangy and crispy chicken favourite for snack time." },
  { name: "Grilled Fish", category: "Main Course", emoji: "🐟", image: "baked-fish-grilled.jpg", description: "Fish seasoned with spices and cooked until tender and lightly charred." },
  { name: "Paneer Tikka", category: "Vegetarian", emoji: "🧀", image: "Paneer Tikaa.jpg", description: "Marinated paneer with peppers and spices, grilled to perfection." },
  { name: "Tandoori Chicken", category: "Main Course", emoji: "🍗", image: "Tandoori.jpg", description: "Smoky, spiced chicken inspired by classic tandoor cooking." },
  { name: "Shikampuri Kebab", category: "Snacks", emoji: "🥙", image: "Shikampuri Kebab.jpg", description: "A celebrated Hyderabadi kebab with a soft texture and a flavourful filling." },
  { name: "Pathar Ka Gosht", category: "Main Course", emoji: "🥩", image: "Pathar Ka Gosht.jpg", description: "Traditional meat prepared on a hot stone with aromatic spices." },
  { name: "Hyderabadi Haleem", category: "Main Course", emoji: "🥣", image: "haleem.jpg", description: "A slow-cooked, hearty preparation made with grains, lentils, meat and spices." },
  { name: "Mutton Marag", category: "Main Course", emoji: "🍲", image: "marag.jpg", description: "A delicate, warming mutton soup often served at special occasions." },
  { name: "Bagara Baingan", category: "Vegetarian", emoji: "🍆", image: "bagara-baingan.jpg", description: "Eggplant cooked in a rich, nutty gravy with a distinctive spice blend." },
  { name: "Mirchi Ka Salan", category: "Vegetarian", emoji: "🌶️", image: "Mirchi Ka Salan.jpg", description: "A tangy, nutty chilli curry traditionally served alongside biryani." },
  { name: "Hyderabadi Chicken Curry", category: "Main Course", emoji: "🍛", image: "Hyderabadi Chicken Curry.jpg", description: "A homestyle chicken curry layered with spices and regional flavours." },
  { name: "Hyderabadi Mutton Curry", category: "Main Course", emoji: "🍖", image: "Hyderabadi Mutton Curry.jpg", description: "A robust mutton curry that pairs beautifully with rice or flatbread." },
  { name: "Mutton Dalcha", category: "Main Course", emoji: "🥘", image: "Mutton Dalcha.jpg", description: "A comforting combination of lentils, meat and gently tangy flavours." },
  { name: "Khatti Dal", category: "Vegetarian", emoji: "🥣", image: "khatti dal.jpg", description: "A comforting Hyderabadi lentil dish with a bright, tangy finish." },
  { name: "Bagara Rice", category: "Vegetarian", emoji: "🍚", image: "Bagara Rice.jpg", description: "Fragrant spiced rice that makes a wonderful partner for curries." },
  { name: "Hyderabadi Tahari", category: "Main Course", emoji: "🍚", image: "Hyderabadi Tahari.jpg", description: "A traditional spiced rice preparation known for its comforting flavour." },
  { name: "Osmania Biscuits", category: "Snacks", emoji: "🍪", image: "Osmania Biscuits.jpg", description: "Classic tea-time biscuits with a delicate balance of sweet and savoury." },
  { name: "Lukhmi", category: "Snacks", emoji: "🥟", image: "Lukhmi.jpg", description: "A square, savoury pastry associated with Hyderabadi celebrations." },
  { name: "Hyderabadi Samosa", category: "Snacks", emoji: "🥟", image: "Hyderbad Samosa.jpg", description: "A crisp, savoury snack perfect for an evening tea break." },
  { name: "Irani Chai", category: "Drinks", emoji: "☕", image: "Irani Chai.jpg", description: "A rich, milky tea enjoyed in Hyderabad's much-loved Irani cafés." },
  { name: "Murgh Musallam", category: "Main Course", emoji: "🍗", image: "Murugumusallam.jpg", description: "A festive whole-chicken preparation with a richly spiced coating." },
  { name: "Double Ka Meetha", category: "Desserts", emoji: "🍮", image: "Double Ka Meetha.jpg", description: "A beloved bread-based dessert with a rich, celebratory character." },
  { name: "Pesarattu Upma", category: "Vegetarian", emoji: "🥞", image: "UpmaPesarattu.jpg", description: "A satisfying combination of green-gram dosa and savoury upma." },
  { name: "Gil-e-Firdaus", category: "Desserts", emoji: "🍨", image: "Gil-e-Firdaus.jpg", description: "A traditional Hyderabadi dessert with a rich, creamy texture." },
  { name: "Sheer Khurma", category: "Desserts", emoji: "🥛", image: "Sheer Khurma.jpg", description: "A festive vermicelli dessert prepared with milk, dates and nuts." },
  { name: "Jouzi Halwa", category: "Desserts", emoji: "🍮", image: "Jouzi Halwa.jpg", description: "A famous Hyderabadi sweet known for its rich texture and distinctive flavour." }
];

const STORAGE = {
  favorites: "reciperadar_favorites_v1",
  profile: "reciperadar_profile_v1",
  feedback: "reciperadar_feedback_v1"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let activeCategory = "All";
let showOnlyFavorites = false;
let visibleCount = 9;
let featuredIndex = 0;
let selectedRating = 0;
let toastTimer;

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn("Unable to read saved data:", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn("Unable to save data:", error);
    showToast("Browser storage is unavailable. Your changes may not be saved.");
    return false;
  }
}

let favorites = readStorage(STORAGE.favorites, []);
if (!Array.isArray(favorites)) favorites = [];

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function getRecipeImage(recipe) {
  return `images/${recipe.image}`;
}

function imageMarkup(recipe, className = "recipe-image") {
  const source = getRecipeImage(recipe);
  return `
    <img class="${className}" src="${escapeHTML(source)}"
      alt="${escapeHTML(recipe.name)}"
      loading="lazy"
      onerror="this.onerror=null; this.outerHTML='<div class=&quot;recipe-image-fallback&quot; role=&quot;img&quot; aria-label=&quot;Image unavailable for ${escapeHTML(recipe.name)}&quot;>${recipe.emoji}</div>'">
  `;
}

function getFilteredRecipes() {
  const query = ($("#searchInput")?.value || "").trim().toLowerCase();
  let items = RECIPES.filter((recipe) => {
    const matchesCategory = activeCategory === "All" ||
      recipe.category === activeCategory ||
      (activeCategory === "Main Course" && recipe.category === "Main Course");

    const matchesQuery = `${recipe.name} ${recipe.category} ${recipe.description}`
      .toLowerCase().includes(query);

    const matchesFavorites = !showOnlyFavorites || favorites.includes(recipe.name);

    return matchesCategory && matchesQuery && matchesFavorites;
  });

  const sort = $("#sortSelect")?.value || "default";
  if (sort === "az") items.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") items.sort((a, b) => b.name.localeCompare(a.name));

  return items;
}

function renderRecipes() {
  const grid = $("#recipeGrid");
  if (!grid) return;

  const recipes = getFilteredRecipes();
  const shown = recipes.slice(0, visibleCount);

  $("#totalRecipes").textContent = RECIPES.length;
  $("#resultsSummary").textContent =
    `Showing ${shown.length} of ${recipes.length} ${showOnlyFavorites ? "favourite " : ""}recipes`;

  grid.innerHTML = shown.length ? shown.map((recipe) => {
    const isFavorite = favorites.includes(recipe.name);
    return `
      <article class="recipe-card">
        <div class="recipe-image-wrap">
          ${imageMarkup(recipe)}
          <span class="recipe-category">${escapeHTML(recipe.category)}</span>
          <button type="button" class="favorite-button ${isFavorite ? "is-favorite" : ""}"
            data-favorite="${escapeHTML(recipe.name)}"
            aria-label="${isFavorite ? "Remove from" : "Add to"} favorites"
            aria-pressed="${isFavorite}">${isFavorite ? "♥" : "♡"}</button>
        </div>
        <div class="recipe-card-body">
          <h3>${escapeHTML(recipe.name)}</h3>
          <p>${escapeHTML(recipe.description)}</p>
          <div class="recipe-card-actions">
            <button type="button" data-details="${escapeHTML(recipe.name)}">View recipe details ↗</button>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.name + " recipe")}"
               target="_blank" rel="noopener noreferrer">Watch cooking videos ↗</a>
          </div>
        </div>
      </article>`;
  }).join("") : `
    <div class="empty-state">
      <div style="font-size:38px">🍽️</div>
      <h3>No dishes found</h3>
      <p>Try a different search, category or favorites view.</p>
      <button type="button" class="button button-secondary" id="emptyReset">Reset filters</button>
    </div>`;

  $("#loadMore").classList.toggle("hidden", recipes.length <= visibleCount);
  $("#showFavorites").innerHTML = `${showOnlyFavorites ? "♥ All recipes" : "♡ Favorites"} <span id="favoriteCount">${favorites.length}</span>`;
  $("#favoriteCount").textContent = favorites.length;
}

function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter((item) => item !== name);
    showToast("Removed from your favorites.");
  } else {
    favorites.push(name);
    showToast("Added to your favorites ♥");
  }

  writeStorage(STORAGE.favorites, favorites);
  renderRecipes();
  renderFeatured();
}

function showRecipeDetails(name) {
  const recipe = RECIPES.find((item) => item.name === name);
  if (!recipe) return;

  const dialog = $("#detailsDialog");
  const content = $("#detailsContent");
  const isFavorite = favorites.includes(recipe.name);

  content.innerHTML = `
    ${imageMarkup(recipe, "dialog-image")}
    <div class="dialog-body">
      <span class="eyebrow">${escapeHTML(recipe.category)}</span>
      <h2>${escapeHTML(recipe.name)}</h2>
      <p>${escapeHTML(recipe.description)}</p>
      <h3>About this dish</h3>
      <p>This is part of RecipeRadar's collection of regional favourites. Explore the flavours, then use a trusted cooking guide for a complete ingredient list and method.</p>
      <div class="dialog-actions">
        <button class="button button-primary" type="button" data-dialog-favorite="${escapeHTML(recipe.name)}">
          ${isFavorite ? "♥ Remove favourite" : "♡ Save favourite"}
        </button>
        <a class="button button-secondary"
          href="https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.name + " authentic recipe")}"
          target="_blank" rel="noopener noreferrer">Find cooking instructions ↗</a>
      </div>
    </div>`;

  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function renderFeatured() {
  const container = $("#carouselContent");
  if (!container) return;

  const recipe = RECIPES[featuredIndex % RECIPES.length];
  container.innerHTML = `
    ${imageMarkup(recipe, "featured-image")}
    <div class="featured-copy">
      <div class="featured-meta">FEATURED DISH · ${String(featuredIndex + 1).padStart(2, "0")} / ${RECIPES.length}</div>
      <h3>${escapeHTML(recipe.name)}</h3>
      <p>${escapeHTML(recipe.description)}</p>
      <div class="hero-actions">
        <button class="button button-primary" type="button" data-details="${escapeHTML(recipe.name)}">Discover this dish ↗</button>
        <button class="button button-secondary" type="button" data-feature-favorite="${escapeHTML(recipe.name)}">
          ${favorites.includes(recipe.name) ? "♥ Saved" : "♡ Save dish"}
        </button>
      </div>
    </div>`;
}

function moveCarousel(direction) {
  featuredIndex = (featuredIndex + direction + RECIPES.length) % RECIPES.length;
  renderFeatured();
}

function resetFilters() {
  activeCategory = "All";
  showOnlyFavorites = false;
  visibleCount = 9;

  $("#searchInput").value = "";
  $("#sortSelect").value = "default";
  $$(".filter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.category === "All");
  });

  renderRecipes();
}

function loadProfile() {
  const profile = readStorage(STORAGE.profile, {
    name: "",
    email: "",
    level: "Beginner",
    preference: "All kinds of food"
  });

  $("#profileName").value = profile.name || "";
  $("#profileEmail").value = profile.email || "";
  $("#profileLevel").value = profile.level || "Beginner";
  $("#profilePreference").value = profile.preference || "All kinds of food";
  updateProfilePreview(profile);
}

function updateProfilePreview(profile) {
  const name = (profile.name || "").trim() || "Food Explorer";
  $("#profileDisplayName").textContent = name;
  $("#profileAvatar").textContent = name.charAt(0).toUpperCase();
  $("#profileDisplayPreference").textContent =
    profile.preference && profile.preference !== "All kinds of food"
      ? profile.preference
      : "Still discovering flavours";
}

function setupProfile() {
  loadProfile();

  $("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = {
      name: $("#profileName").value.trim(),
      email: $("#profileEmail").value.trim(),
      level: $("#profileLevel").value,
      preference: $("#profilePreference").value
    };

    if (!profile.name) {
      $("#profileStatus").textContent = "Please enter your name.";
      return;
    }

    const saved = writeStorage(STORAGE.profile, profile);
    updateProfilePreview(profile);
    $("#profileStatus").textContent = saved
      ? "Your profile has been saved in this browser ✓"
      : "Could not save your profile. Check your browser storage settings.";
    if (saved) showToast("Profile updated successfully.");
  });
}

function setupFeedback() {
  const ratingButtons = $$(".rating-stars button");

  function updateRating() {
    ratingButtons.forEach((button) => {
      const selected = Number(button.dataset.rating) <= selectedRating;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(Number(button.dataset.rating) === selectedRating));
    });

    $("#ratingLabel").textContent = selectedRating
      ? `${selectedRating} out of 5 stars`
      : "Choose a rating";
  }

  ratingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedRating = Number(button.dataset.rating);
      updateRating();
    });
  });

  $("#feedbackMessage").addEventListener("input", (event) => {
    $("#characterCount").textContent = `${event.target.value.length} / 1000`;
  });

  $("#feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const message = $("#feedbackMessage").value.trim();
    if (!selectedRating) {
      $("#feedbackStatus").textContent = "Please choose a star rating first.";
      return;
    }
    if (!message) {
      $("#feedbackStatus").textContent = "Please write a short comment.";
      return;
    }

    const entry = {
      rating: selectedRating,
      type: $("#feedbackType").value,
      message,
      date: new Date().toISOString()
    };

    const previous = readStorage(STORAGE.feedback, []);
    const entries = Array.isArray(previous) ? previous : [];
    entries.push(entry);

    const saved = writeStorage(STORAGE.feedback, entries);
    $("#feedbackStatus").textContent = saved
      ? "Thank you! Your feedback has been saved in this browser. ✓"
      : "Feedback could not be saved. Check browser storage settings.";

    if (saved) {
      showToast("Thank you for helping us improve!");
      $("#feedbackForm").reset();
      selectedRating = 0;
      updateRating();
      $("#characterCount").textContent = "0 / 1000";
    }
  });
}

async function searchOnlineRecipes(event) {
  event.preventDefault();

  const query = $("#apiRecipeInput").value.trim();
  if (!query) return;

  const status = $("#apiStatus");
  const results = $("#apiResults");

  status.textContent = "Searching for delicious ideas…";
  results.innerHTML = "";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    );

    if (!response.ok) throw new Error("The recipe service is unavailable.");

    const data = await response.json();
    const meals = data.meals || [];

    if (!meals.length) {
      status.textContent = "No recipes found. Try a different search term.";
      return;
    }

    status.textContent = `Found ${meals.length} recipe${meals.length === 1 ? "" : "s"}.`;

    results.innerHTML = meals.slice(0, 8).map((meal) => `
      <article class="api-recipe">
        <img src="${escapeHTML(meal.strMealThumb || "")}"
             alt="${escapeHTML(meal.strMeal)}" loading="lazy"
             onerror="this.style.display='none'">
        <div>
          <strong>${escapeHTML(meal.strMeal)}</strong>
          <p>${escapeHTML([meal.strArea, meal.strCategory].filter(Boolean).join(" · ") || "Online recipe")}</p>
          <a href="${escapeHTML(meal.strSource || meal.strYoutube || `https://www.themealdb.com/`)}"
             target="_blank" rel="noopener noreferrer">View recipe ↗</a>
        </div>
      </article>`).join("");
  } catch (error) {
    console.error(error);
    status.textContent = "Could not connect. Check your internet connection and try again.";
  }
}

function setupNavigation() {
  const toggle = $("#menuToggle");
  const nav = $("#mainNav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.textContent = open ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      toggle.textContent = "☰";
    });
  });
}

function setupEvents() {
  $("#searchInput").addEventListener("input", () => {
    visibleCount = 9;
    renderRecipes();
  });

  $("#clearSearch").addEventListener("click", () => {
    $("#searchInput").value = "";
    visibleCount = 9;
    renderRecipes();
    $("#searchInput").focus();
  });

  $("#sortSelect").addEventListener("change", renderRecipes);

  $("#categoryFilters").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-category]");
    if (!chip) return;

    activeCategory = chip.dataset.category;
    showOnlyFavorites = false;
    visibleCount = 9;

    $$(".filter-chip").forEach((item) => item.classList.toggle("active", item === chip));
    renderRecipes();
  });

  $("#resetFilters").addEventListener("click", resetFilters);

  $("#recipeGrid").addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite]");
    const detailsButton = event.target.closest("[data-details]");

    if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite);
    if (detailsButton) showRecipeDetails(detailsButton.dataset.details);

    if (event.target.closest("#emptyReset")) resetFilters();
  });

  $("#showFavorites").addEventListener("click", () => {
    showOnlyFavorites = !showOnlyFavorites;
    activeCategory = "All";
    visibleCount = 30;
    $$(".filter-chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.category === "All"));
    renderRecipes();
    $("#recipes").scrollIntoView({ behavior: "smooth" });
    if (showOnlyFavorites && favorites.length === 0) {
      showToast("Save a recipe using the heart button to see it here.");
    }
  });

  $("#loadMore").addEventListener("click", () => {
    visibleCount += 6;
    renderRecipes();
  });

  $("#carouselPrev").addEventListener("click", () => moveCarousel(-1));
  $("#carouselNext").addEventListener("click", () => moveCarousel(1));

  $("#carouselContent").addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-details]");
    const favoriteButton = event.target.closest("[data-feature-favorite]");

    if (detailButton) showRecipeDetails(detailButton.dataset.details);
    if (favoriteButton) toggleFavorite(favoriteButton.dataset.featureFavorite);
  });

  $("#closeDialog").addEventListener("click", () => $("#detailsDialog").close());

  $("#detailsDialog").addEventListener("click", (event) => {
    if (event.target === $("#detailsDialog")) $("#detailsDialog").close();

    const favoriteButton = event.target.closest("[data-dialog-favorite]");
    if (favoriteButton) {
      const name = favoriteButton.dataset.dialogFavorite;
      toggleFavorite(name);
      showRecipeDetails(name);
    }
  });

  $("#apiRecipeForm").addEventListener("submit", searchOnlineRecipes);
}

function init() {
  RECIPES.forEach((recipe) => {
    recipe.imagePath = getRecipeImage(recipe);
  });

  $("#currentYear").textContent = new Date().getFullYear();
  setupNavigation();
  setupEvents();
  setupProfile();
  setupFeedback();
  renderRecipes();
  renderFeatured();
}

document.addEventListener("DOMContentLoaded", init);
