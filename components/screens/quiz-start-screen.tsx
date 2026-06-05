"use client"

import { motion } from "framer-motion"
import { useQuizStore, type Difficulty } from "@/lib/store"
import { Mascot } from "../mascot"
import { ArrowLeft, Clock, Target, Trophy, Zap, Play } from "lucide-react"

const categoryInfo: Record<string, { name: string; icon: string; bg: string }> = {
  science: { name: 'Science', icon: '🔬', bg: '#E0F2FE' },
  technology: { name: 'Technology', icon: '💻', bg: '#F3E8FF' },
  mathematics: { name: 'Mathematics', icon: '📐', bg: '#FEF3C7' },
  sports: { name: 'Sports', icon: '⚽', bg: '#D1FAE5' },
  movies: { name: 'Movies', icon: '🎬', bg: '#FEE2E2' },
  general: { name: 'General', icon: '🌍', bg: '#E0E7FF' },
}

const difficulties: { id: Difficulty; name: string; description: string; xpMultiplier: number; color: string; bg: string }[] = [
  { id: 'easy', name: 'Easy', description: 'Perfect for beginners', xpMultiplier: 1, color: '#10B981', bg: '#D1FAE5' },
  { id: 'medium', name: 'Medium', description: 'A balanced challenge', xpMultiplier: 1.5, color: '#F59E0B', bg: '#FEF3C7' },
  { id: 'hard', name: 'Hard', description: 'For quiz masters', xpMultiplier: 2, color: '#EF4444', bg: '#FEE2E2' },
]

export function QuizStartScreen() {
  const { setScreen, selectedCategory, selectedDifficulty, setDifficulty, startQuiz } = useQuizStore()
  
  const category = selectedCategory ? categoryInfo[selectedCategory] : { name: 'Random Mix', icon: '🎲', bg: '#FFF0E5' }

  return (
    <div className="min-h-full pb-6 flex flex-col bg-[#FFFBF5]">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-center shadow-card"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A2E]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Quiz Setup</h1>
            <p className="text-sm text-[#6B7280]">Choose your settings</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 flex flex-col">
        {/* Category Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div 
            className="rounded-2xl p-5 border border-[#E8E2DC]"
            style={{ backgroundColor: category.bg }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center text-3xl">
                {category.icon}
              </div>
              <div className="flex-1">
                <p className="text-[#6B7280] text-sm">Category</p>
                <h2 className="text-[#1A1A2E] text-xl font-bold">{category.name}</h2>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>5 Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>30s each</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Difficulty Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <h3 className="text-base font-bold text-[#1A1A2E] mb-3">Select Difficulty</h3>
          <div className="space-y-3">
            {difficulties.map((diff, i) => (
              <motion.button
                key={diff.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                onClick={() => setDifficulty(diff.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedDifficulty === diff.id 
                    ? 'bg-white shadow-card' 
                    : 'bg-white/50 border-transparent'
                }`}
                style={{ 
                  borderColor: selectedDifficulty === diff.id ? diff.color : 'transparent'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: diff.bg }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: diff.color }}
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-[#1A1A2E]">{diff.name}</h4>
                      <p className="text-xs text-[#6B7280]">{diff.description}</p>
                    </div>
                  </div>
                  <div 
                    className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg"
                    style={{ backgroundColor: diff.bg, color: diff.color }}
                  >
                    <Zap className="w-3 h-3" />
                    <span>{diff.xpMultiplier}x</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Rewards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-5"
        >
          <div className="rounded-2xl bg-white border border-[#E8E2DC] p-4 shadow-card">
            <div className="flex items-center gap-3">
              <Mascot size="sm" animate={false} />
              <div className="flex-1">
                <p className="text-sm text-[#6B7280]">Potential Rewards</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-[#F59E0B]" />
                    <span className="font-bold text-[#1A1A2E]">+250 XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-[#FF6B35]" />
                    <span className="font-bold text-[#1A1A2E]">+1 Streak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1" />

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          onClick={() => startQuiz()}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-[#FF6B35] text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-button"
        >
          <Play className="w-5 h-5" />
          Start Quiz
        </motion.button>
      </div>
    </div>
  )
}
