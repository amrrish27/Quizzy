"use client"

import { ReactNode, useState, useEffect } from "react"

interface MobileFrameProps {
  children: ReactNode
  showStatusBar?: boolean
}

export function MobileFrame({ children, showStatusBar = true }: MobileFrameProps) {
  const [currentTime, setCurrentTime] = useState("9:41 AM")

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[390px] mx-auto">
        <div 
          className="relative bg-[#FFFBF5] overflow-hidden rounded-[3rem]"
          style={{ 
            aspectRatio: '9/19.5',
            boxShadow: '0 0 0 10px #1A1A2E, 0 0 0 12px #333, 0 25px 60px rgba(0,0,0,0.5)'
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-[#1A1A2E] w-28 h-7 rounded-b-2xl flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <div className="w-12 h-3 rounded-full bg-gray-700" />
            </div>
          </div>

          {/* Status Bar */}
          {showStatusBar && (
            <div className="absolute top-1 left-0 right-0 z-40 px-7 py-2 flex items-center justify-between text-[11px] text-[#1A1A2E] font-medium">
              <span suppressHydrationWarning>{currentTime}</span>
              <div className="flex items-center gap-1">
                <div className="flex items-end gap-0.5">
                  <div className="w-[3px] h-[5px] bg-[#1A1A2E] rounded-sm" />
                  <div className="w-[3px] h-[7px] bg-[#1A1A2E] rounded-sm" />
                  <div className="w-[3px] h-[9px] bg-[#1A1A2E] rounded-sm" />
                  <div className="w-[3px] h-[11px] bg-[#1A1A2E] rounded-sm" />
                </div>
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21l-1.5-1.5c3.1-3.1 3.1-8.1 0-11.2L12 7c4.3 4.3 4.3 11.3 0 15.6l-.1.1-.9-.7zm-3-3l-1.5-1.5c1.9-1.9 1.9-5 0-6.9L9 8.1c2.8 2.8 2.8 7.4 0 10.2l-.1.1-.9-.7zM6 15l-1.5-1.5c.7-.7.7-1.8 0-2.5L6 9.5c1.5 1.5 1.5 4 0 5.5l-.1.1-.9-.7z"/>
                </svg>
                <div className="flex items-center ml-1">
                  <div className="w-6 h-[11px] border-[1.5px] border-[#1A1A2E] rounded-[3px] p-[1px]">
                    <div className="w-full h-full bg-[#10B981] rounded-[1px]" />
                  </div>
                  <div className="w-[2px] h-[5px] bg-[#1A1A2E] rounded-r-sm -ml-[1px]" />
                </div>
              </div>
            </div>
          )}

          {/* Screen Content */}
          <div className="absolute inset-0 pt-8 pb-6 overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
              {children}
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
            <div className="w-32 h-1 bg-[#1A1A2E]/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
