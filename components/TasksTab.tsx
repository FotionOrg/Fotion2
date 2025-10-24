'use client'

import { Task } from '@/types'

interface TasksTabProps {
  tasks: Task[]
  onCreateTask: () => void
}

export default function TasksTab({ tasks, onCreateTask }: TasksTabProps) {
  const scheduledTasks = tasks.filter(task => task.scheduledDate || task.scheduledTime)
  const unscheduledTasks = tasks.filter(task => !task.scheduledDate && !task.scheduledTime)

  return (
    <div className="flex h-full">
      {/* 좌측: 캘린더 + 시간대별 작업 */}
      <div className="flex-1 border-r border-zinc-200 dark:border-zinc-800 overflow-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">예정된 작업</h2>

          {/* 간단한 날짜 선택 */}
          <div className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </div>
          </div>

          {/* 시간대별 작업 */}
          <div className="space-y-2">
            {scheduledTasks.length > 0 ? (
              scheduledTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center text-zinc-500 dark:text-zinc-400 py-8">
                예정된 작업이 없습니다
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 우측: 미분류 작업 (Backlog) */}
      <div className="w-96 overflow-auto bg-zinc-50 dark:bg-zinc-900">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">미분류 작업</h2>
          <div className="space-y-2">
            {unscheduledTasks.length > 0 ? (
              unscheduledTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="text-center text-zinc-500 dark:text-zinc-400 py-8 text-sm">
                미분류 작업이 없습니다
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 작업 생성 FAB */}
      <button
        onClick={onCreateTask}
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const sourceColors = {
    internal: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    notion: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    todoist: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  }

  return (
    <div className="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{task.title}</h3>
          {task.scheduledTime && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {task.scheduledTime}
            </p>
          )}
        </div>
        <span className={`px-2 py-0.5 text-xs rounded whitespace-nowrap ${sourceColors[task.source]}`}>
          {task.source === 'internal' ? '내부' : task.source}
        </span>
      </div>
    </div>
  )
}
