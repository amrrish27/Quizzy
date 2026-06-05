"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Mascot } from "../mascot"
import { useQuizStore } from "@/lib/store"
import { ChevronRight, Sparkles, Trophy, Target } from "lucide-react"

const onboardingData = [
  {
    title: "Challenge Your Mind",
    description: "Explore thousands of fun questions across science, history, arts, and more!",
    icon: Target,
    color: "#FF6B35",
  },
  {
    title: "Earn & Compete",
    description: "Collect points, unlock achievements, and climb the leaderboard with friends.",
    icon: Trophy,
    color: "#2DD4BF",
  },
  {
    title: "Learn Every Day",
    description: "Build streaks, get daily rewards, and become a knowledge champion!",
    icon: Sparkles,
    color: "#FF6B35",
  },
]

export function OnboardingScreen() {
  const { onboardingStep, nextOnboardingStep, setScreen } = useQuizStore()
  const currentData = onboardingData[onboardingStep]
  const Icon = currentData.icon

  return (
    <div className="h-full flex flex-col bg-[#FFFBF5] px-6 pt-8 pb-6">
      {/* Skip Button */}
      <motion.button
        className="self-end text-sm text-[#6B7280] font-medium"
        onClick={() => setScreen('login')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Skip
      </motion.button>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={onboardingStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center text-center"
          >
            {/* Illustration Area */}
            <div className="relative mb-8">
              <motion.div 
                className="w-48 h-48 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${currentData.color}15` }}
              >
                <Mascot size="lg" />
              </motion.div>
              
              {/* Icon Badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 w-14 h-14 rounded-2xl flex items-center justify-center shadow-card"
                style={{ backgroundColor: currentData.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Icon className="w-7 h-7 text-white" />
              </motion.div>
            </div>

            {/* Title */}
            <motion.h2
              className="text-2xl font-bold text-[#1A1A2E] mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {currentData.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-[#6B7280] text-base leading-relaxed max-w-[280px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {currentData.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress & Button */}
      <div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === onboardingStep 
                  ? 'w-8 bg-[#FF6B35]' 
                  : i < onboardingStep 
                    ? 'w-2 bg-[#FF6B35]/50' 
                    : 'w-2 bg-[#E8E2DC]'
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <motion.button
          className="w-full py-4 rounded-2xl bg-[#FF6B35] text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-button active:scale-[0.98] transition-transform"
          onClick={nextOnboardingStep}
          whileTap={{ scale: 0.98 }}
        >
          {onboardingStep === 2 ? "Get Started" : "Continue"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}
