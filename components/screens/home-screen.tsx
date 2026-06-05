"use client"

import { motion } from "framer-motion"
import { Mascot } from "../mascot"
import { useQuizStore, Category } from "@/lib/store"
import { 
  Search, Flame, Trophy, Zap, Star, ChevronRight, 
  Clock, Gift, Award, Home, Grid3X3, User
} from "lucide-react"

const categories = [
  { id: 'science', name: 'Science', icon: '🔬', bg: '#E0F2FE', quizzes: 24 },
  { id: 'technology', name: 'Tech', icon: '💻', bg: '#F3E8FF', quizzes: 18 },
  { id: 'mathematics', name: 'Math', icon: '📐', bg: '#FEF3C7', quizzes: 15 },
  { id: 'sports', name: 'Sports', icon: '⚽', bg: '#D1FAE5', quizzes: 21 },
  { id: 'movies', name: 'Movies', icon: '🎬', bg: '#FEE2E2', quizzes: 30 },
  { id: 'general', name: 'General', icon: '🌍', bg: '#E0E7FF', quizzes: 45 },
]

const featuredQuizzes = [
  { id: 1, title: 'Space Exploration', category: 'Science', questions: 10, players: '2.3k', difficulty: 'Medium', color: '#2DD4BF' },
  { id: 2, title: 'World Capitals', category: 'General', questions: 15, players: '5.1k', difficulty: 'Easy', color: '#10B981' },
  { id: 3, title: 'Movie Classics', category: 'Movies', questions: 12, players: '3.8k', difficulty: 'Hard', color: '#EF4444' },
]

export function HomeScreen() {
  const { setScreen, selectCategory, profile } = useQuizStore()
  
  const xpProgress = (profile.xp / profile.xpToNextLevel) * 100

  return (
    <div className="min-h-full pb-24 bg-[#FFFBF5]">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-[#6B7280] text-sm">Good evening</p>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Quiz Champion</h1>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setScreen('profile')}
            className="relative"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-xl shadow-button">
              {profile.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#FFFBF5]">
              {profile.level}
            </div>
          </motion.button>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full py-3 pl-12 pr-4 rounded-xl bg-white border border-[#E8E2DC] focus:border-[#FF6B35] outline-none transition-all text-sm shadow-card"
          />
        </motion.div>
      </div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-5 mb-4"
      >
        <div className="rounded-2xl bg-white border border-[#E8E2DC] p-4 shadow-card">
          <div className="flex items-center gap-4">
            <Mascot size="sm" animate={false} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-[#6B7280]">Level {profile.level}</span>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF0E5] text-[#FF6B35] text-xs font-bold">
                  <Trophy className="w-3 h-3" />
                  {profile.rank}
                </div>
              </div>
              <div className="h-2 rounded-full bg-[#F5F0EB] overflow-hidden mb-1">
                <motion.div 
                  className="h-full rounded-full bg-[#FF6B35]"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </div>
              <p className="text-xs text-[#6B7280]">
                <span className="text-[#1A1A2E] font-semibold">{profile.xp.toLocaleString()}</span> / {profile.xpToNextLevel.toLocaleString()} XP
              </p>
            </div>
            <div className="flex flex-col items-center bg-[#FFF0E5] rounded-xl p-3">
              <Flame className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-lg font-bold text-[#FF6B35]">{profile.streak}</span>
              <span className="text-[10px] text-[#FF6B35]/70">Streak</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-5"
      >
        <button 
          onClick={() => {
            selectCategory('general')
            setScreen('quiz-start')
          }}
          className="w-full rounded-2xl p-4 bg-[#FF6B35] shadow-button active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-xs font-medium text-white/80 bg-white/20 px-2 py-0.5 rounded-full">Daily Challenge</span>
              <h3 className="text-white font-bold text-base mt-1">Complete for 100 XP!</h3>
              <div className="flex items-center gap-2 text-white/70 text-xs mt-1">
                <Clock className="w-3 h-3" />
                <span>Resets in 14h 32m</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
        </button>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="px-5 mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#1A1A2E]">Categories</h2>
          <button 
            onClick={() => setScreen('categories')}
            className="text-sm text-[#FF6B35] flex items-center gap-1 font-medium"
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              onClick={() => {
                selectCategory(cat.id as Category)
                setScreen('quiz-start')
              }}
              className="p-3 rounded-2xl bg-white border border-[#E8E2DC] hover:border-[#FF6B35]/50 transition-all shadow-card active:scale-[0.97]"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2 mx-auto"
                style={{ backgroundColor: cat.bg }}
              >
                {cat.icon}
              </div>
              <p className="text-sm font-medium text-[#1A1A2E]">{cat.name}</p>
              <p className="text-[11px] text-[#9CA3AF]">{cat.quizzes} quizzes</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Featured Quizzes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-5 mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#1A1A2E]">Popular Quizzes</h2>
        </div>
        
        <div className="space-y-3">
          {featuredQuizzes.map((quiz, i) => (
            <motion.button
              key={quiz.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              onClick={() => {
                selectCategory('general')
                setScreen('quiz-start')
              }}
              className="w-full p-3 rounded-2xl bg-white border border-[#E8E2DC] hover:border-[#FF6B35]/50 transition-all flex items-center gap-3 shadow-card active:scale-[0.98]"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${quiz.color}20` }}
              >
                <Star className="w-5 h-5" style={{ color: quiz.color }} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-[#1A1A2E] text-sm">{quiz.title}</h3>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-[#9CA3AF]">
                  <span>{quiz.questions} Qs</span>
                  <span>•</span>
                  <span>{quiz.players} played</span>
                </div>
              </div>
              <div 
                className="px-2 py-1 rounded-lg text-xs font-medium"
                style={{ 
                  backgroundColor: `${quiz.color}15`,
                  color: quiz.color 
                }}
              >
                {quiz.difficulty}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Quick Play Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-5 pb-4"
      >
        <button 
          onClick={() => {
            selectCategory(null as unknown as Category)
            setScreen('quiz-start')
          }}
          className="w-full py-3.5 rounded-xl bg-[#2DD4BF] text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{ boxShadow: '0 4px 14px rgba(45, 212, 191, 0.35)' }}
        >
          <Zap className="w-5 h-5" />
          Random Quiz
        </button>
      </motion.div>

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 pb-5 pt-3 px-5 bg-gradient-to-t from-[#FFFBF5] via-[#FFFBF5] to-transparent"
        style={{ maxWidth: '390px', margin: '0 auto' }}
      >
        <div className="flex items-center justify-around py-2 rounded-2xl bg-white border border-[#E8E2DC] shadow-card">
          <button 
            onClick={() => setScreen('home')}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF0E5] flex items-center justify-center">
              <Home className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <span className="text-[11px] font-medium text-[#FF6B35]">Home</span>
          </button>
          
          <button 
            onClick={() => setScreen('categories')}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-[#6B7280]" />
            </div>
            <span className="text-[11px] font-medium text-[#6B7280]">Explore</span>
          </button>
          
          <button 
            onClick={() => setScreen('leaderboard')}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center">
              <Award className="w-5 h-5 text-[#6B7280]" />
            </div>
            <span className="text-[11px] font-medium text-[#6B7280]">Ranks</span>
          </button>
          
          <button 
            onClick={() => setScreen('profile')}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center">
              <User className="w-5 h-5 text-[#6B7280]" />
            </div>
            <span className="text-[11px] font-medium text-[#6B7280]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
