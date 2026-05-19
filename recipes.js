// ─────────────────────────────────────────────────────────────
//  PANTRY RECIPE FLASH — Recipe Database v2
//  53 recipes: Indian, Asian, Western, everyday pantry staples
//  Includes pure chicken, chicken+egg combos, and more basics
// ─────────────────────────────────────────────────────────────

const RECIPES = [

  // ── EGGS ─────────────────────────────────────────────────────
  {
    name: "Boiled Eggs",
    emoji: "🥚",
    time: "12 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Breakfast", "Protein", "Basic"],
    ingredients: ["eggs", "water", "salt"],
    steps: [
      "Place eggs in a pot and cover with cold water.",
      "Bring to a boil over high heat.",
      "For soft boiled: cook 6 minutes. For hard boiled: cook 10 minutes.",
      "Transfer to cold water immediately to stop cooking.",
      "Peel and sprinkle with salt. Serve as is or with toast."
    ]
  },
  {
    name: "Fried Egg",
    emoji: "🍳",
    time: "5 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Breakfast", "Basic", "Quick"],
    ingredients: ["eggs", "oil", "salt"],
    steps: [
      "Heat a small amount of oil in a pan over medium heat.",
      "Crack the egg directly into the pan gently.",
      "Season with salt.",
      "Cook until white is fully set (2-3 minutes) for sunny side up.",
      "Flip and cook 30 more seconds for over easy.",
      "Serve on toast or with rice."
    ]
  },
  {
    name: "Masala Omelette",
    emoji: "🍳",
    time: "10 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Indian", "Breakfast", "Vegetarian"],
    ingredients: ["eggs", "onion", "tomato", "chili", "salt", "oil"],
    steps: [
      "Finely chop the onion, tomato, and chili.",
      "Crack 2 eggs into a bowl, beat well with salt.",
      "Mix in the chopped vegetables.",
      "Heat oil in a pan over medium flame.",
      "Pour in the egg mixture and spread evenly.",
      "Cook for 2 minutes, flip, cook another minute.",
      "Fold and serve hot with bread or roti."
    ]
  },
  {
    name: "Scrambled Eggs",
    emoji: "🥚",
    time: "8 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Breakfast", "Western"],
    ingredients: ["eggs", "butter", "milk", "salt", "pepper"],
    steps: [
      "Crack eggs into a bowl, add a splash of milk, salt and pepper. Whisk.",
      "Melt butter in a non-stick pan over low heat.",
      "Pour in the eggs. Wait 30 seconds before stirring.",
      "Gently push the eggs from the edges toward the center.",
      "Remove from heat while slightly underdone — residual heat finishes them.",
      "Serve immediately on toast."
    ]
  },
  {
    name: "Egg Curry",
    emoji: "🍛",
    time: "25 min",
    difficulty: "Medium",
    servings: 2,
    tags: ["Indian", "Lunch", "Dinner"],
    ingredients: ["eggs", "onion", "tomato", "garlic", "garam masala", "turmeric", "oil"],
    steps: [
      "Hard boil eggs (10 min), peel and lightly fry in oil until golden.",
      "In the same pan, sauté diced onions until golden brown.",
      "Add garlic, cook 1 minute. Add tomatoes, turmeric, garam masala and salt.",
      "Cook the masala until oil separates (about 8 min).",
      "Add 1 cup water and bring to a simmer.",
      "Add the fried eggs and simmer 5 more minutes.",
      "Serve with rice or roti."
    ]
  },
  {
    name: "French Toast",
    emoji: "🍞",
    time: "12 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Breakfast", "Sweet"],
    ingredients: ["bread", "eggs", "milk", "sugar", "butter"],
    steps: [
      "Beat together eggs, milk, and sugar in a wide bowl.",
      "Dip bread slices into the mixture, coating both sides.",
      "Melt butter in a pan over medium heat.",
      "Cook each soaked slice for 2-3 min per side until golden.",
      "Serve with honey, jam, or as is."
    ]
  },
  {
    name: "Egg Fried Rice",
    emoji: "🍚",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Asian", "Lunch", "Leftover"],
    ingredients: ["rice", "eggs", "onion", "garlic", "soy sauce", "oil"],
    steps: [
      "Use day-old cooked rice for best results.",
      "Heat oil in a large pan or wok on high heat.",
      "Scramble eggs in the pan, cook until just set, then push to the side.",
      "Add onion and garlic, stir fry for 2 minutes.",
      "Add rice and stir fry everything together for 3-4 minutes.",
      "Drizzle soy sauce over, mix well, adjust salt.",
      "Serve hot."
    ]
  },
  {
    name: "Egg Drop Tomato Soup",
    emoji: "🍅",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Soup", "Quick", "Asian"],
    ingredients: ["eggs", "tomato", "garlic", "oil", "salt", "pepper"],
    steps: [
      "Heat oil, sauté garlic for 30 seconds.",
      "Add diced tomatoes, cook until mushy and saucy (5 min).",
      "Add 2 cups water, bring to a boil. Season with salt and pepper.",
      "Beat eggs in a cup. Slowly pour in a thin stream while stirring the soup.",
      "Simmer 1 minute. Serve hot."
    ]
  },
  {
    name: "Bread Omelette",
    emoji: "🥪",
    time: "10 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Indian", "Breakfast", "Street food"],
    ingredients: ["bread", "eggs", "onion", "salt", "butter", "chili"],
    steps: [
      "Beat eggs with salt and chopped chili.",
      "Heat butter in a pan, add the egg mixture.",
      "Before the egg sets fully, press 2 slices of bread on top.",
      "Flip the whole thing so bread is on the bottom.",
      "Cook until bread is toasted and egg is fully set.",
      "Flip out onto a plate, egg side up. Serve with ketchup."
    ]
  },
  {
    name: "Poached Eggs on Toast",
    emoji: "🍳",
    time: "10 min",
    difficulty: "Medium",
    servings: 1,
    tags: ["Breakfast", "Western"],
    ingredients: ["eggs", "bread", "butter", "salt", "pepper"],
    steps: [
      "Toast bread and butter it generously.",
      "Bring a small pot of water to a gentle simmer.",
      "Crack egg into a cup. Stir water to create a gentle whirlpool.",
      "Slide the egg into the center gently.",
      "Cook 3-4 minutes for runny yolk. Remove with a slotted spoon.",
      "Place on buttered toast. Season with salt and pepper."
    ]
  },

  // ── PURE CHICKEN ─────────────────────────────────────────────
  {
    name: "Simple Boiled Chicken",
    emoji: "🍗",
    time: "25 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Protein", "Healthy", "Basic"],
    ingredients: ["chicken", "salt", "pepper", "water"],
    steps: [
      "Place chicken pieces in a pot and cover with water.",
      "Add salt and pepper.",
      "Bring to a boil, then reduce heat.",
      "Simmer for 20 minutes until chicken is fully cooked through (no pink inside).",
      "Drain and serve as is, or shred and use in other dishes.",
      "Tip: save the broth — it makes great soup!"
    ]
  },
  {
    name: "Chicken Curry",
    emoji: "🍛",
    time: "35 min",
    difficulty: "Medium",
    servings: 3,
    tags: ["Indian", "Dinner", "Spicy"],
    ingredients: ["chicken", "onion", "tomato", "garlic", "turmeric", "garam masala", "oil"],
    steps: [
      "Heat oil in a deep pan. Add sliced onions, fry until golden brown.",
      "Add minced garlic, cook 1 minute.",
      "Add tomatoes, turmeric, and garam masala. Cook until oil separates (8-10 min).",
      "Add chicken pieces, coat well in the masala.",
      "Add half cup water, cover and cook on medium heat for 20 minutes.",
      "Stir occasionally and check chicken is fully cooked.",
      "Serve hot with rice or roti."
    ]
  },
  {
    name: "Butter Chicken (Simple)",
    emoji: "🍗",
    time: "30 min",
    difficulty: "Medium",
    servings: 3,
    tags: ["Indian", "Dinner", "Creamy"],
    ingredients: ["chicken", "tomato", "butter", "garlic", "garam masala", "salt"],
    steps: [
      "Cook chicken pieces in butter until golden. Set aside.",
      "In the same pan, add more butter and garlic.",
      "Add tomatoes and garam masala. Cook until thick and mushy.",
      "Blend the sauce until smooth.",
      "Add chicken back in. Simmer 10 minutes.",
      "Add a spoon of butter at the end for richness.",
      "Serve with naan or rice."
    ]
  },
  {
    name: "Chicken Soup",
    emoji: "🥣",
    time: "35 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Comfort", "Healthy", "Soup"],
    ingredients: ["chicken", "onion", "garlic", "carrot", "salt", "pepper"],
    steps: [
      "Place chicken in a pot with water. Bring to boil.",
      "Add chopped onion, garlic, and carrot.",
      "Season with salt and pepper.",
      "Simmer covered for 25 minutes.",
      "Remove chicken, shred it, and add back to the broth.",
      "Taste and adjust salt. Serve hot."
    ]
  },
  {
    name: "Grilled Chicken",
    emoji: "🍗",
    time: "25 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Protein", "Healthy", "Grilled"],
    ingredients: ["chicken", "lemon", "garlic", "oil", "salt", "chili"],
    steps: [
      "Mix oil, minced garlic, lemon juice, salt, and chili powder in a bowl.",
      "Coat chicken pieces with this marinade and let sit for 10 minutes.",
      "Heat a pan or grill over medium-high heat.",
      "Grill chicken for 8-10 minutes per side until golden and cooked through.",
      "Serve hot with sliced onion and lemon wedges."
    ]
  },
  {
    name: "Chicken with Tomato Gravy",
    emoji: "🍛",
    time: "25 min",
    difficulty: "Medium",
    servings: 2,
    tags: ["Indian", "Gravy", "Dinner"],
    ingredients: ["chicken", "tomato", "onion", "garlic", "oil", "salt", "chili"],
    steps: [
      "Heat oil in a pan over medium heat.",
      "Fry diced onion until golden.",
      "Add minced garlic and cook for 1 minute.",
      "Add diced tomatoes and green chili, cook for 3 minutes.",
      "Add diced chicken and salt, mix well.",
      "Cover and simmer for 15-20 minutes until chicken is tender.",
      "Serve hot with rice or bread."
    ]
  },
  {
    name: "Chicken Tikka (Simple)",
    emoji: "🍢",
    time: "20 min",
    difficulty: "Medium",
    servings: 2,
    tags: ["Indian", "Grilled", "Chicken"],
    ingredients: ["chicken", "yogurt", "lemon", "garlic", "garam masala", "oil", "salt"],
    steps: [
      "Mix yogurt, minced garlic, lemon juice, garam masala, oil and salt.",
      "Marinate chicken pieces in this mixture for at least 10 minutes.",
      "Heat a pan or grill over medium-high heat.",
      "Cook marinated chicken for 6-8 minutes per side until cooked through.",
      "Serve hot with onion slices and lemon wedges."
    ]
  },
  {
    name: "Chicken Stir Fry",
    emoji: "🥘",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Asian", "Quick", "Protein"],
    ingredients: ["chicken", "garlic", "soy sauce", "oil", "onion", "pepper"],
    steps: [
      "Heat oil in a wok or large pan over high heat.",
      "Add minced garlic and cook for 30 seconds.",
      "Add diced chicken and stir-fry for 4-5 minutes until golden.",
      "Add sliced onion and stir-fry for 2 minutes.",
      "Add soy sauce and pepper, mix well.",
      "Serve hot with rice."
    ]
  },
  {
    name: "Chicken Fried Rice",
    emoji: "🍚",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Asian", "Rice", "Chicken"],
    ingredients: ["chicken", "rice", "onion", "garlic", "oil", "soy sauce", "salt"],
    steps: [
      "Heat oil in a wok or large pan over high heat.",
      "Add minced garlic and diced onion, stir-fry for 1 minute.",
      "Add diced cooked chicken and cook for 2 minutes.",
      "Add cooked rice and break up clumps, stir-fry for 3 minutes.",
      "Add soy sauce and salt, mix well.",
      "Serve hot immediately."
    ]
  },

  // ── CHICKEN + EGG COMBOS ──────────────────────────────────────
  {
    name: "Chicken Omelette",
    emoji: "🍳",
    time: "12 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Breakfast", "Protein", "Chicken"],
    ingredients: ["eggs", "chicken", "onion", "oil", "salt", "pepper"],
    steps: [
      "Beat 2-3 eggs with salt and pepper in a bowl.",
      "Heat oil in a non-stick pan over medium heat.",
      "Pour in the egg mixture and let it set slightly.",
      "Add cooked diced chicken and finely chopped onion in the center.",
      "Fold the omelette in half when the bottom is golden.",
      "Cook for another 30 seconds and slide onto a plate.",
      "Serve immediately with toast or bread."
    ]
  },
  {
    name: "Chicken Egg Scramble",
    emoji: "🍳",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Breakfast", "Protein", "Quick"],
    ingredients: ["chicken", "eggs", "onion", "tomato", "oil", "salt", "chili"],
    steps: [
      "Heat oil in a pan over medium-high heat.",
      "Add diced onions and sauté for 2 minutes.",
      "Add cooked or raw diced chicken and cook for 3-4 minutes.",
      "Add diced tomatoes and green chili, cook for 1 minute.",
      "Beat 3-4 eggs in a bowl with salt.",
      "Pour eggs into the pan and scramble until cooked through (3-5 minutes).",
      "Serve hot with bread or rice."
    ]
  },
  {
    name: "Fried Eggs with Chicken",
    emoji: "🍳",
    time: "10 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Breakfast", "Quick", "Protein"],
    ingredients: ["eggs", "chicken", "oil", "salt", "pepper"],
    steps: [
      "Heat oil in a pan over medium heat.",
      "Add diced or shredded cooked chicken and warm through (2 minutes).",
      "Push chicken to the side and crack 2 eggs into the pan.",
      "Cook until whites are set but yolk is runny (sunny side up).",
      "Season with salt and pepper.",
      "Serve on a plate with toast or roti."
    ]
  },
  {
    name: "Chicken Egg Fried Rice",
    emoji: "🍚",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Rice", "Chicken", "Asian"],
    ingredients: ["rice", "eggs", "chicken", "onion", "garlic", "oil", "soy sauce"],
    steps: [
      "Heat oil in a large pan or wok over high heat.",
      "Add minced garlic and diced onion, stir-fry for 1 minute.",
      "Add diced cooked chicken and cook for 2 minutes.",
      "Add cooked rice and break up any clumps, stir-fry for 2-3 minutes.",
      "Push rice to the side, crack 2 eggs into the empty space, scramble quickly.",
      "Mix eggs with rice, add soy sauce and mix well.",
      "Serve hot."
    ]
  },
  {
    name: "Shakshuka with Chicken",
    emoji: "🍳",
    time: "20 min",
    difficulty: "Medium",
    servings: 2,
    tags: ["Eggs", "Chicken", "Middle Eastern"],
    ingredients: ["eggs", "tomato", "onion", "garlic", "chicken", "chili", "oil"],
    steps: [
      "Heat oil in a deep pan over medium heat.",
      "Sauté diced onion and garlic for 2 minutes.",
      "Add diced tomatoes and green chili, cook for 3 minutes.",
      "Add cooked diced chicken and simmer for 2 minutes.",
      "Create 2 small wells in the sauce and crack an egg into each.",
      "Cover and cook until egg whites are set (3-4 minutes).",
      "Serve hot with bread for dipping."
    ]
  },
  {
    name: "Boiled Egg and Chicken Bowl",
    emoji: "🥗",
    time: "15 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Protein", "Light", "Healthy"],
    ingredients: ["eggs", "chicken", "onion", "tomato", "oil", "salt", "lemon"],
    steps: [
      "Boil 2 eggs in water for 10 minutes, then cool and peel.",
      "Dice cooked chicken into small pieces.",
      "Chop onion and tomato finely.",
      "Mix chicken, onion, and tomato in a bowl.",
      "Slice boiled eggs and add to the mixture.",
      "Drizzle with oil, lemon juice, and salt.",
      "Serve cold as a light meal."
    ]
  },

  // ── RICE ─────────────────────────────────────────────────────
  {
    name: "Dal Khichdi",
    emoji: "🥘",
    time: "30 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Indian", "Comfort", "Vegetarian"],
    ingredients: ["rice", "lentils", "onion", "potato", "carrot", "turmeric", "cumin", "oil"],
    steps: [
      "Wash and soak rice and lentils together for 15 minutes.",
      "Heat oil, add cumin seeds, let them splutter.",
      "Add onion, cook until soft. Add potato and carrot chunks.",
      "Add turmeric and salt, mix well.",
      "Add soaked rice and lentils with 4 cups water.",
      "Pressure cook for 3 whistles or simmer covered for 25 minutes.",
      "Stir well and serve with ghee on top."
    ]
  },
  {
    name: "Jeera Rice",
    emoji: "🍚",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Indian", "Side dish"],
    ingredients: ["rice", "cumin", "oil", "salt"],
    steps: [
      "Wash rice and soak for 15 minutes.",
      "Heat oil in a pot, add cumin seeds. Let them sizzle.",
      "Drain rice and add to the pot. Stir for 1 minute.",
      "Add 1.5 cups water per cup of rice, add salt.",
      "Cover and cook on low heat for 15 minutes until water is absorbed.",
      "Fluff with a fork and serve."
    ]
  },
  {
    name: "Curd Rice",
    emoji: "🍚",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["South Indian", "Comfort", "Vegetarian"],
    ingredients: ["rice", "yogurt", "mustard seeds", "oil", "salt"],
    steps: [
      "Cook rice until soft. Let it cool slightly.",
      "Mash the rice a bit and mix in yogurt and salt.",
      "Heat a little oil in a small pan, add mustard seeds.",
      "When they splutter, pour the tempering over the curd rice.",
      "Mix well. Serve at room temperature or chilled."
    ]
  },
  {
    name: "Lemon Rice",
    emoji: "🍋",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["South Indian", "Lunch"],
    ingredients: ["rice", "lemon", "mustard seeds", "peanuts", "turmeric", "oil", "salt"],
    steps: [
      "Cook rice and spread it to cool.",
      "Heat oil, add mustard seeds until they splutter.",
      "Add peanuts and fry until golden.",
      "Add turmeric and salt, stir.",
      "Add cooled rice and mix gently.",
      "Squeeze lemon juice over and mix. Taste and adjust.",
      "Serve warm or at room temperature."
    ]
  },
  {
    name: "Rice Kheer",
    emoji: "🍮",
    time: "35 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Indian", "Dessert", "Sweet"],
    ingredients: ["rice", "milk", "sugar", "cardamom"],
    steps: [
      "Wash rice. Heat milk in a heavy-bottomed pot.",
      "Add rice when milk is hot. Stir frequently.",
      "Cook on low heat for 25 minutes, stirring every few minutes.",
      "When rice is very soft and milk thickened, add sugar.",
      "Add crushed cardamom. Stir and cook 5 more minutes.",
      "Serve warm or chilled."
    ]
  },
  {
    name: "Vegetable Pulao",
    emoji: "🌿",
    time: "25 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Indian", "Lunch", "Vegetarian"],
    ingredients: ["rice", "carrot", "onion", "peas", "cumin", "oil", "salt"],
    steps: [
      "Wash and soak rice for 15 minutes.",
      "Heat oil, add cumin seeds.",
      "Add sliced onions and cook until golden.",
      "Add diced carrots and peas. Stir for 2 minutes.",
      "Add drained rice, salt, and 1.5 cups water per cup of rice.",
      "Cover and cook on low for 15 minutes.",
      "Serve with raita or pickle."
    ]
  },

  // ── LENTILS ───────────────────────────────────────────────────
  {
    name: "Dal Tadka",
    emoji: "🍲",
    time: "30 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Indian", "Comfort", "Vegetarian"],
    ingredients: ["lentils", "onion", "tomato", "garlic", "cumin", "turmeric", "butter"],
    steps: [
      "Pressure cook lentils with turmeric and water (3 whistles) or boil for 25 min.",
      "Mash lentils slightly and set aside.",
      "Heat butter, add cumin seeds, then onion. Fry until golden.",
      "Add garlic and tomato, cook until oil separates.",
      "Pour the masala into the dal, mix well.",
      "Simmer 5 minutes. Adjust salt.",
      "Serve with rice or roti."
    ]
  },
  {
    name: "Masoor Dal",
    emoji: "🍲",
    time: "25 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Indian", "Vegetarian", "Quick"],
    ingredients: ["red lentils", "onion", "tomato", "garlic", "cumin", "turmeric", "oil"],
    steps: [
      "Wash red lentils. They cook fast — no soaking needed.",
      "Boil lentils in 2 cups water with turmeric until soft (15 min).",
      "Heat oil, add cumin, then onion, garlic, and tomato.",
      "Cook the masala for 8 minutes until thick.",
      "Add the cooked dal, season with salt.",
      "Simmer together 5 minutes. Serve hot."
    ]
  },
  {
    name: "Spinach Dal",
    emoji: "🌿",
    time: "30 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Indian", "Healthy", "Vegetarian"],
    ingredients: ["lentils", "spinach", "garlic", "cumin", "turmeric", "oil", "salt"],
    steps: [
      "Cook lentils until soft. Mash lightly.",
      "Heat oil, add cumin seeds, then garlic. Fry 1 minute.",
      "Add washed spinach and stir until wilted.",
      "Add cooked lentils, turmeric, and salt.",
      "Simmer together for 10 minutes.",
      "Serve with rice or roti."
    ]
  },

  // ── PASTA ────────────────────────────────────────────────────
  {
    name: "Pasta Aglio e Olio",
    emoji: "🍝",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Italian", "Vegetarian", "Quick"],
    ingredients: ["pasta", "garlic", "olive oil", "chili flakes", "salt"],
    steps: [
      "Boil pasta in salted water until al dente. Reserve half cup pasta water.",
      "Heat olive oil on low, add lots of sliced garlic.",
      "Cook garlic gently until golden (not burnt).",
      "Add chili flakes, then drained pasta.",
      "Toss, adding pasta water a splash at a time to make it saucy.",
      "Taste, adjust salt. Serve immediately."
    ]
  },
  {
    name: "Pasta with Tomato Sauce",
    emoji: "🍝",
    time: "25 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Italian", "Vegetarian"],
    ingredients: ["pasta", "tomato", "garlic", "olive oil", "oregano", "salt"],
    steps: [
      "Heat olive oil, add garlic and cook 1 minute.",
      "Add diced tomatoes, oregano, and salt.",
      "Simmer the sauce for 15 minutes until thick.",
      "Boil pasta in salted water, drain.",
      "Toss pasta with sauce.",
      "Serve hot."
    ]
  },
  {
    name: "Tuna Pasta",
    emoji: "🐟",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Quick", "Protein", "Pantry"],
    ingredients: ["pasta", "tuna", "garlic", "olive oil", "lemon", "salt"],
    steps: [
      "Boil pasta until cooked, drain.",
      "Heat olive oil, add garlic for 1 minute.",
      "Drain tuna and add to the pan, break it up.",
      "Add pasta, squeeze of lemon, salt and pepper.",
      "Toss well and serve."
    ]
  },
  {
    name: "Minestrone Soup",
    emoji: "🥣",
    time: "30 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Italian", "Soup", "Vegetarian"],
    ingredients: ["pasta", "tomato", "carrot", "onion", "garlic", "oil", "salt"],
    steps: [
      "Heat oil, cook onion and garlic until soft.",
      "Add diced carrot, cook 3 minutes.",
      "Add tomatoes, salt, and 4 cups water. Bring to boil.",
      "Simmer 10 minutes, then add pasta.",
      "Cook until pasta is done, about 10 more minutes.",
      "Taste, adjust seasoning. Serve hot."
    ]
  },

  // ── POTATO ───────────────────────────────────────────────────
  {
    name: "Aloo Sabzi",
    emoji: "🥔",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Indian", "Vegetarian", "Side dish"],
    ingredients: ["potato", "onion", "cumin", "turmeric", "oil", "salt"],
    steps: [
      "Peel and cube potatoes. Chop onion.",
      "Heat oil, add cumin seeds until they sizzle.",
      "Add onion and cook until translucent.",
      "Add potatoes, turmeric, and salt. Mix well.",
      "Cover and cook on medium-low heat for 15 minutes, stirring occasionally.",
      "Serve with roti or as a side."
    ]
  },
  {
    name: "Mashed Potato",
    emoji: "🥔",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Western", "Comfort", "Side dish"],
    ingredients: ["potato", "butter", "milk", "salt", "pepper"],
    steps: [
      "Peel and cube potatoes, boil in salted water until fork-tender.",
      "Drain well and return to the pot.",
      "Add butter and mash thoroughly.",
      "Warm milk slightly and add while mashing to desired creaminess.",
      "Season with salt and pepper. Serve hot."
    ]
  },
  {
    name: "Potato Soup",
    emoji: "🥣",
    time: "25 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Western", "Soup", "Comfort"],
    ingredients: ["potato", "onion", "garlic", "milk", "butter", "salt", "pepper"],
    steps: [
      "Melt butter, cook onion and garlic until soft.",
      "Add cubed potatoes and enough water to cover. Simmer 15 min.",
      "When potatoes are soft, blend or mash until smooth.",
      "Stir in milk, season with salt and pepper.",
      "Heat gently and serve hot."
    ]
  },

  // ── BREAD ────────────────────────────────────────────────────
  {
    name: "Garlic Bread",
    emoji: "🥖",
    time: "10 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Western", "Snack", "Quick"],
    ingredients: ["bread", "butter", "garlic", "salt"],
    steps: [
      "Mix softened butter with minced garlic and a pinch of salt.",
      "Spread generously on bread slices.",
      "Toast in oven at 200°C for 5-7 minutes until golden.",
      "Alternatively, pan-toast on a dry pan until crispy.",
      "Serve immediately."
    ]
  },
  {
    name: "Grilled Cheese Sandwich",
    emoji: "🥪",
    time: "10 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Western", "Comfort", "Quick"],
    ingredients: ["bread", "cheese", "butter"],
    steps: [
      "Butter one side of each bread slice.",
      "Place cheese between the unbuttered sides.",
      "Heat a pan over medium heat.",
      "Place sandwich butter-side down. Cook 2-3 min until golden.",
      "Flip and cook the other side until cheese melts.",
      "Cut diagonally and serve hot."
    ]
  },
  {
    name: "Bread Upma",
    emoji: "🍞",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Indian", "Breakfast", "Leftover"],
    ingredients: ["bread", "onion", "tomato", "mustard seeds", "oil", "salt"],
    steps: [
      "Cut bread into small cubes.",
      "Heat oil, add mustard seeds until they splutter.",
      "Add onion and fry until translucent.",
      "Add tomato and salt. Cook until tomato is soft.",
      "Add bread cubes and toss everything together.",
      "Stir fry for 2-3 minutes until bread absorbs the flavors.",
      "Serve hot with ketchup or chutney."
    ]
  },

  // ── FLOUR ────────────────────────────────────────────────────
  {
    name: "Roti / Chapati",
    emoji: "🫓",
    time: "20 min",
    difficulty: "Medium",
    servings: 4,
    tags: ["Indian", "Staple", "Vegetarian"],
    ingredients: ["flour", "water", "oil", "salt"],
    steps: [
      "Mix flour and salt. Add water gradually and knead into a soft dough.",
      "Add a little oil and knead until smooth. Rest 10 minutes.",
      "Divide into small balls. Roll each one into a thin circle.",
      "Heat a tawa or flat pan on high heat.",
      "Cook each roti 30-40 seconds per side, pressing with a cloth.",
      "Apply ghee or butter while hot. Stack and serve."
    ]
  },
  {
    name: "Banana Pancakes",
    emoji: "🥞",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Breakfast", "Sweet", "Healthy"],
    ingredients: ["banana", "eggs", "flour", "sugar"],
    steps: [
      "Mash 2 ripe bananas in a bowl.",
      "Add eggs and whisk together.",
      "Add flour and sugar, mix into a smooth batter.",
      "Heat a non-stick pan, pour small rounds of batter.",
      "Cook 2 min each side until golden.",
      "Serve with honey or fruit."
    ]
  },

  // ── BANANA ───────────────────────────────────────────────────
  {
    name: "Banana Oats Smoothie",
    emoji: "🥤",
    time: "5 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Breakfast", "Healthy", "No-cook"],
    ingredients: ["banana", "oats", "milk"],
    steps: [
      "Add banana, oats, and milk to a blender.",
      "Blend until completely smooth.",
      "Add honey or sugar if desired.",
      "Pour into a glass and drink immediately."
    ]
  },
  {
    name: "Yogurt Banana Bowl",
    emoji: "🍌",
    time: "5 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Breakfast", "No-cook", "Healthy"],
    ingredients: ["yogurt", "banana", "oats", "honey"],
    steps: [
      "Scoop yogurt into a bowl.",
      "Slice banana on top.",
      "Sprinkle oats for crunch.",
      "Drizzle honey over everything.",
      "Eat immediately."
    ]
  },

  // ── CHICKPEAS ────────────────────────────────────────────────
  {
    name: "Chana Masala",
    emoji: "🍛",
    time: "30 min",
    difficulty: "Medium",
    servings: 3,
    tags: ["Indian", "Protein", "Vegetarian"],
    ingredients: ["chickpeas", "onion", "tomato", "garlic", "garam masala", "cumin", "oil"],
    steps: [
      "Canned chickpeas work great — just drain and rinse.",
      "Heat oil, add cumin seeds, then onion. Cook until dark golden.",
      "Add garlic and garam masala. Stir 1 minute.",
      "Add tomatoes, cook until thick and oil separates (10 min).",
      "Add chickpeas and half cup water. Mash a few chickpeas to thicken.",
      "Simmer 10 minutes. Adjust salt.",
      "Serve with puri, roti, or rice."
    ]
  },

  // ── OATS ─────────────────────────────────────────────────────
  {
    name: "Oats Porridge",
    emoji: "🥣",
    time: "8 min",
    difficulty: "Easy",
    servings: 1,
    tags: ["Breakfast", "Healthy", "Quick"],
    ingredients: ["oats", "milk", "sugar"],
    steps: [
      "Add oats and milk to a pot in a 1:2 ratio.",
      "Heat on medium, stirring frequently.",
      "Cook 5 minutes until thick and creamy.",
      "Add sugar, stir.",
      "Pour into a bowl. Top with banana slices or nuts if available."
    ]
  },

  // ── YOGURT / RAITA ────────────────────────────────────────────
  {
    name: "Cucumber Raita",
    emoji: "🥒",
    time: "5 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Indian", "Side dish", "No-cook"],
    ingredients: ["yogurt", "cucumber", "cumin", "salt"],
    steps: [
      "Grate or finely dice cucumber. Squeeze out excess water.",
      "Mix into yogurt with salt and roasted cumin powder.",
      "Chill for 5 minutes if possible.",
      "Serve as a side with rice, roti, or biryani."
    ]
  },

  // ── TOMATO DISHES ─────────────────────────────────────────────
  {
    name: "Tomato Soup",
    emoji: "🍅",
    time: "25 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Soup", "Comfort", "Vegetarian"],
    ingredients: ["tomato", "onion", "garlic", "butter", "salt", "pepper"],
    steps: [
      "In a pot, melt butter, cook onion and garlic until soft.",
      "Add tomatoes and 1 cup water. Simmer 10 minutes.",
      "Blend until smooth.",
      "Season with salt and pepper. Simmer 5 more minutes.",
      "Serve with garlic bread."
    ]
  },
  {
    name: "Tomato Chutney",
    emoji: "🌶️",
    time: "20 min",
    difficulty: "Easy",
    servings: 4,
    tags: ["Indian", "Condiment", "Side"],
    ingredients: ["tomato", "onion", "garlic", "chili", "oil", "salt"],
    steps: [
      "Heat oil, add chopped garlic and chili. Fry 1 minute.",
      "Add onion, cook until golden.",
      "Add tomatoes and salt. Cook on medium heat until thick.",
      "Mash or blend to your preferred texture.",
      "Serve with idli, dosa, roti or rice."
    ]
  },

  // ── VEGETABLES ────────────────────────────────────────────────
  {
    name: "Vegetable Soup",
    emoji: "🥕",
    time: "30 min",
    difficulty: "Easy",
    servings: 3,
    tags: ["Healthy", "Soup", "Comfort"],
    ingredients: ["carrot", "potato", "onion", "garlic", "salt", "pepper", "oil"],
    steps: [
      "Dice all vegetables into similar-sized pieces.",
      "Heat oil, cook onion and garlic until soft.",
      "Add carrots and potatoes, stir for 2 minutes.",
      "Add 4 cups water, salt and pepper. Bring to boil.",
      "Simmer 20 minutes until vegetables are tender.",
      "Blend half for a creamier consistency or serve as is."
    ]
  },
  {
    name: "Stir Fried Cabbage",
    emoji: "🥬",
    time: "12 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["Asian", "Healthy", "Quick"],
    ingredients: ["cabbage", "garlic", "soy sauce", "oil", "chili"],
    steps: [
      "Shred cabbage thinly.",
      "Heat oil in a wok or large pan on high heat.",
      "Add garlic and chili, stir fry 30 seconds.",
      "Add cabbage and toss quickly for 3-4 minutes.",
      "Drizzle soy sauce, toss once more.",
      "Serve while still slightly crisp."
    ]
  },

  // ── SEMOLINA ─────────────────────────────────────────────────
  {
    name: "Upma",
    emoji: "🫙",
    time: "20 min",
    difficulty: "Easy",
    servings: 2,
    tags: ["South Indian", "Breakfast"],
    ingredients: ["semolina", "onion", "mustard seeds", "oil", "salt"],
    steps: [
      "Dry roast semolina in a pan until light golden. Set aside.",
      "Heat oil, add mustard seeds until they pop.",
      "Add onion and cook until soft.",
      "Add 2 cups water and salt. Bring to a boil.",
      "Add roasted semolina while stirring continuously.",
      "Cook on low heat 3-4 minutes, stirring, until thick.",
      "Serve hot with chutney."
    ]
  },

  // ── PEANUT ───────────────────────────────────────────────────
  {
    name: "Peanut Chutney",
    emoji: "🥜",
    time: "10 min",
    difficulty: "Easy",
    servings: 4,
    tags: ["South Indian", "Condiment", "Quick"],
    ingredients: ["peanuts", "garlic", "chili", "oil", "salt"],
    steps: [
      "Dry roast peanuts until golden, let cool.",
      "Blend peanuts with garlic, chili, salt and a little water.",
      "Blend until smooth or slightly chunky.",
      "Heat oil, add mustard seeds if available, pour over chutney.",
      "Serve with idli, dosa, or as a dip."
    ]
  }

];
