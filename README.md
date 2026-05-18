# ⚡ Pantry Recipe Flash

> Type what's in your pantry. Get a recipe in a flash.

A fast, offline-first recipe finder that works with **what you actually have at home** — no fancy ingredients, no API key, no internet required.

## ✨ What it does

1. **Type your ingredients** — just type what's in your kitchen (e.g. `eggs, onion, tomato`)
2. **Hit Flash Recipes** — instantly see all matching recipes, ranked by best match
3. **See what you have vs. what's missing** — every ingredient is marked ✓ (have) or + (need)
4. **Tap any recipe** — expands to show full step-by-step cooking instructions

---

## 🍳 Features

- **40 recipes** across Indian, Italian, Asian, and everyday global cuisines
- **Smart ingredient matching** — `onions` matches `onion`, `olive oil` matches `oil`, etc.
- **Match percentage** — shows how close you are to a perfect pantry match
- **Works 100% offline** — no server, no API, no internet needed
- **Keyboard-first input** — press `Enter` or `,` to add ingredients quickly
- **Backspace shortcut** — backspace on empty input removes the last chip
- Fully **mobile responsive**

---

## 📁 File Structure

```
pantry-recipe-flash/
├── index.html      ← App shell and markup
├── style.css       ← All styling (no frameworks)
├── recipes.js      ← 40-recipe database (plain JS array)
├── app.js          ← Matching logic and UI interactions
└── README.md       ← You're here
```
## 🧠 How the matching works

Each recipe has a list of ingredients. When you search:

1. Every ingredient you typed is **normalized** (plurals stripped, lowercased)
2. Each recipe gets a **match score** = ingredients you have ÷ total ingredients
3. Recipes with **≥ 40% match** are shown, sorted best-first
4. Fuzzy matching handles common variants: `oil` matches `olive oil`, `chili` matches `green chili`

---

## 🌱 Adding your own recipes

Open `recipes.js` and add an entry to the `RECIPES` array:

```js
{
  name: "My Recipe",
  emoji: "🥗",
  time: "20 min",
  difficulty: "Easy",
  servings: 2,
  tags: ["Quick", "Vegetarian"],
  ingredients: ["tomato", "onion", "garlic", "olive oil", "salt"],
  steps: [
    "Step one...",
    "Step two...",
    "Step three..."
  ]
}
```

---

## 📦 Tech stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 |
| Styling | Pure CSS (CSS variables, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Data | Plain JS array in `recipes.js` |
| Hosting | GitHub Pages |

No React. No npm. No build tools. Just files.

---

## 🤝 Contributing

Pull requests are welcome! Great areas to contribute:
- Add more recipes (especially regional cuisine)
- Add dietary filter (vegan, gluten-free, etc.)
- Add a "save favourites" feature using localStorage

---

## 📄 License

MIT — free to use, modify, and share.

---

*Built as part of a 7-day GitHub project challenge.*
