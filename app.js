// ─────────────────────────────────────────────────────────────
//  PANTRY RECIPE FLASH — App Logic
//  Ingredient matching, chip rendering, results display
// ─────────────────────────────────────────────────────────────

// ── State ─────────────────────────────────────────────────────
let ingredients = [];
let openCards   = new Set(); // tracks which cards have steps expanded

// ── DOM References ────────────────────────────────────────────
const inputEl   = document.getElementById('ingredient-input');
const addBtn    = document.getElementById('add-btn');
const chipsEl   = document.getElementById('chips');
const findBtn   = document.getElementById('find-btn');
const resultsEl = document.getElementById('results');

// ── Add Ingredient ────────────────────────────────────────────
function addIngredient() {
  const raw = inputEl.value.trim();
  if (!raw) return;

  // Allow comma-separated input: "eggs, onion, garlic"
  const parts = raw
    .split(',')
    .map(p => p.trim().toLowerCase())
    .filter(p => p.length > 0);

  parts.forEach(part => {
    if (!ingredients.includes(part)) {
      ingredients.push(part);
    }
  });

  inputEl.value = '';
  renderChips();
  updateFindBtn();
  inputEl.focus();
}

// ── Remove Ingredient ─────────────────────────────────────────
function removeIngredient(ing) {
  ingredients = ingredients.filter(i => i !== ing);
  renderChips();
  updateFindBtn();

  // If results are visible, re-run search automatically
  if (!resultsEl.classList.contains('hidden') && ingredients.length > 0) {
    findRecipes();
  } else if (ingredients.length === 0) {
    resultsEl.classList.add('hidden');
  }
}

// ── Render Chips ──────────────────────────────────────────────
function renderChips() {
  if (ingredients.length === 0) {
    chipsEl.innerHTML = '';
    return;
  }
  chipsEl.innerHTML = ingredients
    .map(ing => `
      <span class="chip" role="listitem">
        ${ing}
        <button
          onclick="removeIngredient('${ing}')"
          aria-label="Remove ${ing}"
          title="Remove"
        >×</button>
      </span>
    `)
    .join('');
}

// ── Enable / Disable Find Button ──────────────────────────────
function updateFindBtn() {
  findBtn.disabled = ingredients.length === 0;
}

// ── Normalize Ingredient String ───────────────────────────────
// Handles plurals and spacing so "onions" matches "onion", etc.
function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/ies$/,  'y')   // berries → berry
    .replace(/ves$/,  'f')   // leaves → leaf
    .replace(/oes$/,  'o')   // tomatoes → tomato
    .replace(/es$/,   '')    // potatoes → potato
    .replace(/s$/,    '');   // onions → onion
}

// ── Check if User Has a Given Ingredient ──────────────────────
function userHas(recipeIng) {
  const normRecipe = normalize(recipeIng);
  return ingredients.some(ui => {
    const normUser = normalize(ui);
    return (
      normUser === normRecipe          ||   // exact match after normalizing
      normUser.includes(normRecipe)    ||   // user typed "soy sauce" → matches "soy"
      normRecipe.includes(normUser)         // recipe says "olive oil" → user typed "oil"
    );
  });
}

// ── Score a Recipe Against Current Ingredients ────────────────
function scoreRecipe(recipe) {
  const have    = recipe.ingredients.filter(ri => userHas(ri));
  const missing = recipe.ingredients.filter(ri => !userHas(ri));
  const score   = have.length / recipe.ingredients.length;
  return { ...recipe, have, missing, score };
}

// ── Find and Display Recipes ──────────────────────────────────
function findRecipes() {
  openCards.clear(); // collapse all open steps

  const matches = RECIPES
    .map(scoreRecipe)
    .filter(r => r.score >= 0.40)           // need at least 40% of ingredients
    .sort((a, b) => b.score - a.score);     // best match first

  renderResults(matches);

  // Smooth scroll to results
  setTimeout(() => {
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

// ── Render Results Section ────────────────────────────────────
function renderResults(matches) {
  resultsEl.classList.remove('hidden');

  if (matches.length === 0) {
    resultsEl.innerHTML = `
      <div class="no-results">
        <span class="emoji">😅</span>
        <p>No recipes found with those ingredients.</p>
        <small>
          Try adding common staples like <strong>onion</strong>, <strong>garlic</strong>,
          <strong>rice</strong>, <strong>eggs</strong>, or <strong>tomato</strong>.
        </small>
      </div>
    `;
    return;
  }

  resultsEl.innerHTML = `
    <div class="results-header">
      <h2>${matches.length} recipe${matches.length !== 1 ? 's' : ''} found</h2>
      <span>using ${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="cards" id="cards-container">
      ${matches.map((recipe, i) => renderCard(recipe, i)).join('')}
    </div>
  `;
}

// ── Render Individual Recipe Card ─────────────────────────────
function renderCard(recipe, index) {
  const pct       = Math.round(recipe.score * 100);
  const colorClass = pct === 100 ? 'perfect' : pct >= 65 ? 'good' : 'partial';
  const matchLabel = pct === 100 ? '✓ Perfect match' : `${pct}% match`;

  return `
    <div
      class="card ${colorClass}"
      id="card-${index}"
      onclick="toggleSteps(${index})"
      role="button"
      tabindex="0"
      aria-expanded="false"
      onkeydown="if(event.key==='Enter'||event.key===' ')toggleSteps(${index})"
    >
      <!-- Top Row -->
      <div class="card-top">
        <div class="card-emoji" aria-hidden="true">${recipe.emoji}</div>
        <div class="card-info">
          <h3>${recipe.name}</h3>
          <div class="card-meta">
            <span>⏱ ${recipe.time}</span>
            <span>👤 ${recipe.servings} servings</span>
            <span class="difficulty">${recipe.difficulty}</span>
          </div>
          <div class="tags-row">
            ${recipe.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="match-badge ${colorClass}" aria-label="${matchLabel}">
          ${pct}%
        </div>
      </div>

      <!-- Ingredient Status -->
      <div class="ingredient-status" aria-label="Ingredients you have and need">
        ${recipe.have.map(i    => `<span class="have" title="You have this">✓ ${i}</span>`).join('')}
        ${recipe.missing.map(i => `<span class="need" title="You need this">+ ${i}</span>`).join('')}
      </div>

      <!-- Steps (hidden by default) -->
      <div
        class="steps-section hidden"
        id="steps-${index}"
        aria-label="Recipe steps"
      >
        <h4>How to make it</h4>
        <ol class="steps">
          ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>

      <!-- Tap to expand hint -->
      <div class="card-footer" id="footer-${index}">
        <span>Tap to see steps ↓</span>
      </div>
    </div>
  `;
}

// ── Toggle Recipe Steps ───────────────────────────────────────
function toggleSteps(index) {
  const stepsEl  = document.getElementById(`steps-${index}`);
  const footerEl = document.getElementById(`footer-${index}`);
  const cardEl   = document.getElementById(`card-${index}`);

  const isOpen = !stepsEl.classList.contains('hidden');

  if (isOpen) {
    stepsEl.classList.add('hidden');
    footerEl.innerHTML = '<span>Tap to see steps ↓</span>';
    footerEl.classList.remove('open');
    cardEl.setAttribute('aria-expanded', 'false');
    openCards.delete(index);
  } else {
    stepsEl.classList.remove('hidden');
    footerEl.innerHTML = '<span>Tap to hide steps ↑</span>';
    footerEl.classList.add('open');
    cardEl.setAttribute('aria-expanded', 'true');
    openCards.add(index);
  }
}

// ── Clear All Ingredients ─────────────────────────────────────
function clearAll() {
  ingredients = [];
  openCards.clear();
  renderChips();
  updateFindBtn();
  resultsEl.classList.add('hidden');
}

// ── Event Listeners ───────────────────────────────────────────
addBtn.addEventListener('click', addIngredient);

inputEl.addEventListener('keydown', e => {
  // Enter or comma triggers add
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addIngredient();
  }
  // Backspace on empty input removes last chip
  if (e.key === 'Backspace' && inputEl.value === '' && ingredients.length > 0) {
    removeIngredient(ingredients[ingredients.length - 1]);
  }
});

findBtn.addEventListener('click', findRecipes);
