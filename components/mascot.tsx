"use client"

import { motion } from "framer-motion"

interface MascotProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  animate?: boolean
}

const sizeMap = {
  sm: 80,
  md: 120,
  lg: 160,
  xl: 200
}

export function Mascot({ size = "md", className = "", animate = true }: MascotProps) {
  const pixelSize = sizeMap[size]
  
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cute%20astronaut%20read%20book%20on%20planet%20cartoon-GvZngsuUz6QDTUkqsJ9LpvdrM8Nh5D.gif"
        alt="Quizzy Astronaut"
        width={pixelSize}
        height={pixelSize}
        className="object-contain"
        animate={animate ? {
          y: [0, -8, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}
