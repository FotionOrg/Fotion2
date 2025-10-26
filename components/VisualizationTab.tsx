'use client'

import { VisualizationView, Task } from '@/types'
import { useState } from 'react'
import HourlyView from './views/HourlyView'
import WeeklyView from './views/WeeklyView'
import MonthlyView from './views/MonthlyView'

interface VisualizationTabProps {
  tasks: Task[]
  onStartFocus: () => void
}

export default function VisualizationTab({
  tasks,
  onStartFocus,
}: VisualizationTabProps) {
  const [currentView, setCurrentView] = useState<VisualizationView>('hourly')

  return (
    <div className="flex flex-col h-full">
      {/* 뷰 전환 탭 */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <ViewSwitchButton
          active={currentView === 'hourly'}
          onClick={() => setCurrentView('hourly')}
          title="시간별"
          icon={<ClockIcon />}
        />
        <ViewSwitchButton
          active={currentView === 'daily'}
          onClick={() => setCurrentView('daily')}
          title="주간"
          icon={<CalendarIcon />}
        />
        <ViewSwitchButton
          active={currentView === 'monthly'}
          onClick={() => setCurrentView('monthly')}
          title="월별"
          icon={<GridIcon />}
        />
      </div>

      {/* 뷰 내용 */}
      <div className="flex-1 overflow-auto p-4">
        {currentView === 'hourly' && <HourlyView tasks={tasks} />}
        {currentView === 'daily' && <WeeklyView tasks={tasks} />}
        {currentView === 'monthly' && <MonthlyView tasks={tasks} />}
      </div>

      {/* 집중 시작 FAB */}
      <button
        onClick={onStartFocus}
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center z-40"
        title="집중 모드 시작"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  )
}

// 뷰 전환 버튼 컴포넌트
interface ViewSwitchButtonProps {
  active: boolean
  onClick: () => void
  title: string
  icon: React.ReactNode
}

function ViewSwitchButton({ active, onClick, title, icon }: ViewSwitchButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 flex items-center justify-center transition-colors ${
        active
          ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
      }`}
      title={title}
    >
      {icon}
    </button>
  )
}

// 아이콘 컴포넌트들
function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}
