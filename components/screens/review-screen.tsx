"use client"

import { motion } from "framer-motion"
import { useQuizStore } from "@/lib/store"
import { ArrowLeft, Check, X, ChevronDown, ChevronUp, Home } from "lucide-react"
import { useState } from "react"

export function ReviewScreen() {
  const { questions, userAnswers, setScreen, resetQuiz } = useQuizStore()
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const handleHome = () => {
    resetQuiz()
    setScreen('home')
  }

  return (
    <div className="min-h-full pb-6 bg-[#FFFBF5]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FFFBF5]/95 backdrop-blur-sm px-5 pt-4 pb-3 border-b border-[#E8E2DC]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setScreen('result')}
            className="w-10 h-10 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-center shadow-card"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A2E]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Review Answers</h1>
            <p className="text-sm text-[#6B7280]">
              {userAnswers.filter(a => a.isCorrect).length}/{questions.length} correct
            </p>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="px-5 pt-4 space-y-3">
        {questions.map((question, index) => {
          const answer = userAnswers[index]
          const isCorrect = answer?.isCorrect
          const isExpanded = expandedQuestion === index

          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-xl overflow-hidden border border-[#E8E2DC] bg-white shadow-card"
            >
              {/* Question Header */}
              <button
                onClick={() => setExpandedQuestion(isExpanded ? null : index)}
                className={`w-full p-4 flex items-center gap-3 ${
                  isCorrect ? 'bg-[#D1FAE5]' : 'bg-[#FEE2E2]'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isCorrect ? 'bg-[#10B981] text-white' : 'bg-[#EF4444] text-white'
                }`}>
                  {isCorrect ? <Check className="w-5 h-5" strokeWidth={3} /> : <X className="w-5 h-5" strokeWidth={3} />}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs text-[#6B7280] mb-0.5">Question {index + 1}</p>
                  <p className="font-medium text-sm text-[#1A1A2E] line-clamp-1">{question.question}</p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-[#6B7280]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                )}
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-white"
                >
                  <div className="p-4 pt-2 space-y-3">
                    <p className="text-[#1A1A2E] font-medium">{question.question}</p>

                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isSelected = answer?.selectedAnswer === optIndex
                        const isCorrectOption = question.correctAnswer === optIndex

                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg flex items-center gap-3 ${
                              isCorrectOption
                                ? 'bg-[#D1FAE5] border border-[#10B981]/30'
                                : isSelected && !isCorrectOption
                                  ? 'bg-[#FEE2E2] border border-[#EF4444]/30'
                                  : 'bg-[#F5F0EB] border border-transparent'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isCorrectOption
                                ? 'bg-[#10B981]/20 text-[#10B981]'
                                : isSelected && !isCorrectOption
                                  ? 'bg-[#EF4444]/20 text-[#EF4444]'
                                  : 'bg-white text-[#6B7280]'
                            }`}>
                              {String.fromCharCode(65 + optIndex)}
                            </div>
                            <span className={`flex-1 text-sm ${
                              isCorrectOption ? 'text-[#10B981] font-medium' : 
                              isSelected && !isCorrectOption ? 'text-[#EF4444]' : 'text-[#1A1A2E]'
                            }`}>
                              {option}
                            </span>
                            {isCorrectOption && <Check className="w-4 h-4 text-[#10B981]" />}
                            {isSelected && !isCorrectOption && <X className="w-4 h-4 text-[#EF4444]" />}
                          </div>
                        )
                      })}
                    </div>

                    <div className="p-3 rounded-lg bg-[#FFF0E5] border border-[#FF6B35]/20">
                      <p className="text-xs text-[#FF6B35] font-medium mb-1">Explanation</p>
                      <p className="text-sm text-[#6B7280]">{question.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Back Button */}
      <div className="px-5 pt-6">
        <button
          onClick={handleHome}
          className="w-full py-4 rounded-xl bg-[#FF6B35] text-white font-semibold flex items-center justify-center gap-2 shadow-button"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  )
}
