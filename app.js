// ─────────────────────────────────────────────────────────────
//  PANTRY RECIPE FLASH — App Logic v2
//  - Single ingredient → shows ALL recipes with that ingredient
//  - Ingredient aliases (curd = yogurt, jeera = cumin, etc.)
//  - Smarter matching threshold based on recipe size
// ─────────────────────────────────────────────────────────────

let ingredients = [];
let openCards   = new Set();

const inputEl   = document.getElementById('ingredient-input');
const addBtn    = document.getElementById('add-btn');
const chipsEl   = document.getElementById('chips');
const findBtn   = document.getElementById('find-btn');
const resultsEl = document.getElementById('results');

const ALIASES = {
  'chicken'       : ['chicken breast','chicken pieces','boiled chicken','raw chicken','chicken thigh','chicken drumstick','cooked chicken'],
  'oil'           : ['olive oil','vegetable oil','cooking oil','sunflower oil','coconut oil'],
  'chili'         : ['green chili','red chili','chilli','chili flakes','chilli flakes','green chilli'],
  'lentils'       : ['dal','masoor','red lentils','yellow lentils','moong dal','toor dal'],
  'red lentils'   : ['masoor dal','masoor','lentils'],
  'flour'         : ['wheat flour','all purpose flour','maida','atta','whole wheat flour'],
  'semolina'      : ['rava','sooji','suji'],
  'yogurt'        : ['curd','dahi','greek yogurt','plain yogurt'],
  'mustard seeds' : ['mustard','rai','sarson'],
  'garam masala'  : ['masala','spice mix','mixed spices'],
  'soy sauce'     : ['soy','soysauce','dark soy'],
  'butter'        : ['ghee','margarine'],
  'capsicum'      : ['bell pepper','pepper'],
  'potato'        : ['aloo','potatoes'],
  'onion'         : ['onions','shallot'],
  'garlic'        : ['garlic cloves','garlic paste'],
  'turmeric'      : ['haldi','turmeric powder'],
  'cumin'         : ['jeera','cumin seeds','cumin powder'],
  'tomato'        : ['tomatoes','cherry tomato'],
};

function addIngredient() {
  const raw = inputEl.value.trim();
  if (!raw) return;
  const parts = raw.split(',').map(p => p.trim().toLowerCase()).filter(p => p.length > 0);
  parts.forEach(part => { if (!ingredients.includes(part)) ingredients.push(part); });
  inputEl.value = '';
  renderChips();
  updateFindBtn();
  inputEl.focus();
}

function removeIngredient(ing) {
  ingredients = ingredients.filter(i => i !== ing);
  renderChips();
  updateFindBtn();
  if (!resultsEl.classList.contains('hidden') && ingredients.length > 0) {
    findRecipes();
  } else if (ingredients.length === 0) {
    resultsEl.classList.add('hidden');
  }
}

function renderChips() {
  if (ingredients.length === 0) { chipsEl.innerHTML = ''; return; }
  chipsEl.innerHTML = ingredients.map(ing => `
    <span class="chip" role="listitem">
      ${ing}
      <button onclick="removeIngredient('${ing}')" aria-label="Remove ${ing}" title="Remove">×</button>
    </span>
  `).join('');
}

function updateFindBtn() {
  findBtn.disabled = ingredients.length === 0;
}

function normalize(str) {
  return str.toLowerCase().trim()
    .replace(/ies$/, 'y').replace(/ves$/, 'f')
    .replace(/oes$/, 'o').replace(/es$/, '').replace(/s$/, '');
}

function expandWithAliases(ingredient) {
  const norm = normalize(ingredient);
  const expanded = [norm];
  Object.entries(ALIASES).forEach(([key, vals]) => {
    if (normalize(key) === norm) vals.forEach(v => expanded.push(normalize(v)));
    if (vals.some(v => normalize(v) === norm)) {
      expanded.push(normalize(key));
      vals.forEach(v => expanded.push(normalize(v)));
    }
  });
  return [...new Set(expanded)];
}

function userHas(recipeIng) {
  const recipeExpanded = expandWithAliases(recipeIng);
  return ingredients.some(ui => {
    const userExpanded = expandWithAliases(ui);
    return recipeExpanded.some(re => userExpanded.some(ue => ue === re || ue.includes(re) || re.includes(ue)));
  });
}

function scoreRecipe(recipe) {
  const have    = recipe.ingredients.filter(ri => userHas(ri));
  const missing = recipe.ingredients.filter(ri => !userHas(ri));
  let score     = have.length / recipe.ingredients.length;
  if (recipe.ingredients.length <= 3 && have.length >= 1) score = Math.max(score, 0.50);
  if (have.includes(recipe.ingredients[0])) score = Math.min(score + 0.08, 1.0);
  return { ...recipe, have, missing, score };
}

function meetsThreshold(recipe) {
  const total = recipe.ingredients.length;
  if (total <= 3) return recipe.score >= 0.30;
  if (total <= 5) return recipe.score >= 0.35;
  return recipe.score >= 0.40;
}

function findRecipes() {
  openCards.clear();

  // SINGLE INGREDIENT → show ALL recipes containing that ingredient
  if (ingredients.length === 1) {
    const singleAliases = expandWithAliases(ingredients[0]);
    const tagMatches = RECIPES.filter(recipe =>
      recipe.ingredients.some(ri => {
        const riAliases = expandWithAliases(ri);
        return singleAliases.some(sa => riAliases.some(ra => ra === sa || ra.includes(sa) || sa.includes(ra)));
      })
    ).sort((a, b) => a.name.localeCompare(b.name));

    if (tagMatches.length > 0) {
      renderResults(tagMatches);
      setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      return;
    }
  }

  // MULTIPLE ingredients → score and rank
  const matches = RECIPES.map(scoreRecipe).filter(meetsThreshold).sort((a, b) => b.score - a.score);
  renderResults(matches);
  setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function renderResults(matches) {
  resultsEl.classList.remove('hidden');
  if (matches.length === 0) {
    resultsEl.innerHTML = `
      <div class="no-results">
        <span class="emoji">😅</span>
        <p>No recipes found with those ingredients.</p>
        <small>Try adding common items like <strong>onion</strong>, <strong>garlic</strong>, <strong>rice</strong>, <strong>eggs</strong>, or <strong>chicken</strong>.</small>
      </div>`;
    return;
  }
  resultsEl.innerHTML = `
    <div class="results-header">
      <h2>${matches.length} recipe${matches.length !== 1 ? 's' : ''} found</h2>
      <span>using ${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''}</span>
    </div>
    <div class="cards" id="cards-container">
      ${matches.map((recipe, i) => renderCard(recipe, i)).join('')}
    </div>`;
}

function renderCard(recipe, index) {
  const pct        = Math.round((recipe.score || 1) * 100);
  const colorClass = pct === 100 ? 'perfect' : pct >= 65 ? 'good' : 'partial';
  return `
    <div class="card ${colorClass}" id="card-${index}" onclick="toggleSteps(${index})"
      role="button" tabindex="0" aria-expanded="false"
      onkeydown="if(event.key==='Enter'||event.key===' ')toggleSteps(${index})">
      <div class="card-top">
        <div class="card-emoji">${recipe.emoji}</div>
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
        <div class="match-badge ${colorClass}">${pct === 100 ? '✓' : pct + '%'}</div>
      </div>
      <div class="ingredient-status">
        ${(recipe.have || recipe.ingredients).map(i => `<span class="have">✓ ${i}</span>`).join('')}
        ${(recipe.missing || []).map(i => `<span class="need">+ ${i}</span>`).join('')}
      </div>
      <div class="steps-section hidden" id="steps-${index}">
        <h4>How to make it</h4>
        <ol class="steps">${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
      </div>
      <div class="card-footer" id="footer-${index}"><span>Tap to see steps ↓</span></div>
    </div>`;
}

function toggleSteps(index) {
  const stepsEl  = document.getElementById(`steps-${index}`);
  const footerEl = document.getElementById(`footer-${index}`);
  const cardEl   = document.getElementById(`card-${index}`);
  const isOpen   = !stepsEl.classList.contains('hidden');
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

addBtn.addEventListener('click', addIngredient);
inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addIngredient(); }
  if (e.key === 'Backspace' && inputEl.value === '' && ingredients.length > 0) removeIngredient(ingredients[ingredients.length - 1]);
});
findBtn.addEventListener('click', findRecipes);
