"use client"

import { motion } from "framer-motion"
import { useQuizStore, type Category } from "@/lib/store"
import { ArrowLeft, Search, Star, Users, ChevronRight } from "lucide-react"

const allCategories: { id: Category; name: string; icon: string; bg: string; description: string; quizzes: number; players: string }[] = [
  { id: 'science', name: 'Science', icon: '🔬', bg: '#E0F2FE', description: 'Physics, Chemistry, Biology', quizzes: 24, players: '12.5k' },
  { id: 'technology', name: 'Technology', icon: '💻', bg: '#F3E8FF', description: 'Programming, AI, Gadgets', quizzes: 18, players: '8.3k' },
  { id: 'mathematics', name: 'Mathematics', icon: '📐', bg: '#FEF3C7', description: 'Algebra, Geometry, Calculus', quizzes: 15, players: '6.2k' },
  { id: 'sports', name: 'Sports', icon: '⚽', bg: '#D1FAE5', description: 'Football, Basketball, Olympics', quizzes: 21, players: '15.8k' },
  { id: 'movies', name: 'Movies & TV', icon: '🎬', bg: '#FEE2E2', description: 'Hollywood, Classics, Series', quizzes: 30, players: '22.1k' },
  { id: 'general', name: 'General Knowledge', icon: '🌍', bg: '#E0E7FF', description: 'Geography, History, Culture', quizzes: 45, players: '31.4k' },
]

export function CategoriesScreen() {
  const { setScreen, selectCategory } = useQuizStore()

  const handleCategorySelect = (categoryId: Category) => {
    selectCategory(categoryId)
    setScreen('quiz-start')
  }

  return (
    <div className="min-h-full pb-6 bg-[#FFFBF5]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FFFBF5]/95 backdrop-blur-sm px-5 pt-4 pb-3">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-center shadow-card"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A2E]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Categories</h1>
            <p className="text-sm text-[#6B7280]">Choose your topic</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full py-3 pl-12 pr-4 rounded-xl bg-white border border-[#E8E2DC] focus:border-[#FF6B35] outline-none transition-all text-sm shadow-card"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="px-5 pt-4 space-y-3">
        {allCategories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => handleCategorySelect(cat.id)}
            className="w-full p-4 rounded-2xl bg-white border border-[#E8E2DC] shadow-card flex items-center gap-4 hover:border-[#FF6B35]/50 active:scale-[0.98] transition-all"
          >
            {/* Icon */}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: cat.bg }}
            >
              {cat.icon}
            </div>
            
            {/* Info */}
            <div className="flex-1 text-left">
              <h3 className="font-bold text-[#1A1A2E]">{cat.name}</h3>
              <p className="text-sm text-[#6B7280] mb-1">{cat.description}</p>
              <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#F59E0B]" />
                  {cat.quizzes} quizzes
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#FF6B35]" />
                  {cat.players}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-lg bg-[#F5F0EB] flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-[#6B7280]" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
