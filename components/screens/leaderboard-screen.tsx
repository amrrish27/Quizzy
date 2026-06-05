"use client"

import { motion } from "framer-motion"
import { useQuizStore } from "@/lib/store"
import { ArrowLeft, Trophy, Medal, Crown, Flame, ChevronUp, ChevronDown, Minus } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: 'QuizMaster99', avatar: '🦁', xp: 15420, streak: 21, change: 0 },
  { rank: 2, name: 'BrainiacSam', avatar: '🦊', xp: 14850, streak: 15, change: 1 },
  { rank: 3, name: 'WisdomWolf', avatar: '🐺', xp: 13200, streak: 12, change: -1 },
  { rank: 4, name: 'QuizzyPro', avatar: '🐼', xp: 12100, streak: 9, change: 2 },
  { rank: 5, name: 'Quiz Champion', avatar: '🦊', xp: 11340, streak: 8, change: 0, isCurrentUser: true },
  { rank: 6, name: 'SmartOwl', avatar: '🦉', xp: 10980, streak: 7, change: -2 },
  { rank: 7, name: 'NerdyNinja', avatar: '🐱', xp: 10450, streak: 6, change: 1 },
  { rank: 8, name: 'QuizKing', avatar: '🦅', xp: 9870, streak: 5, change: 0 },
]

const getRankBg = (rank: number, isCurrentUser?: boolean) => {
  if (isCurrentUser) return 'bg-[#FFF0E5] border-[#FF6B35]'
  switch(rank) {
    case 1: return 'bg-[#FEF3C7] border-[#F59E0B]/30'
    case 2: return 'bg-[#F5F0EB] border-[#9CA3AF]/30'
    case 3: return 'bg-[#FEF3C7]/50 border-[#F59E0B]/20'
    default: return 'bg-white border-[#E8E2DC]'
  }
}

export function LeaderboardScreen() {
  const { setScreen, profile } = useQuizStore()

  return (
    <div className="min-h-full pb-6 bg-[#FFFBF5]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#FFFBF5]/95 backdrop-blur-sm px-5 pt-4 pb-3 border-b border-[#E8E2DC]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setScreen('home')}
            className="w-10 h-10 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-center shadow-card"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A2E]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Leaderboard</h1>
            <p className="text-sm text-[#6B7280]">Global Rankings</p>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-6 pb-4"
      >
        <div className="flex items-end justify-center gap-3">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl mb-2 shadow-card">
              {leaderboardData[1].avatar}
            </div>
            <div className="h-16 w-16 rounded-t-xl bg-[#F5F0EB] border border-[#E8E2DC] flex flex-col items-center justify-center">
              <Medal className="w-5 h-5 text-[#9CA3AF]" />
              <span className="text-lg font-bold text-[#1A1A2E]">2</span>
            </div>
            <p className="text-xs font-medium mt-1 text-[#1A1A2E] truncate w-16 text-center">{leaderboardData[1].name.slice(0, 8)}</p>
            <p className="text-[10px] text-[#6B7280]">{(leaderboardData[1].xp / 1000).toFixed(1)}k</p>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center -mt-6"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#FF6B35] flex items-center justify-center text-2xl mb-2 shadow-button">
                {leaderboardData[0].avatar}
              </div>
              <Crown className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 text-[#F59E0B]" />
            </div>
            <div className="h-20 w-20 rounded-t-xl bg-[#FEF3C7] border border-[#F59E0B]/30 flex flex-col items-center justify-center">
              <Crown className="w-6 h-6 text-[#F59E0B]" />
              <span className="text-xl font-bold text-[#1A1A2E]">1</span>
            </div>
            <p className="text-sm font-bold mt-1 text-[#1A1A2E] truncate w-20 text-center">{leaderboardData[0].name.slice(0, 10)}</p>
            <p className="text-xs text-[#FF6B35]">{(leaderboardData[0].xp / 1000).toFixed(1)}k</p>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-xl mb-2 shadow-card">
              {leaderboardData[2].avatar}
            </div>
            <div className="h-14 w-16 rounded-t-xl bg-[#FEF3C7]/50 border border-[#F59E0B]/20 flex flex-col items-center justify-center">
              <Medal className="w-4 h-4 text-amber-600" />
              <span className="text-base font-bold text-[#1A1A2E]">3</span>
            </div>
            <p className="text-xs font-medium mt-1 text-[#1A1A2E] truncate w-16 text-center">{leaderboardData[2].name.slice(0, 8)}</p>
            <p className="text-[10px] text-[#6B7280]">{(leaderboardData[2].xp / 1000).toFixed(1)}k</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Full List */}
      <div className="px-5 space-y-2">
        {leaderboardData.slice(3).map((player, i) => (
          <motion.div
            key={player.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className={`p-3 rounded-xl border flex items-center gap-3 shadow-card ${getRankBg(player.rank, player.isCurrentUser)}`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#F5F0EB] flex items-center justify-center">
              <span className="text-sm font-bold text-[#6B7280]">#{player.rank}</span>
            </div>

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              player.isCurrentUser ? 'bg-[#FF6B35] shadow-button' : 'bg-[#F5F0EB]'
            }`}>
              {player.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`font-semibold text-sm truncate ${player.isCurrentUser ? 'text-[#FF6B35]' : 'text-[#1A1A2E]'}`}>
                  {player.name}
                </p>
                {player.isCurrentUser && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#FF6B35] text-white font-bold">YOU</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-[#6B7280]">{player.xp.toLocaleString()} XP</span>
                <span className="flex items-center gap-0.5 text-[10px] text-[#F59E0B]">
                  <Flame className="w-3 h-3" /> {player.streak}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              {player.change > 0 ? (
                <div className="flex items-center text-[#10B981] text-xs">
                  <ChevronUp className="w-4 h-4" />
                  <span>{player.change}</span>
                </div>
              ) : player.change < 0 ? (
                <div className="flex items-center text-[#EF4444] text-xs">
                  <ChevronDown className="w-4 h-4" />
                  <span>{Math.abs(player.change)}</span>
                </div>
              ) : (
                <Minus className="w-4 h-4 text-[#9CA3AF]" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Your Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-5 mt-5"
      >
        <div className="p-4 rounded-xl bg-[#FFF0E5] border border-[#FF6B35]/30">
          <p className="text-sm text-[#6B7280] mb-2">Your Global Rank</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center text-xl shadow-button">
                {profile.avatar}
              </div>
              <div>
                <p className="font-bold text-[#1A1A2E]">{profile.name}</p>
                <p className="text-sm text-[#6B7280]">{profile.xp.toLocaleString()} XP</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#FF6B35]">#5</p>
              <p className="text-xs text-[#6B7280]">Top 0.1%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
