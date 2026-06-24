'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { getRecipeRating, setRecipeRating } from '@/lib/recipes'

interface RecipeRatingProps {
  recipeId: string
}

export default function RecipeRating({ recipeId }: RecipeRatingProps) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    setRating(getRecipeRating(recipeId))
  }, [recipeId])

  const handleRating = (value: number) => {
    setRating(value)
    setRecipeRating(recipeId, value)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-1 transition-transform hover:scale-110"
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hover || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-400">
        {rating > 0 ? `${rating}/5` : 'Not rated'}
      </span>
    </div>
  )
}
