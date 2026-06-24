import { getRecipeById, recipes, Recipe } from '@/lib/recipes'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, ChefHat, Edit } from 'lucide-react'
import RecipeRating from '@/components/RecipeRating'

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    id: recipe.id,
  }))
}

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id)

  if (!recipe) {
    return (
      <div className="min-h-screen bg-darker text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-primary hover:bg-secondary rounded-lg transition-colors"
          >
            Go Back
          </Link>
        </div>
      </div>
    )
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </Link>
          <Link
            href={`/edit-recipe/${recipe.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Recipe
          </Link>
        </div>
      </header>

      {/* Recipe Hero */}
      <div className="relative h-96">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-7xl mx-auto">
          <span className={`inline-block px-3 py-1 rounded-full text-sm mb-3 ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{recipe.title}</h1>
          <p className="text-xl text-gray-300 mb-4">{recipe.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Prep: {recipe.prepTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Cook: {recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-primary" />
              <span>{recipe.category}</span>
            </div>
          </div>
          <div className="mt-4">
            <RecipeRating recipeId={recipe.id} />
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-primary" />
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-dark border border-gray-800"
                >
                  <div className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-gray-400">{index + 1}</span>
                  </div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Instructions
            </h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-dark border border-gray-800"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark/50 border-t border-gray-800 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Recipe Manager. Your cooking companion.</p>
        </div>
      </footer>
    </main>
  )
}
