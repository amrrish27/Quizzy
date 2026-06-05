"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuizStore } from "@/lib/store"
import { Clock, X } from "lucide-react"

export function QuizQuestionScreen() {
  const { 
    questions, 
    currentQuestionIndex, 
    selectedAnswerIndex, 
    selectAnswer, 
    submitAnswer,
    setScreen,
    resetQuiz
  } = useQuizStore()
  
  const [timeLeft, setTimeLeft] = useState(30)
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  useEffect(() => {
    setTimeLeft(30)
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          if (selectedAnswerIndex !== null) {
            submitAnswer()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [currentQuestionIndex, selectedAnswerIndex, submitAnswer])

  const handleQuit = () => {
    resetQuiz()
    setScreen('home')
  }

  const getTimerColor = () => {
    if (timeLeft > 20) return '#10B981'
    if (timeLeft > 10) return '#F59E0B'
    return '#EF4444'
  }

  return (
    <div className="h-full flex flex-col bg-[#FFFBF5]">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          {/* Quit Button */}
          <button 
            onClick={handleQuit}
            className="w-10 h-10 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-center shadow-card"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>

          {/* Question Counter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6B7280]">Question</span>
            <span className="px-3 py-1 rounded-full bg-[#FFF0E5] text-[#FF6B35] font-bold text-sm">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>

          {/* Timer */}
          <div 
            className="w-12 h-12 rounded-xl bg-white border border-[#E8E2DC] flex flex-col items-center justify-center shadow-card"
          >
            <Clock className="w-3 h-3 mb-0.5" style={{ color: getTimerColor() }} />
            <motion.span 
              key={timeLeft}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-base font-bold"
              style={{ color: getTimerColor() }}
            >
              {timeLeft}
            </motion.span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 rounded-full bg-[#F5F0EB] overflow-hidden">
          <motion.div 
            className="h-full rounded-full bg-[#FF6B35]"
            initial={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-5 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-white border border-[#E8E2DC] text-xs font-medium text-[#6B7280] capitalize">
                {currentQuestion.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#E8E2DC] text-xs font-medium text-[#6B7280] capitalize">
                {currentQuestion.difficulty}
              </span>
            </div>
            
            {/* Question Text */}
            <h2 className="text-xl font-bold text-[#1A1A2E] leading-relaxed mb-6">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 flex-1">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    selectedAnswerIndex === index 
                      ? 'bg-[#FFF0E5] border-[#FF6B35]' 
                      : 'bg-white border-[#E8E2DC] hover:border-[#FF6B35]/30'
                  } shadow-card`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      selectedAnswerIndex === index 
                        ? 'bg-[#FF6B35] text-white' 
                        : 'bg-[#F5F0EB] text-[#6B7280]'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 font-medium text-[#1A1A2E]">{option}</span>
                    {selectedAnswerIndex === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <div className="px-5 pb-6 pt-4">
        <motion.button
          onClick={submitAnswer}
          disabled={selectedAnswerIndex === null}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
            selectedAnswerIndex !== null 
              ? 'bg-[#FF6B35] text-white shadow-button' 
              : 'bg-[#F5F0EB] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          Submit Answer
        </motion.button>
      </div>
    </div>
  )
}
