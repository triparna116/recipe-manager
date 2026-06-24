'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, Users, ChefHat, Heart, Filter, Plus } from 'lucide-react'
import { getStoredRecipes, searchRecipes, filterByCategory, filterByIngredients, getStoredFavorites, toggleFavorite as toggleFavoriteStorage, Recipe } from '@/lib/recipes'
import Link from 'next/link'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [ingredientSearch, setIngredientSearch] = useState('')
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const categories = ['All', 'Italian', 'Thai', 'Salad', 'Mexican', 'Dessert', 'Asian', 'American', 'Indian', 'Other']

  useEffect(() => {
    setAllRecipes(getStoredRecipes())
    setFavorites(getStoredFavorites())
  }, [])

  useEffect(() => {
    let result = allRecipes

    if (searchQuery) {
      result = searchRecipes(searchQuery)
    }

    if (selectedCategory !== 'All') {
      result = result.filter(r => r.category === selectedCategory)
    }

    if (ingredientSearch) {
      result = filterByIngredients([ingredientSearch])
    }

    if (showFavoritesOnly) {
      result = result.filter(r => favorites.includes(r.id))
    }

    setFilteredRecipes(result)
  }, [searchQuery, selectedCategory, ingredientSearch, allRecipes, favorites, showFavoritesOnly])

  const handleToggleFavorite = (id: string) => {
    const newFavorites = toggleFavoriteStorage(id)
    setFavorites(newFavorites)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'Hard': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <main className="min-h-screen bg-darker text-white">
      {/* Header */}
      <header className="bg-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">Recipe Manager</h1>
            </div>
            <Link
              href="/add-recipe"
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Recipe
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-transparent py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Delicious Recipes
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Find, save, and organize your favorite recipes all in one place
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes by name, ingredient, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-dark border border-gray-700 rounded-xl focus:outline-none focus:border-primary text-lg"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 space-y-4"
            >
              {/* Category Filter */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-dark text-gray-400 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingredient Search */}
              <div className="max-w-md mx-auto">
                <label className="block text-sm text-gray-400 mb-2">Search by Ingredient</label>
                <input
                  type="text"
                  placeholder="e.g., chicken, tomato, garlic..."
                  value={ingredientSearch}
                  onChange={(e) => setIngredientSearch(e.target.value)}
                  className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">
            {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !showFavoritesOnly
                  ? 'bg-primary text-white'
                  : 'bg-dark border border-gray-700 hover:border-primary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setShowFavoritesOnly(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showFavoritesOnly
                  ? 'bg-primary text-white'
                  : 'bg-dark border border-gray-700 hover:border-primary'
              }`}
            >
              Favorites ({favorites.length})
            </button>
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No recipes found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark rounded-xl overflow-hidden border border-gray-800 hover:border-primary transition-all hover:scale-105 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => handleToggleFavorite(recipe.id)}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                  </button>
                  <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-sm text-primary font-medium">{recipe.category}</span>
                  <h4 className="text-xl font-semibold mt-1 mb-2">{recipe.title}</h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{recipe.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/recipe/${recipe.id}`}
                    className="block w-full py-2 text-center bg-primary hover:bg-secondary rounded-lg transition-colors font-medium"
                  >
                    View Recipe
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-dark/50 border-t border-gray-800 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Recipe Manager. Your cooking companion.</p>
        </div>
      </footer>
    </main>
  )
}
