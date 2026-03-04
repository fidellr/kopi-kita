import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatRelativeDate(date: Date | string) {
  const now = new Date()
  const d = new Date(date)
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(date)
}

export function aggregateTags(customers: Array<{ tags: string[] }>) {
  const counts: Record<string, number> = {}
  customers.forEach(c => {
    c.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1
    })
  })
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as Record<string, number>)
}

export function getTopDrinks(customers: Array<{ favoriteDrink?: string | null }>) {
  const counts: Record<string, number> = {}
  customers.forEach(c => {
    if (c.favoriteDrink) {
      counts[c.favoriteDrink] = (counts[c.favoriteDrink] || 0) + 1
    }
  })
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([drink, count]) => ({ drink, count }))
}

const TAG_COLORS: Record<string, string> = {
  'sweet drinks': 'bg-pink-100 text-pink-800 border-pink-200',
  'caramel': 'bg-amber-100 text-amber-800 border-amber-200',
  'oat milk': 'bg-green-100 text-green-800 border-green-200',
  'pastry lover': 'bg-orange-100 text-orange-800 border-orange-200',
  'black coffee': 'bg-stone-100 text-stone-800 border-stone-200',
  'cold brew': 'bg-blue-100 text-blue-800 border-blue-200',
  'workshop': 'bg-purple-100 text-purple-800 border-purple-200',
  'latte': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'matcha': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'health conscious': 'bg-teal-100 text-teal-800 border-teal-200',
  'extra ice': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'morning buyer': 'bg-rose-100 text-rose-800 border-rose-200',
  'latte art': 'bg-violet-100 text-violet-800 border-violet-200',
}

const DEFAULT_TAG_COLOR = 'bg-gray-100 text-gray-700 border-gray-200'

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] || DEFAULT_TAG_COLOR
}

export const ALL_TAGS = [
  'sweet drinks',
  'caramel',
  'oat milk',
  'pastry lover',
  'black coffee',
  'cold brew',
  'workshop',
  'latte',
  'matcha',
  'health conscious',
  'extra ice',
  'morning buyer',
  'latte art',
  'espresso',
  'cappuccino',
  'vanilla',
  'mocha',
  'non-coffee',
  'specialty coffee',
]
