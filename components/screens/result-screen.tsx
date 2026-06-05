"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useQuizStore } from "@/lib/store"
import { Mascot } from "../mascot"
import { 
  Trophy, Zap, Home, RotateCcw, CheckCircle2, 
  XCircle, Clock, TrendingUp, Eye
} from "lucide-react"
import confetti from "canvas-confetti"

export function ResultScreen() {
  const { questions, userAnswers, setScreen, resetQuiz, profile } = useQuizStore()
  const confettiTriggered = useRef(false)
  
  const correctCount = userAnswers.filter(a => a.isCorrect).length
  const percentage = Math.round((correctCount / questions.length) * 100)
  const totalTime = userAnswers.reduce((sum, a) => sum + a.timeTaken, 0)
  const avgTime = Math.round(totalTime / userAnswers.length)
  const xpEarned = correctCount * 50

  const isPerfect = percentage === 100
  const isGood = percentage >= 70

  useEffect(() => {
    if (isPerfect && !confettiTriggered.current) {
      confettiTriggered.current = true
      const duration = 2500
      const end = Date.now() + duration
      const colors = ['#FF6B35', '#2DD4BF', '#F59E0B', '#10B981']

      ;(function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        })
        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }
  }, [isPerfect])

  const handleRetry = () => {
    resetQuiz()
    setScreen('quiz-start')
  }

  const handleHome = () => {
    resetQuiz()
    setScreen('home')
  }

  return (
    <div className="min-h-full pb-6 bg-[#FFFBF5]">
      <div className="px-5 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <Mascot size="lg" />
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold mt-4 ${
              isPerfect ? 'text-[#10B981]' : isGood ? 'text-[#FF6B35]' : 'text-[#6B7280]'
            }`}
          >
            {isPerfect ? "Perfect Score!" : isGood ? "Great Job!" : "Keep Practicing!"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#6B7280] mt-1"
          >
            {isPerfect ? "You nailed it!" : isGood ? "Almost there!" : "You can do it!"}
          </motion.p>
        </motion.div>

        {/* Score Circle */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-5"
        >
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                fill="none"
                stroke="#F5F0EB"
                strokeWidth="10"
              />
              <motion.circle
                cx="72"
                cy="72"
                r="64"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={402}
                initial={{ strokeDashoffset: 402 }}
                animate={{ strokeDashoffset: 402 - (402 * percentage) / 100 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-3xl font-bold text-[#1A1A2E]"
              >
                {percentage}%
              </motion.span>
              <span className="text-sm text-[#6B7280]">Score</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3 mb-5"
        >
          <div className="p-4 rounded-xl bg-white border border-[#E8E2DC] shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="text-sm text-[#6B7280]">Correct</span>
            </div>
            <span className="text-xl font-bold text-[#1A1A2E]">{correctCount}/{questions.length}</span>
          </div>
          
          <div className="p-4 rounded-xl bg-white border border-[#E8E2DC] shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] flex items-center justify-center">
                <XCircle className="w-4 h-4 text-[#EF4444]" />
              </div>
              <span className="text-sm text-[#6B7280]">Wrong</span>
            </div>
            <span className="text-xl font-bold text-[#1A1A2E]">{questions.length - correctCount}</span>
          </div>
          
          <div className="p-4 rounded-xl bg-white border border-[#E8E2DC] shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <span className="text-sm text-[#6B7280]">XP</span>
            </div>
            <span className="text-xl font-bold text-[#1A1A2E]">+{xpEarned}</span>
          </div>
          
          <div className="p-4 rounded-xl bg-white border border-[#E8E2DC] shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#0EA5E9]" />
              </div>
              <span className="text-sm text-[#6B7280]">Avg Time</span>
            </div>
            <span className="text-xl font-bold text-[#1A1A2E]">{avgTime}s</span>
          </div>
        </motion.div>

        {/* Achievement (if perfect) */}
        {isPerfect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="p-4 rounded-xl bg-[#FEF3C7] border border-[#F59E0B]/30 mb-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-[#F59E0B] font-medium">Achievement Unlocked!</p>
                <h3 className="font-bold text-[#1A1A2E]">Perfectionist</h3>
              </div>
            </div>
          </motion.div>
        )}

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-4 rounded-xl bg-white border border-[#E8E2DC] shadow-card mb-5"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
              <span className="font-semibold text-sm text-[#1A1A2E]">Level Progress</span>
            </div>
            <span className="text-sm text-[#6B7280]">Level {profile.level}</span>
          </div>
          <div className="h-2 rounded-full bg-[#F5F0EB] overflow-hidden">
            <motion.div 
              className="h-full rounded-full bg-[#FF6B35]"
              initial={{ width: `${((profile.xp - xpEarned) / profile.xpToNextLevel) * 100}%` }}
              animate={{ width: `${(profile.xp / profile.xpToNextLevel) * 100}%` }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            {profile.xp} / {profile.xpToNextLevel} XP
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <button
            onClick={() => setScreen('review')}
            className="w-full py-3 rounded-xl bg-white border border-[#E8E2DC] shadow-card flex items-center justify-center gap-2 font-medium text-[#1A1A2E]"
          >
            <Eye className="w-5 h-5" />
            Review Answers
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleRetry}
              className="py-3 rounded-xl bg-white border border-[#E8E2DC] shadow-card flex items-center justify-center gap-2 font-medium text-[#1A1A2E]"
            >
              <RotateCcw className="w-5 h-5" />
              Retry
            </button>
            <button
              onClick={handleHome}
              className="py-3 rounded-xl bg-[#2DD4BF] text-white flex items-center justify-center gap-2 font-semibold"
              style={{ boxShadow: '0 4px 14px rgba(45, 212, 191, 0.35)' }}
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
