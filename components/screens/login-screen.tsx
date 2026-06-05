"use client"

import { motion } from "framer-motion"
import { Mascot } from "../mascot"
import { useQuizStore } from "@/lib/store"
import {
  Play,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"

import { signInWithPopup } from "firebase/auth"
import {
  auth,
  googleProvider,
} from "@/lib/firebase"

export function LoginScreen() {
  const setScreen = useQuizStore(
    (state) => state.setScreen
  )

  const [showPassword, setShowPassword] =
    useState(false)

  const [isLogin, setIsLogin] =
    useState(true)

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const handleContinue = () => {
    setError("")

    if (!email.trim()) {
      setError(
        "Please enter your email"
      )
      return
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setError(
        "Please enter a valid email"
      )
      return
    }

    if (!password.trim()) {
      setError(
        "Please enter your password"
      )
      return
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      )
      return
    }

    setScreen("home")
  }

  const handleGuest = () => {
    setScreen("home")
  }

  const handleGoogleLogin =
    async () => {
      try {
        setError("")

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          )

        console.log(
          "Logged in:",
          result.user
        )

        setScreen("home")
      } catch (error) {
        console.error(error)

        setError(
          "Google Sign In failed"
        )
      }
    }

  return (
    <div className="h-full flex flex-col bg-[#FFFBF5] px-6 pt-6 pb-6">
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="flex justify-center mb-3">
          <Mascot size="md" />
        </div>

        <h1 className="text-2xl font-bold text-[#1A1A2E]">
          {isLogin
            ? "Welcome Back!"
            : "Join Quizzy"}
        </h1>

        <p className="text-[#6B7280] mt-1 text-sm">
          {isLogin
            ? "Sign in to continue learning"
            : "Create your account"}
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        className="flex-1 flex flex-col"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
      >
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block font-medium">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="your@email.com"
                className="w-full py-3.5 pl-12 pr-4 rounded-xl bg-white border border-[#E8E2DC] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all text-[#1A1A2E] placeholder:text-[#9CA3AF] shadow-card"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block font-medium">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Enter password"
                className="w-full py-3.5 pl-12 pr-12 rounded-xl bg-white border border-[#E8E2DC] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 outline-none transition-all text-[#1A1A2E] placeholder:text-[#9CA3AF] shadow-card"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {isLogin && (
            <button className="text-sm text-[#FF6B35] font-medium self-end">
              Forgot password?
            </button>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Sign In */}
        <motion.button
          className="mt-6 w-full py-4 rounded-xl bg-[#FF6B35] text-white font-semibold text-base flex items-center justify-center gap-2 shadow-button active:scale-[0.98]"
          onClick={
            handleContinue
          }
          whileTap={{
            scale: 0.98,
          }}
        >
          {isLogin
            ? "Sign In"
            : "Create Account"}

          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-[#E8E2DC]" />

          <span className="text-[#9CA3AF] text-sm">
            or
          </span>

          <div className="flex-1 h-px bg-[#E8E2DC]" />
        </div>

        {/* Google Sign In */}
        <button
          onClick={
            handleGoogleLogin
          }
          className="w-full py-4 rounded-xl bg-white border border-[#E8E2DC] hover:border-[#FF6B35]/50 transition-colors flex items-center justify-center gap-3 shadow-card"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
          </svg>

          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-center text-[#6B7280] mt-5 text-sm">
          {isLogin
            ? "New to Quizzy?"
            : "Already have an account?"}{" "}
          <button
            onClick={() =>
              setIsLogin(
                !isLogin
              )
            }
            className="text-[#FF6B35] font-semibold"
          >
            {isLogin
              ? "Sign Up"
              : "Sign In"}
          </button>
        </p>

        {/* Guest Mode */}
        <motion.button
          className="mt-4 w-full py-3 rounded-xl border border-[#E8E2DC] bg-white text-[#6B7280] hover:text-[#1A1A2E] font-medium flex items-center justify-center gap-2 shadow-card"
          onClick={handleGuest}
          whileTap={{
            scale: 0.98,
          }}
        >
          <Play className="w-5 h-5" />
          Play as Guest
        </motion.button>
      </motion.div>
    </div>
  )
}