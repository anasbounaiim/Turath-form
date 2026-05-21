'use client'

import { CSSProperties, useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  left: number
  drift: number
  delay: number
  rotate: number
  color: string
}

const COLORS = ['#C9964A', '#8B5E34', '#F4E6CC', '#6F7D4E', '#B8754B']

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    setPieces(
      Array.from({ length: 42 }, (_, id) => ({
        id,
        left: Math.random() * 100,
        drift: Math.random() * 220 - 110,
        delay: Math.random() * 0.28,
        rotate: Math.random() * 540 + 180,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })),
    )

    const timer = window.setTimeout(() => setPieces([]), 3400)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-[-16px] h-3 w-2 animate-confetti rounded-[2px]"
          style={
            {
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              '--confetti-x': `${piece.drift}px`,
              '--confetti-rotate': `${piece.rotate}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
