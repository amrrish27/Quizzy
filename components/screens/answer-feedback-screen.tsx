"use client"

import { motion } from "framer-motion"
import { useQuizStore } from "@/lib/store"
import { Mascot } from "../mascot"
import { Check, X, Lightbulb, ArrowRight } from "lucide-react"

export function AnswerFeedbackScreen() {
  const { questions, currentQuestionIndex, userAnswers, nextQuestion } = useQuizStore()
  
  const currentQuestion = questions[currentQuestionIndex]
  const lastAnswer = userAnswers[userAnswers.length - 1]
  const isCorrect = lastAnswer?.isCorrect

  return (
    <div className="h-full flex flex-col bg-[#FFFBF5]">
      <div className="flex-1 flex flex-col px-5 pt-8">
        {/* Result Icon & Mascot */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            <Mascot size="lg" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center ${
                isCorrect ? 'bg-[#10B981]' : 'bg-[#EF4444]'
              }`}
              style={{ boxShadow: isCorrect ? '0 4px 14px rgba(16, 185, 129, 0.4)' : '0 4px 14px rgba(239, 68, 68, 0.4)' }}
            >
              {isCorrect ? (
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              ) : (
                <X className="w-6 h-6 text-white" strokeWidth={3} />
              )}
            </motion.div>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-2xl font-bold mt-6 ${isCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'}`}
          >
            {isCorrect ? "Correct!" : "Wrong Answer"}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#6B7280] mt-1"
          >
            {isCorrect ? "+50 XP earned!" : "Keep trying!"}
          </motion.p>
        </motion.div>

        {/* Answer Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-5"
        >
          {/* Your Answer */}
          <div className={`p-4 rounded-xl border-2 ${
            isCorrect ? 'bg-[#D1FAE5] border-[#10B981]/30' : 'bg-[#FEE2E2] border-[#EF4444]/30'
          }`}>
            <p className="text-xs text-[#6B7280] mb-1">Your Answer</p>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                isCorrect ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#EF4444]/20 text-[#EF4444]'
              }`}>
                {String.fromCharCode(65 + (lastAnswer?.selectedAnswer ?? 0))}
              </div>
              <span className="font-medium text-[#1A1A2E]">{currentQuestion.options[lastAnswer?.selectedAnswer ?? 0]}</span>
            </div>
          </div>

          {/* Correct Answer (if wrong) */}
          {!isCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-[#D1FAE5] border-2 border-[#10B981]/30"
            >
              <p className="text-xs text-[#6B7280] mb-1">Correct Answer</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-[#10B981]/20 text-[#10B981]">
                  {String.fromCharCode(65 + currentQuestion.correctAnswer)}
                </div>
                <span className="font-medium text-[#10B981]">{currentQuestion.options[currentQuestion.correctAnswer]}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-xl bg-white border border-[#E8E2DC] shadow-card"
        >
          <div className="flex items-center gap-2 mb-2 text-[#FF6B35]">
            <Lightbulb className="w-5 h-5" />
            <span className="font-semibold text-sm">Did you know?</span>
          </div>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            {currentQuestion.explanation}
          </p>
        </motion.div>

        <div className="flex-1" />
      </div>

      {/* Continue Button */}
      <div className="px-5 pb-6 pt-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          onClick={nextQuestion}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-[#FF6B35] text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-button"
        >
          {currentQuestionIndex < questions.length - 1 ? (
            <>
              Next Question
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              See Results
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
