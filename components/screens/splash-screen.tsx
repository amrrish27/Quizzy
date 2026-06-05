"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Mascot } from "../mascot"
import { useQuizStore } from "@/lib/store"

export function SplashScreen() {
  const setScreen = useQuizStore((state) => state.setScreen)

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('onboarding')
    }, 2500)
    return () => clearTimeout(timer)
  }, [setScreen])

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#FFFBF5] px-8">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Mascot size="xl" />
        
        <motion.h1 
          className="text-4xl font-bold text-[#1A1A2E] mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Quizzy
        </motion.h1>
        
        <motion.p
          className="text-[#6B7280] text-base mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Learn. Play. Grow.
        </motion.p>
      </motion.div>

      <motion.div 
        className="mt-12 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#FF6B35]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
