"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useQuizStore } from "@/lib/store"
import { MobileFrame } from "@/components/mobile-frame"
import { SplashScreen } from "@/components/screens/splash-screen"
import { OnboardingScreen } from "@/components/screens/onboarding-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { CategoriesScreen } from "@/components/screens/categories-screen"
import { QuizStartScreen } from "@/components/screens/quiz-start-screen"
import { QuizQuestionScreen } from "@/components/screens/quiz-question-screen"
import { AnswerFeedbackScreen } from "@/components/screens/answer-feedback-screen"
import { ResultScreen } from "@/components/screens/result-screen"
import { ReviewScreen } from "@/components/screens/review-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { LeaderboardScreen } from "@/components/screens/leaderboard-screen"

const screenComponents = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  login: LoginScreen,
  home: HomeScreen,
  categories: CategoriesScreen,
  'quiz-start': QuizStartScreen,
  'quiz-question': QuizQuestionScreen,
  'answer-feedback': AnswerFeedbackScreen,
  result: ResultScreen,
  review: ReviewScreen,
  profile: ProfileScreen,
  leaderboard: LeaderboardScreen,
}

export default function QuizzyApp() {
  const currentScreen = useQuizStore((state) => state.currentScreen)
  const CurrentScreenComponent = screenComponents[currentScreen]

  return (
    <MobileFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
        >
          <CurrentScreenComponent />
        </motion.div>
      </AnimatePresence>
    </MobileFrame>
  )
}
