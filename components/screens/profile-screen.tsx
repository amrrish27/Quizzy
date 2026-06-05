"use client"

import { motion } from "framer-motion"
import { useQuizStore } from "@/lib/store"
import { Mascot } from "../mascot"
import { 
  ArrowLeft, Flame, Trophy, Target, Settings, 
  ChevronRight, Star, CheckCircle2, Edit2
} from "lucide-react"

export function ProfileScreen() {
  const { setScreen, profile } = useQuizStore()
  
  const xpProgress = (profile.xp / profile.xpToNextLevel) * 100
  const winRate = Math.round((profile.correctAnswers / (profile.totalQuizzes * 5)) * 100) || 0

  const stats = [
    { label: 'Quizzes', value: profile.totalQuizzes, icon: Target, bg: '#FFF0E5', color: '#FF6B35' },
    { label: 'Correct', value: profile.correctAnswers, icon: CheckCircle2, bg: '#D1FAE5', color: '#10B981' },
    { label: 'Best Streak', value: profile.bestStreak, icon: Flame, bg: '#FEF3C7', color: '#F59E0B' },
    { label: 'Win Rate', value: `${winRate}%`, icon: Trophy, bg: '#F3E8FF', color: '#A855F7' },
  ]

  const unlockedAchievements = profile.achievements.filter(a => a.unlocked)
  const lockedAchievements = profile.achievements.filter(a => !a.unlocked)

  return (
    <div className="min-h-full pb-6 bg-[#FFFBF5]">
      {/* Header */}
      <div className="relative">
        <div className="h-28 bg-[#FF6B35]" />
        
        <div className="absolute top-4 left-0 right-0 px-5 flex items-center justify-between">
          <button 
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Profile</h1>
          <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 -mt-12 relative z-10"
        >
          <div className="rounded-2xl bg-white border border-[#E8E2DC] p-4 shadow-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-3xl shadow-button">
                  {profile.avatar}
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-[#E8E2DC] flex items-center justify-center shadow-card">
                  <Edit2 className="w-3 h-3 text-[#6B7280]" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-[#1A1A2E]">{profile.name}</h2>
                  <div className="px-2 py-0.5 rounded-full bg-[#FFF0E5] text-[#FF6B35] text-xs font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {profile.rank}
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] mb-2">Level {profile.level}</p>
                
                <div className="h-2 rounded-full bg-[#F5F0EB] overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-[#FF6B35]"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">{profile.xp} / {profile.xpToNextLevel} XP</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FEF3C7]">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
                <span className="font-bold text-sm text-[#F59E0B]">{profile.streak} day streak</span>
              </div>
              <button 
                onClick={() => setScreen('leaderboard')}
                className="flex items-center gap-1 text-sm text-[#FF6B35] font-medium"
              >
                Leaderboard <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mt-5"
      >
        <h3 className="text-base font-bold text-[#1A1A2E] mb-3">Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="p-4 rounded-xl bg-white border border-[#E8E2DC] shadow-card"
            >
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-xl font-bold text-[#1A1A2E]">{stat.value}</p>
              <p className="text-xs text-[#6B7280]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mt-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-[#1A1A2E]">Achievements</h3>
          <span className="text-sm text-[#6B7280]">{unlockedAchievements.length}/{profile.achievements.length}</span>
        </div>

        <div className="space-y-3 mb-3">
          {unlockedAchievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="p-3 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F59E0B] flex items-center justify-center text-xl">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#1A1A2E]">{achievement.title}</h4>
                <p className="text-xs text-[#6B7280]">{achievement.description}</p>
              </div>
              <Star className="w-5 h-5 text-[#F59E0B]" />
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          {lockedAchievements.slice(0, 2).map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="p-3 rounded-xl bg-white border border-[#E8E2DC] flex items-center gap-3 opacity-60"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-xl grayscale">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#1A1A2E]">{achievement.title}</h4>
                <p className="text-xs text-[#6B7280]">{achievement.description}</p>
                <div className="mt-1.5 h-1.5 rounded-full bg-[#F5F0EB] overflow-hidden">
                  <div 
                    className="h-full bg-[#FF6B35]/50 rounded-full"
                    style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Motivational Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5 mt-5"
      >
        <div className="rounded-xl bg-[#FFF0E5] border border-[#FF6B35]/20 p-4 flex items-center gap-3">
          <Mascot size="sm" animate={false} />
          <div className="flex-1">
            <p className="font-medium text-[#1A1A2E]">Keep it up!</p>
            <p className="text-xs text-[#6B7280]">Complete 2 more quizzes to reach Level {profile.level + 1}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
