export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  prepTime: number
  cookTime: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  ingredients: string[]
  instructions: string[]
  tags: string[]
  rating?: number
  ratingCount?: number
}

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    category: 'Italian',
    ingredients: [
      '400g spaghetti',
      '200g pancetta or guanciale',
      '4 large eggs',
      '100g Pecorino Romano cheese',
      'Black pepper',
      'Salt'
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
      'While pasta cooks, cut pancetta into small cubes and cook in a large pan until crispy.',
      'In a bowl, whisk together eggs, grated Pecorino, and plenty of black pepper.',
      'Drain pasta, reserving some cooking water. Add hot pasta to the pancetta pan.',
      'Remove from heat and quickly add egg mixture, tossing constantly to create a creamy sauce.',
      'Add pasta water if needed for consistency. Serve immediately with extra cheese.'
    ],
    tags: ['pasta', 'italian', 'quick', 'dinner']
  },
  {
    id: '2',
    title: 'Thai Green Curry',
    description: 'A fragrant and spicy Thai curry with vegetables and coconut milk.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    category: 'Thai',
    ingredients: [
      '400ml coconut milk',
      '2 tbsp green curry paste',
      '500g chicken breast',
      '1 cup bamboo shoots',
      '1 bell pepper',
      'Thai basil leaves',
      'Fish sauce',
      'Palm sugar'
    ],
    instructions: [
      'Heat 1/4 cup of coconut milk in a wok until it starts to separate.',
      'Add curry paste and stir-fry until fragrant, about 2 minutes.',
      'Add chicken and cook until lightly browned.',
      'Pour in remaining coconut milk and bring to a simmer.',
      'Add bamboo shoots and bell pepper, cook for 10 minutes.',
      'Season with fish sauce and palm sugar to taste.',
      'Garnish with Thai basil and serve with jasmine rice.'
    ],
    tags: ['thai', 'curry', 'spicy', 'dinner']
  },
  {
    id: '3',
    title: 'Classic Caesar Salad',
    description: 'Crisp romaine lettuce with homemade Caesar dressing, croutons, and parmesan.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    category: 'Salad',
    ingredients: [
      '1 head romaine lettuce',
      '2 anchovy fillets',
      '2 cloves garlic',
      '1 egg yolk',
      '2 tbsp lemon juice',
      '1 tsp Dijon mustard',
      '100ml olive oil',
      'Parmesan cheese',
      'Croutons'
    ],
    instructions: [
      'Make the dressing: Mash anchovies and garlic into a paste.',
      'Whisk in egg yolk, lemon juice, and Dijon mustard.',
      'Slowly drizzle in olive oil while whisking to emulsify.',
      'Season with salt and pepper.',
      'Chop romaine lettuce and toss with dressing.',
      'Top with croutons and shaved parmesan.',
      'Serve immediately.'
    ],
    tags: ['salad', 'healthy', 'quick', 'lunch']
  },
  {
    id: '4',
    title: 'Beef Tacos',
    description: 'Delicious homemade beef tacos with fresh toppings and warm tortillas.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    category: 'Mexican',
    ingredients: [
      '500g ground beef',
      '1 onion, diced',
      '2 cloves garlic, minced',
      '2 tsp cumin',
      '1 tsp chili powder',
      '8 corn tortillas',
      'Lettuce, diced',
      'Tomatoes, diced',
      'Cheese, shredded',
      'Sour cream'
    ],
    instructions: [
      'Brown the ground beef in a large skillet over medium-high heat.',
      'Add onion and garlic, cook until softened.',
      'Season with cumin, chili powder, salt, and pepper.',
      'Warm tortillas in a dry pan or microwave.',
      'Assemble tacos with beef and desired toppings.',
      'Serve with lime wedges and hot sauce.'
    ],
    tags: ['mexican', 'tacos', 'quick', 'dinner']
  },
  {
    id: '5',
    title: 'Chocolate Lava Cake',
    description: 'Decadent chocolate cake with a molten center, perfect for dessert lovers.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: 'Medium',
    category: 'Dessert',
    ingredients: [
      '200g dark chocolate',
      '100g butter',
      '2 eggs',
      '2 egg yolks',
      '50g sugar',
      '30g flour',
      'Cocoa powder for dusting',
      'Vanilla ice cream for serving'
    ],
    instructions: [
      'Preheat oven to 220°C (425°F). Grease 4 ramekins and dust with cocoa.',
      'Melt chocolate and butter together, stir until smooth.',
      'Whisk eggs, egg yolks, and sugar until thick and pale.',
      'Fold chocolate mixture into eggs, then fold in flour.',
      'Divide batter among ramekins.',
      'Bake for 12 minutes until edges are firm but center is soft.',
      'Let cool 1 minute, then invert onto plates.',
      'Serve immediately with vanilla ice cream.'
    ],
    tags: ['dessert', 'chocolate', 'baking', 'sweet']
  },
  {
    id: '6',
    title: 'Vegetable Stir Fry',
    description: 'Quick and healthy vegetable stir fry with a savory sauce.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    category: 'Asian',
    ingredients: [
      '2 cups mixed vegetables (broccoli, carrots, bell peppers)',
      '2 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tsp sesame oil',
      '2 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 tbsp vegetable oil',
      'Green onions for garnish'
    ],
    instructions: [
      'Prepare all vegetables by cutting into bite-sized pieces.',
      'Mix soy sauce, oyster sauce, and sesame oil in a small bowl.',
      'Heat vegetable oil in a wok over high heat.',
      'Add garlic and ginger, stir-fry for 30 seconds.',
      'Add vegetables and stir-fry for 5-7 minutes until crisp-tender.',
      'Pour in sauce and toss to coat.',
      'Garnish with green onions and serve over rice.'
    ],
    tags: ['vegetarian', 'healthy', 'quick', 'asian']
  }
]

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id)
}

export const searchRecipes = (query: string): Recipe[] => {
  const lowerQuery = query.toLowerCase()
  return recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(lowerQuery) ||
    recipe.description.toLowerCase().includes(lowerQuery) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery)) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export const filterByCategory = (category: string): Recipe[] => {
  if (category === 'All') return recipes
  return recipes.filter(recipe => recipe.category === category)
}

export const filterByIngredients = (ingredients: string[]): Recipe[] => {
  if (ingredients.length === 0) return recipes
  return recipes.filter(recipe =>
    ingredients.some(ing =>
      recipe.ingredients.some(recipeIng =>
        recipeIng.toLowerCase().includes(ing.toLowerCase())
      )
    )
  )
}

// LocalStorage helpers
const STORAGE_KEY = 'recipe_manager_recipes'
const FAVORITES_KEY = 'recipe_manager_favorites'

export const getStoredRecipes = (): Recipe[] => {
  if (typeof window === 'undefined') return recipes
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : recipes
  } catch {
    return recipes
  }
}

export const saveRecipe = (recipe: Recipe): void => {
  if (typeof window === 'undefined') return
  try {
    const currentRecipes = getStoredRecipes()
    const index = currentRecipes.findIndex(r => r.id === recipe.id)
    if (index >= 0) {
      currentRecipes[index] = recipe
    } else {
      currentRecipes.push(recipe)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentRecipes))
  } catch (error) {
    console.error('Failed to save recipe:', error)
  }
}

export const deleteRecipe = (id: string): void => {
  if (typeof window === 'undefined') return
  try {
    const currentRecipes = getStoredRecipes()
    const filtered = currentRecipes.filter(r => r.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to delete recipe:', error)
  }
}

export const getStoredFavorites = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const toggleFavorite = (id: string): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const favorites = getStoredFavorites()
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
    return newFavorites
  } catch (error) {
    console.error('Failed to toggle favorite:', error)
    return []
  }
}

// Rating helpers
const RATINGS_KEY = 'recipe_manager_ratings'

export const getStoredRatings = (): Record<string, number> => {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(RATINGS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export const setRecipeRating = (recipeId: string, rating: number): void => {
  if (typeof window === 'undefined') return
  try {
    const ratings = getStoredRatings()
    ratings[recipeId] = rating
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
  } catch (error) {
    console.error('Failed to save rating:', error)
  }
}

export const getRecipeRating = (recipeId: string): number => {
  const ratings = getStoredRatings()
  return ratings[recipeId] || 0
}
