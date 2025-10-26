'use client'

import { Task } from '@/types'
import { useRef, useEffect } from 'react'

interface HourlyViewProps {
  tasks: Task[]
}

export default function HourlyView({ tasks }: HourlyViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const containerRef = useRef<HTMLDivElement>(null)
  const currentHourRef = useRef<HTMLDivElement>(null)

  // 컴포넌트 마운트 시 현재 시간대로 스크롤
  useEffect(() => {
    if (currentHourRef.current && containerRef.current) {
      const container = containerRef.current
      const currentElement = currentHourRef.current

      // 현재 시간 요소의 위치 계산
      const elementTop = currentElement.offsetTop
      const containerHeight = container.clientHeight
      const scrollPosition = elementTop - containerHeight / 3 // 화면 1/3 지점에 현재 시간 배치

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="space-y-2 overflow-auto h-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 sticky top-0 bg-zinc-50 dark:bg-zinc-950 z-10 pb-2">
        시간별 일정
      </h2>
      {hours.map((hour) => {
        const hourTasks = tasks.filter((task) => {
          if (!task.scheduledTime) return false
          const taskHour = parseInt(task.scheduledTime.split(':')[0])
          return taskHour === hour
        })

        const isCurrentHour = hour === currentHour
        const isFocusHour = hourTasks.some(
          (task) => task.status === 'in_progress'
        )

        return (
          <div
            key={hour}
            ref={isCurrentHour ? currentHourRef : null}
            className={`relative flex gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2 ${
              isCurrentHour ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''
            }`}
          >
            <div
              className={`w-16 text-sm font-mono ${
                isCurrentHour
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {hour.toString().padStart(2, '0')}:00
            </div>
            <div className="flex-1 relative">
              {/* 현재 시간 막대 */}
              {isCurrentHour && (
                <div
                  className="absolute left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 z-10 shadow-sm"
                  style={{
                    top: `${(currentMinute / 60) * 100}%`,
                  }}
                >
                  <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full" />
                </div>
              )}

              {hourTasks.length > 0 ? (
                hourTasks.map((task) => {
                  const isFocusing = task.status === 'in_progress'
                  return (
                    <div
                      key={task.id}
                      className={`p-2 mb-1 rounded text-sm border ${
                        isFocusing
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800 shadow-sm'
                          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isFocusing && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          </div>
                        )}
                        <span className={isFocusing ? 'font-medium' : ''}>
                          {task.title}
                        </span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-zinc-300 dark:text-zinc-700 text-sm">
                  -
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
