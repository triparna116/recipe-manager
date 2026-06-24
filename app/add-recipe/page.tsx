'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, X, AlertCircle, Upload } from 'lucide-react'
import Link from 'next/link'
import { saveRecipe, Recipe } from '@/lib/recipes'

export default function AddRecipe() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    category: 'Italian',
    ingredients: [''],
    instructions: [''],
    tags: ['']
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    // Update image preview when URL changes
    if (name === 'image') {
      setImagePreview(value)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setFormData(prev => ({ ...prev, image: base64 }))
        setImagePreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleArrayChange = (index: number, field: 'ingredients' | 'instructions' | 'tags', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'ingredients' | 'instructions' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (index: number, field: 'ingredients' | 'instructions' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (formData.prepTime < 1) {
      newErrors.prepTime = 'Prep time must be at least 1 minute'
    }
    if (formData.cookTime < 1) {
      newErrors.cookTime = 'Cook time must be at least 1 minute'
    }
    if (formData.servings < 1) {
      newErrors.servings = 'Servings must be at least 1'
    }
    const validIngredients = formData.ingredients.filter(i => i.trim())
    if (validIngredients.length === 0) {
      newErrors.ingredients = 'At least one ingredient is required'
    }
    const validInstructions = formData.instructions.filter(i => i.trim())
    if (validInstructions.length === 0) {
      newErrors.instructions = 'At least one instruction step is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Filter out empty items
    const cleanData: Recipe = {
      id: Date.now().toString(),
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim()),
      instructions: formData.instructions.filter(i => i.trim()),
      tags: formData.tags.filter(t => t.trim())
    }

    // Save to localStorage
    saveRecipe(cleanData)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    setIsSubmitting(false)
    router.push('/')
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
          <h1 className="text-xl font-bold">Add New Recipe</h1>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Info */}
          <div className="bg-dark p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipe Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-darker border rounded-lg focus:outline-none focus:border-primary ${
                    errors.title ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="e.g., Classic Spaghetti Carbonara"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 bg-darker border rounded-lg focus:outline-none focus:border-primary ${
                    errors.description ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Brief description of your recipe"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Recipe Image</label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 bg-darker border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Or paste image URL..."
                    />
                    <label className="px-4 py-3 bg-darker border border-gray-700 rounded-lg hover:border-primary cursor-pointer flex items-center gap-2 transition-colors">
                      <Upload className="w-5 h-5" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-700">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, image: '' }))
                          setImagePreview('')
                        }}
                        className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Time & Servings */}
          <div className="bg-dark p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Time & Servings</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Prep Time (minutes)</label>
                <input
                  type="number"
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-4 py-3 bg-darker border rounded-lg focus:outline-none focus:border-primary ${
                    errors.prepTime ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.prepTime && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.prepTime}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cook Time (minutes)</label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-4 py-3 bg-darker border rounded-lg focus:outline-none focus:border-primary ${
                    errors.cookTime ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.cookTime && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cookTime}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Servings</label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  min="1"
                  className={`w-full px-4 py-3 bg-darker border rounded-lg focus:outline-none focus:border-primary ${
                    errors.servings ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {errors.servings && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.servings}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category & Difficulty */}
          <div className="bg-dark p-6 rounded-xl border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Category & Difficulty</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="Italian">Italian</option>
                  <option value="Thai">Thai</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian">Asian</option>
                  <option value="Salad">Salad</option>
                  <option value="Dessert">Dessert</option>
                  <option value="American">American</option>
                  <option value="Indian">Indian</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-darker border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-dark p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Ingredients</h2>
              <button
                type="button"
                onClick={() => addArrayItem('ingredients')}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
              </button>
            </div>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
                    className={`flex-1 px-4 py-3 bg-darker border rounded-lg focus:outline-none focus:border-primary ${
                      errors.ingredients && index === 0 ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder={`Ingredient ${index + 1}`}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'ingredients')}
                      className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {errors.ingredients && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.ingredients}
                </p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-dark p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Instructions</h2>
              <button
                type="button"
                onClick={() => addArrayItem('instructions')}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
            <div className="space-y-3">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-3">
                    <span className="font-bold text-sm">{index + 1}</span>
                  </div>
                  <textarea
                    value={instruction}
                    onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)}
                    rows={2}
                    className={`flex-1 px-4 py-3 bg-darker border rounded-lg focus:outline-none focus:border-primary ${
                      errors.instructions && index === 0 ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder={`Step ${index + 1}`}
                  />
                  {formData.instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'instructions')}
                      className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {errors.instructions && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.instructions}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-dark p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Tags</h2>
              <button
                type="button"
                onClick={() => addArrayItem('tags')}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayChange(index, 'tags', e.target.value)}
                    className="px-4 py-2 bg-darker border border-gray-700 rounded-lg focus:outline-none focus:border-primary w-40"
                    placeholder="tag"
                  />
                  {formData.tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'tags')}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-primary hover:bg-secondary rounded-xl font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Recipe'
              )}
            </button>
            <Link
              href="/"
              className="px-8 py-4 bg-dark border border-gray-700 rounded-xl font-semibold text-lg hover:border-gray-600 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </motion.form>
      </div>
    </main>
  )
}
