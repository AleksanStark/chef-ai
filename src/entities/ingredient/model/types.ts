export interface Ingredient {
  id: string
  emoji: string
  label: string
  category?: 'protein' | 'veggie' | 'dairy' | 'grain' | 'other'
}
