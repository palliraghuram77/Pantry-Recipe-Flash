// ─────────────────────────────────────────────────────────────
//  PANTRY RECIPE FLASH — Smart v5
//  Online + Groq API key  → Groq AI generates dynamic recipes
//  Offline OR no key      → Falls back to recipes.js automatically
// ─────────────────────────────────────────────────────────────

let ingredients = [];
let openCards   = new Set();

// ── DOM References ────────────────────────────────────────────
const inputEl     = document.getElementById('ingredient-input');
const addBtn      = document.getElementById('add-btn');
const chipsEl     = document.getElementById('chips');
const findBtn     = document.getElementById('find-btn');
const resultsEl   = document.getElementById('results');
const loadingEl   = document.getElementById('loading');
const settingsBtn = document.getElementById('settings-btn');
const modal       = document.getElementById('settings-modal');
const closeModal  = document.getElementById('close-modal');
const apiKeyInput = document.getElementById('api-key-input');
const saveKeyBtn  = document.getElementById('save-key-btn');
const clearKeyBtn = document.getElementById('clear-key-btn');

// ── API Key Management ────────────────────────────────────────
function getApiKey()   { return localStorage.getItem('groq_api_key') || ''; }
function saveApiKey(k) { localStorage.setItem('groq_api_key', k.trim()); }
function clearApiKey() { localStorage.removeItem('groq_api_key'); }
function isKeySet()    { return getApiKey().startsWith('gsk_'); }
function isOnline()    { return navigator.onLine; }

function updateSettingsBtn() {
  if (isKeySet()) {
    settingsBtn.textContent      = '✅ AI Ready';
    settingsBtn.style.background = '#E8F7EE';
    settingsBtn.style.color      = '#1E6B3D';
    settingsBtn.style.borderColor= '#A8DFC0';
  } else {
    settingsBtn.textContent      = '⚙️ Setup AI';
    settingsBtn.style.background = '';
    settingsBtn.style.color      = '';
    settingsBtn.style.borderColor= '';
  }
}

// ── Settings Modal ────────────────────────────────────────────
settingsBtn.addEventListener('click', () => {
  apiKeyInput.value = getApiKey();
  modal.classList.remove('hidden');
  apiKeyInput.focus();
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key.startsWith('gsk_')) {
    apiKeyInput.style.borderColor = '#E8622A';
    apiKeyInput.placeholder = 'Must start with gsk_...';
    return;
  }
  saveApiKey(key);
  modal.classList.add('hidden');
  updateSettingsBtn();
});

clearKeyBtn.addEventListener('click', () => {
  clearApiKey();
  apiKeyInput.value = '';
  updateSettingsBtn();
});

apiKeyInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') saveKeyBtn.click();
  apiKeyInput.style.borderColor = '';
});

// ── Add / Remove Ingredients ──────────────────────────────────
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
  if (ingredients.length === 0) resultsEl.classList.add('hidden');
}

function renderChips() {
  if (ingredients.length === 0) { chipsEl.innerHTML = ''; return; }
  chipsEl.innerHTML = ingredients.map(ing => `
    <span class="chip" role="listitem">
      ${ing}
      <button onclick="removeIngredient('${ing}')" aria-label="Remove ${ing}">×</button>
    </span>`).join('');
}

function updateFindBtn() {
  findBtn.disabled = ingredients.length === 0;
}

// ── OFFLINE FALLBACK: Local Recipe Matching ───────────────────
const ALIASES = {
  'chicken'       : ['chicken breast','chicken pieces','boiled chicken','raw chicken','chicken thigh','cooked chicken'],
  'oil'           : ['olive oil','vegetable oil','cooking oil','sunflower oil'],
  'chili'         : ['green chili','red chili','chilli','chili flakes','green chilli'],
  'lentils'       : ['dal','masoor','red lentils','yellow lentils','moong dal','toor dal'],
  'red lentils'   : ['masoor dal','masoor','lentils'],
  'flour'         : ['wheat flour','maida','atta','all purpose flour'],
  'semolina'      : ['rava','sooji','suji'],
  'yogurt'        : ['curd','dahi','greek yogurt'],
  'mustard seeds' : ['mustard','rai'],
  'garam masala'  : ['masala','spice mix'],
  'soy sauce'     : ['soy','soysauce'],
  'butter'        : ['ghee','margarine'],
  'potato'        : ['aloo'],
  'turmeric'      : ['haldi'],
  'cumin'         : ['jeera','cumin seeds'],
  'tomato'        : ['tomatoes'],
};

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
  const recipeExp = expandWithAliases(recipeIng);
  return ingredients.some(ui => {
    const userExp = expandWithAliases(ui);
    return recipeExp.some(re => userExp.some(ue => ue === re || ue.includes(re) || re.includes(ue)));
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

function findLocalRecipes() {
  if (ingredients.length === 1) {
    const singleAliases = expandWithAliases(ingredients[0]);
    const tagMatches = RECIPES.filter(recipe =>
      recipe.ingredients.some(ri => {
        const riAliases = expandWithAliases(ri);
        return singleAliases.some(sa => riAliases.some(ra => ra === sa || ra.includes(sa) || sa.includes(ra)));
      })
    ).sort((a, b) => a.name.localeCompare(b.name));
    if (tagMatches.length > 0) return tagMatches;
  }
  return RECIPES.map(scoreRecipe).filter(meetsThreshold).sort((a, b) => b.score - a.score);
}

// ── Groq AI API Call ──────────────────────────────────────────
async function callGroqAPI() {
  const prompt = `The user has these ingredients: ${ingredients.join(', ')}.

Generate 6 to 8 diverse and practical recipes. Rules:
- Include 2-3 recipes they can make with EXACTLY or mostly these ingredients
- Include 3-4 recipes needing just 1-3 more common items like salt, oil, water, garlic
- Cover different meal types: breakfast, lunch, dinner, snacks
- Mix of cuisines: Indian, Asian, Western etc
- Keep all recipes simple and realistic for a home cook

Return ONLY a valid JSON array. No markdown. No backticks. No explanation. Just raw JSON.
Each object must have exactly these fields:
{
  "name": "Recipe Name",
  "emoji": "🍳",
  "time": "20 min",
  "difficulty": "Easy",
  "servings": 2,
  "tags": ["Indian", "Quick"],
  "ingredients": ["all", "ingredients", "needed"],
  "steps": ["Step 1 with clear instructions", "Step 2", "Step 3"]
}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getApiKey()}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a recipe assistant. Always respond with only valid JSON arrays. No markdown, no explanation, just raw JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || `Groq API error ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices[0].message.content.trim().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}

// ── Mark have / missing for AI recipes ───────────────────────
function markIngredients(recipe) {
  const userSet = ingredients.map(i => i.toLowerCase());
  const have    = [];
  const missing = [];
  recipe.ingredients.forEach(ri => {
    const riLow     = ri.toLowerCase();
    const userHasIt = userSet.some(u =>
      riLow.includes(u) || u.includes(riLow) ||
      riLow.split(' ').some(word => u.includes(word) && word.length > 2)
    );
    if (userHasIt) have.push(ri);
    else missing.push(ri);
  });
  return { ...recipe, have, missing };
}

// ── Main: Find Recipes ────────────────────────────────────────
async function findRecipes() {
  if (ingredients.length === 0) return;

  openCards.clear();
  resultsEl.classList.add('hidden');
  findBtn.disabled = true;

  const useAI = isKeySet() && isOnline();

  if (useAI) {
    loadingEl.classList.remove('hidden');
    findBtn.textContent = '⏳ AI is cooking...';

    try {
      const raw     = await callGroqAPI();
      const recipes = raw.map(markIngredients);
      loadingEl.classList.add('hidden');
      renderResults(recipes, 'ai');
    } catch (err) {
      loadingEl.classList.add('hidden');
      console.warn('Groq AI failed, falling back to local:', err.message);
      const local = findLocalRecipes();
      renderResults(local, 'fallback', err.message);
    }
  } else {
    const local = findLocalRecipes();
    renderResults(local, isOnline() ? 'local' : 'offline');
  }

  findBtn.disabled    = false;
  findBtn.textContent = '⚡ Flash Recipes with AI';
}

// ── Render Results ────────────────────────────────────────────
function renderResults(recipes, source, errorMsg) {
  resultsEl.classList.remove('hidden');

  const badges = {
    ai      : '⚡ Groq AI',
    local   : '📚 Local recipes — add Groq key for AI',
    offline : '📴 Offline mode — local recipes',
    fallback: '📚 Local recipes — AI unavailable'
  };
  const badgeColors = {
    ai      : 'badge-ai',
    local   : 'badge-local',
    offline : 'badge-offline',
    fallback: 'badge-local'
  };

  if (!recipes || recipes.length === 0) {
    resultsEl.innerHTML = `
      <div class="no-results">
        <span class="emoji">😅</span>
        <p>No recipes found with those ingredients.</p>
        <small>Try adding more like onion, garlic, rice, or eggs.</small>
      </div>`;
    setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    return;
  }

  resultsEl.innerHTML = `
    <div class="results-header">
      <h2>${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} found</h2>
      <span class="source-badge ${badgeColors[source]}">${badges[source]}</span>
    </div>
    ${errorMsg ? `<p class="fallback-note">⚠️ AI error: ${errorMsg}</p>` : ''}
    <div class="cards">
      ${recipes.map((recipe, i) => renderCard(recipe, i)).join('')}
    </div>`;

  setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

// ── Render Card ───────────────────────────────────────────────
function renderCard(recipe, index) {
  const have       = recipe.have    || recipe.ingredients;
  const missing    = recipe.missing || [];
  const total      = recipe.ingredients.length;
  const pct        = total > 0 ? Math.round((have.length / total) * 100) : 100;
  const colorClass = pct === 100 ? 'perfect' : pct >= 60 ? 'good' : 'partial';

  return `
    <div class="card ${colorClass}" id="card-${index}"
      onclick="toggleSteps(${index})" role="button" tabindex="0" aria-expanded="false"
      onkeydown="if(event.key==='Enter'||event.key===' ')toggleSteps(${index})">
      <div class="card-top">
        <div class="card-emoji">${recipe.emoji || '🍽️'}</div>
        <div class="card-info">
          <h3>${recipe.name}</h3>
          <div class="card-meta">
            <span>⏱ ${recipe.time}</span>
            <span>👤 ${recipe.servings} servings</span>
            <span class="difficulty">${recipe.difficulty}</span>
          </div>
          <div class="tags-row">
            ${(recipe.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="match-badge ${colorClass}">${pct === 100 ? '✓' : pct + '%'}</div>
      </div>
      <div class="ingredient-status">
        ${have.map(i    => `<span class="have">✓ ${i}</span>`).join('')}
        ${missing.map(i => `<span class="need">+ ${i}</span>`).join('')}
      </div>
      <div class="steps-section hidden" id="steps-${index}">
        <h4>How to make it</h4>
        <ol class="steps">${(recipe.steps || []).map(s => `<li>${s}</li>`).join('')}</ol>
      </div>
      <div class="card-footer" id="footer-${index}"><span>Tap to see steps ↓</span></div>
    </div>`;
}

// ── Toggle Steps ──────────────────────────────────────────────
function toggleSteps(index) {
  const stepsEl  = document.getElementById(`steps-${index}`);
  const footerEl = document.getElementById(`footer-${index}`);
  const cardEl   = document.getElementById(`card-${index}`);
  const isOpen   = !stepsEl.classList.contains('hidden');
  stepsEl.classList.toggle('hidden', isOpen);
  footerEl.innerHTML = isOpen ? '<span>Tap to see steps ↓</span>' : '<span>Tap to hide steps ↑</span>';
  footerEl.classList.toggle('open', !isOpen);
  cardEl.setAttribute('aria-expanded', String(!isOpen));
}

// ── Event Listeners ───────────────────────────────────────────
addBtn.addEventListener('click', addIngredient);
findBtn.addEventListener('click', findRecipes);
inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addIngredient(); }
  if (e.key === 'Backspace' && inputEl.value === '' && ingredients.length > 0) removeIngredient(ingredients[ingredients.length - 1]);
});

// ── Init ──────────────────────────────────────────────────────
updateSettingsBtn();
