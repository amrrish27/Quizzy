import { create } from 'zustand'

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'home'
  | 'categories'
  | 'quiz-start'
  | 'quiz-question'
  | 'answer-feedback'
  | 'result'
  | 'review'
  | 'profile'
  | 'leaderboard'

export type Category = 
  | 'science'
  | 'technology'
  | 'mathematics'
  | 'sports'
  | 'movies'
  | 'general'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: Category
  difficulty: Difficulty
  explanation: string
}

export interface UserAnswer {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
  timeTaken: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  target: number
}

export interface UserProfile {
  name: string
  avatar: string
  level: number
  xp: number
  xpToNextLevel: number
  totalQuizzes: number
  correctAnswers: number
  streak: number
  bestStreak: number
  rank: string
  achievements: Achievement[]
  dailyRewardClaimed: boolean
  lastRewardDate: string | null
}

interface QuizState {
  currentScreen: Screen
  onboardingStep: number
  selectedCategory: Category | null
  selectedDifficulty: Difficulty
  currentQuestionIndex: number
  questions: Question[]
  userAnswers: UserAnswer[]
  timeRemaining: number
  isAnswerLocked: boolean
  selectedAnswerIndex: number | null
  profile: UserProfile
  
  // Actions
  setScreen: (screen: Screen) => void
  nextOnboardingStep: () => void
  selectCategory: (category: Category) => void
  setDifficulty: (difficulty: Difficulty) => void
  startQuiz: () => void
  selectAnswer: (index: number) => void
  submitAnswer: () => void
  nextQuestion: () => void
  resetQuiz: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
  addXP: (amount: number) => void
  claimDailyReward: () => void
  incrementStreak: () => void
}

const defaultAchievements: Achievement[] = [
  { id: 'first-quiz', title: 'First Steps', description: 'Complete your first quiz', icon: '🎯', unlocked: false, progress: 0, target: 1 },
  { id: 'perfect-score', title: 'Perfectionist', description: 'Get 100% on a quiz', icon: '💯', unlocked: false, progress: 0, target: 1 },
  { id: 'streak-3', title: 'On Fire', description: 'Maintain a 3-day streak', icon: '🔥', unlocked: true, progress: 3, target: 3 },
  { id: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '⚡', unlocked: false, progress: 3, target: 7 },
  { id: 'quizzes-10', title: 'Quiz Enthusiast', description: 'Complete 10 quizzes', icon: '📚', unlocked: false, progress: 5, target: 10 },
  { id: 'science-master', title: 'Science Master', description: 'Ace 5 science quizzes', icon: '🔬', unlocked: false, progress: 2, target: 5 },
]

const defaultProfile: UserProfile = {
  name: 'Quiz Champion',
  avatar: '🦊',
  level: 5,
  xp: 2340,
  xpToNextLevel: 3000,
  totalQuizzes: 23,
  correctAnswers: 187,
  streak: 3,
  bestStreak: 7,
  rank: 'Gold',
  achievements: defaultAchievements,
  dailyRewardClaimed: false,
  lastRewardDate: null,
}

const sampleQuestions: Question[] = [
  {
  id: 36,
  question: "Which is the largest ocean?",
  options: ["Atlantic", "Indian", "Pacific", "Arctic"],
  correctAnswer: 2,
  category: 'general',
  difficulty: 'easy',
  explanation: "Pacific Ocean is the largest."
},
{
  id: 37,
  question: "Who wrote Romeo and Juliet?",
  options: ["Shakespeare", "Charles Dickens", "Tolstoy", "Homer"],
  correctAnswer: 0,
  category: 'general',
  difficulty: 'easy',
  explanation: "William Shakespeare wrote Romeo and Juliet."
},
{
  id: 38,
  question: "What is the capital of Japan?",
  options: ["Seoul", "Tokyo", "Kyoto", "Osaka"],
  correctAnswer: 1,
  category: 'general',
  difficulty: 'easy',
  explanation: "Tokyo is Japan's capital."
},
{
  id: 39,
  question: "Which country has the highest population?",
  options: ["USA", "India", "China", "Russia"],
  correctAnswer: 1,
  category: 'general',
  difficulty: 'medium',
  explanation: "India currently has the highest population."
},
  {
  id: 33,
  question: "Who played Iron Man?",
  options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Tom Holland"],
  correctAnswer: 1,
  category: 'movies',
  difficulty: 'easy',
  explanation: "Robert Downey Jr. played Iron Man."
},
{
  id: 34,
  question: "Which movie has the quote 'I am your father'?",
  options: ["Harry Potter", "Avengers", "Star Wars", "Batman"],
  correctAnswer: 2,
  category: 'movies',
  difficulty: 'medium',
  explanation: "The quote is from Star Wars."
},
{
  id: 35,
  question: "Which movie won Best Picture in 2024 Oscars?",
  options: ["Oppenheimer", "Barbie", "Dune", "Avatar"],
  correctAnswer: 0,
  category: 'movies',
  difficulty: 'hard',
  explanation: "Oppenheimer won Best Picture."
},
  {
  id: 30,
  question: "How many players are in a football team?",
  options: ["9", "10", "11", "12"],
  correctAnswer: 2,
  category: 'sports',
  difficulty: 'easy',
  explanation: "A football team has 11 players."
},
{
  id: 31,
  question: "Which country hosted FIFA 2022?",
  options: ["Brazil", "Qatar", "Russia", "USA"],
  correctAnswer: 1,
  category: 'sports',
  difficulty: 'easy',
  explanation: "Qatar hosted FIFA 2022."
},
{
  id: 32,
  question: "Who is known as the King of Cricket?",
  options: ["Dhoni", "Virat Kohli", "Sachin Tendulkar", "Rohit Sharma"],
  correctAnswer: 2,
  category: 'sports',
  difficulty: 'medium',
  explanation: "Sachin Tendulkar is widely called the God/King of Cricket."
},
  {
  id: 26,
  question: "Who founded Microsoft?",
  options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
  correctAnswer: 1,
  category: 'technology',
  difficulty: 'easy',
  explanation: "Bill Gates co-founded Microsoft."
},
{
  id: 27,
  question: "What does RAM stand for?",
  options: ["Random Access Memory", "Rapid Access Module", "Read Access Memory", "Run Active Memory"],
  correctAnswer: 0,
  category: 'technology',
  difficulty: 'easy',
  explanation: "RAM stands for Random Access Memory."
},
{
  id: 28,
  question: "Which company created Android?",
  options: ["Apple", "Google", "Samsung", "Microsoft"],
  correctAnswer: 1,
  category: 'technology',
  difficulty: 'easy',
  explanation: "Google owns Android."
},
{
  id: 29,
  question: "What language powers most websites?",
  options: ["Python", "Java", "JavaScript", "C++"],
  correctAnswer: 2,
  category: 'technology',
  difficulty: 'medium',
  explanation: "JavaScript powers most interactive websites."
},
  {
  id: 11,
  question: "What is 12 × 8?",
  options: ["84", "96", "108", "88"],
  correctAnswer: 1,
  category: 'mathematics',
  difficulty: 'easy',
  explanation: "12 × 8 = 96."
},
{
  id: 12,
  question: "What is √64?",
  options: ["6", "8", "10", "12"],
  correctAnswer: 1,
  category: 'mathematics',
  difficulty: 'easy',
  explanation: "The square root of 64 is 8."
},
{
  id: 13,
  question: "What is 15% of 200?",
  options: ["20", "25", "30", "35"],
  correctAnswer: 2,
  category: 'mathematics',
  difficulty: 'medium',
  explanation: "15% of 200 = 30."
},
{
  id: 14,
  question: "Solve: 2x + 5 = 15",
  options: ["5", "10", "15", "20"],
  correctAnswer: 0,
  category: 'mathematics',
  difficulty: 'medium',
  explanation: "2x = 10 → x = 5."
},
{
  id: 15,
  question: "What is 7²?",
  options: ["42", "49", "56", "64"],
  correctAnswer: 1,
  category: 'mathematics',
  difficulty: 'easy',
  explanation: "7² = 49."
},
{
  id: 16,
  question: "What is the formula for area of a circle?",
  options: ["πr²", "2πr", "r²", "πd"],
  correctAnswer: 0,
  category: 'mathematics',
  difficulty: 'medium',
  explanation: "Area of circle = πr²."
},
{
  id: 17,
  question: "What is 144 ÷ 12?",
  options: ["10", "11", "12", "13"],
  correctAnswer: 2,
  category: 'mathematics',
  difficulty: 'easy',
  explanation: "144 ÷ 12 = 12."
},
{
  id: 18,
  question: "What is the derivative of x³?",
  options: ["x²", "2x", "3x²", "3x"],
  correctAnswer: 2,
  category: 'mathematics',
  difficulty: 'hard',
  explanation: "Using power rule, derivative of x³ = 3x²."
},
{
  id: 19,
  question: "What is 25²?",
  options: ["525", "625", "225", "725"],
  correctAnswer: 1,
  category: 'mathematics',
  difficulty: 'medium',
  explanation: "25 × 25 = 625."
},
{
  id: 20,
  question: "What is sin(90°)?",
  options: ["0", "1", "2", "-1"],
  correctAnswer: 1,
  category: 'mathematics',
  difficulty: 'hard',
  explanation: "sin(90°) = 1."
},
  {
    id: 1,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: 1,
    category: 'science',
    difficulty: 'easy',
    explanation: "Au comes from the Latin word 'aurum', meaning gold. It's been used as a symbol of wealth and power throughout human history."
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctAnswer: 2,
    category: 'science',
    difficulty: 'easy',
    explanation: "Mars appears red because of iron oxide (rust) on its surface. The Romans named it after their god of war."
  },
  {
    id: 3,
    question: "What does CPU stand for in computing?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
    correctAnswer: 0,
    category: 'technology',
    difficulty: 'easy',
    explanation: "The CPU is often called the 'brain' of the computer, executing instructions from programs."
  },
  {
    id: 4,
    question: "What is the value of Pi to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    correctAnswer: 1,
    category: 'mathematics',
    difficulty: 'easy',
    explanation: "Pi (π) is approximately 3.14159... It represents the ratio of a circle's circumference to its diameter."
  },
  {
    id: 5,
    question: "Which country has won the most FIFA World Cups?",
    options: ["Germany", "Argentina", "Italy", "Brazil"],
    correctAnswer: 3,
    category: 'sports',
    difficulty: 'medium',
    explanation: "Brazil has won the FIFA World Cup 5 times (1958, 1962, 1970, 1994, 2002), more than any other nation."
  },
  {
    id: 6,
    question: "Who directed the movie 'Inception'?",
    options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Martin Scorsese"],
    correctAnswer: 1,
    category: 'movies',
    difficulty: 'medium',
    explanation: "Christopher Nolan wrote and directed Inception (2010), known for its complex dream-within-a-dream narrative."
  },
  {
    id: 7,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: 2,
    category: 'general',
    difficulty: 'medium',
    explanation: "Canberra became the capital in 1927 as a compromise between Sydney and Melbourne, both wanting the title."
  },
  {
    id: 8,
    question: "Which programming language was created by Guido van Rossum?",
    options: ["Java", "Ruby", "Python", "JavaScript"],
    correctAnswer: 2,
    category: 'technology',
    difficulty: 'medium',
    explanation: "Python was created in 1991 by Guido van Rossum, named after the comedy group Monty Python."
  },
  {
    id: 9,
    question: "What is the derivative of x²?",
    options: ["x", "2x", "2x²", "x²"],
    correctAnswer: 1,
    category: 'mathematics',
    difficulty: 'hard',
    explanation: "Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹. So d/dx(x²) = 2x¹ = 2x."
  },
  {
    id: 10,
    question: "Which element has the atomic number 79?",
    options: ["Silver", "Gold", "Platinum", "Mercury"],
    correctAnswer: 1,
    category: 'science',
    difficulty: 'hard',
    explanation: "Gold (Au) has 79 protons in its nucleus. It's one of the few elements that occurs naturally in pure form."
  },
]

export const useQuizStore = create<QuizState>((set, get) => ({
  currentScreen: 'splash',
  onboardingStep: 0,
  selectedCategory: null,
  selectedDifficulty: 'medium',
  currentQuestionIndex: 0,
  questions: sampleQuestions,
  userAnswers: [],
  timeRemaining: 30,
  isAnswerLocked: false,
  selectedAnswerIndex: null,
  profile: defaultProfile,
  
  setScreen: (screen) => set({ currentScreen: screen }),
  
  nextOnboardingStep: () => {
    const step = get().onboardingStep
    if (step < 2) {
      set({ onboardingStep: step + 1 })
    } else {
      set({ currentScreen: 'login' })
    }
  },
  
  selectCategory: (category) => set({ selectedCategory: category }),
  
  setDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  
 startQuiz: () => {
  const {
    selectedCategory,
    selectedDifficulty
  } = get()

  let filteredQuestions =
    sampleQuestions

  // Category filter
  if (selectedCategory) {
    filteredQuestions =
      filteredQuestions.filter(
        (q) =>
          q.category ===
          selectedCategory
      )
  }

  // Difficulty filter
  if (selectedDifficulty) {
    filteredQuestions =
      filteredQuestions.filter(
        (q) =>
          q.difficulty ===
          selectedDifficulty
      )
  }

  // Shuffle questions
  const shuffled = [
    ...filteredQuestions,
  ].sort(
    () => Math.random() - 0.5
  )

  // Take only filtered questions
  const quizQuestions =
    shuffled.slice(
      0,
      Math.min(5, shuffled.length)
    )

  set({
    questions: quizQuestions,
    currentQuestionIndex: 0,
    userAnswers: [],
    timeRemaining: 30,
    isAnswerLocked: false,
    selectedAnswerIndex: null,
    currentScreen:
      "quiz-question",
  })
},
  
  selectAnswer: (index) => {
    if (!get().isAnswerLocked) {
      set({ selectedAnswerIndex: index })
    }
  },
  
  submitAnswer: () => {
    const { currentQuestionIndex, questions, selectedAnswerIndex, userAnswers } = get()
    if (selectedAnswerIndex === null) return
    
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswer
    
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswerIndex,
      isCorrect,
      timeTaken: 30 - get().timeRemaining
    }
    
    set({
      userAnswers: [...userAnswers, answer],
      isAnswerLocked: true,
      currentScreen: 'answer-feedback'
    })
  },
  
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get()
    
    if (currentQuestionIndex < questions.length - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        timeRemaining: 30,
        isAnswerLocked: false,
        selectedAnswerIndex: null,
        currentScreen: 'quiz-question'
      })
    } else {
      // Quiz completed
      const { userAnswers, profile } = get()
      const correctCount = userAnswers.filter(a => a.isCorrect).length
      const xpEarned = correctCount * 50
      
      set({
        currentScreen: 'result',
        profile: {
          ...profile,
          totalQuizzes: profile.totalQuizzes + 1,
          correctAnswers: profile.correctAnswers + correctCount,
          xp: profile.xp + xpEarned
        }
      })
    }
  },
  
  resetQuiz: () => set({
    currentQuestionIndex: 0,
    userAnswers: [],
    timeRemaining: 30,
    isAnswerLocked: false,
    selectedAnswerIndex: null,
    selectedCategory: null
  }),
  
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),
  
  addXP: (amount) => {
    const { profile } = get()
    let newXP = profile.xp + amount
    let newLevel = profile.level
    let newXPToNext = profile.xpToNextLevel
    
    while (newXP >= newXPToNext) {
      newXP -= newXPToNext
      newLevel++
      newXPToNext = Math.floor(newXPToNext * 1.2)
    }
    
    set({
      profile: {
        ...profile,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext
      }
    })
  },
  
  claimDailyReward: () => {
    const { profile } = get()
    const today = new Date().toDateString()
    
    if (profile.lastRewardDate !== today) {
      set({
        profile: {
          ...profile,
          xp: profile.xp + 100,
          dailyRewardClaimed: true,
          lastRewardDate: today
        }
      })
    }
  },
  
  incrementStreak: () => {
    const { profile } = get()
    const newStreak = profile.streak + 1
    set({
      profile: {
        ...profile,
        streak: newStreak,
        bestStreak: Math.max(newStreak, profile.bestStreak)
      }
    })
  }
}))
