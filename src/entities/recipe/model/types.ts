export interface Recipe {
  id: string
  title: string
  emoji: string
  calories: number
  protein: number
  cookTime: number        // minutes
  ingredients: string[]   // ingredient names
  tag?: string
}
