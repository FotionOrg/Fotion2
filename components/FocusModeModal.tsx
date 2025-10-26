'use client'

import { Task, TimerMode } from '@/types'
import { useState, useRef, useEffect } from 'react'

interface FocusModeModalProps {
  isOpen: boolean
  onClose: () => void
  tasks: Task[]
  onStart: (taskId: string, mode: TimerMode, duration?: number) => void
}

const PRESET_DURATIONS = [
  { label: '25분', value: 25 * 60 * 1000 },
  { label: '50분', value: 50 * 60 * 1000 },
]

export default function FocusModeModal({ isOpen, onClose, tasks, onStart }: FocusModeModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [timerMode, setTimerMode] = useState<TimerMode>('timer')
  const [customDuration, setCustomDuration] = useState(25)
  const [selectedPreset, setSelectedPreset] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('')
      setSelectedTask(null)
      setTimerMode('timer')
      setCustomDuration(25)
      setSelectedPreset(0)
    }
  }, [isOpen])

  if (!isOpen) return null

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const recentTasks = tasks.slice(0, 5) // 최근 5개 작업

  const handleStart = () => {
    if (!selectedTask) return

    let duration: number | undefined
    if (timerMode === 'timer') {
      if (selectedPreset < PRESET_DURATIONS.length) {
        duration = PRESET_DURATIONS[selectedPreset].value
      } else {
        duration = customDuration * 60 * 1000
      }
    }

    onStart(selectedTask.id, timerMode, duration)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold">집중 시작</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* 작업 검색 */}
          <div>
            <label className="block text-sm font-medium mb-2">작업 선택</label>
            <input
              type="text"
              placeholder="작업 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 작업 리스트 */}
          <div className="space-y-2 max-h-48 overflow-auto">
            {searchQuery ? (
              filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    isSelected={selectedTask?.id === task.id}
                    onSelect={() => setSelectedTask(task)}
                  />
                ))
              ) : (
                <p className="text-center text-zinc-500 dark:text-zinc-400 py-4 text-sm">
                  검색 결과가 없습니다
                </p>
              )
            ) : (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">최근 작업</p>
                {recentTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    isSelected={selectedTask?.id === task.id}
                    onSelect={() => setSelectedTask(task)}
                  />
                ))}
              </>
            )}
          </div>

          {/* 타이머 모드 선택 */}
          <div>
            <label className="block text-sm font-medium mb-3">모드 선택</label>
            <div className="flex gap-3">
              <button
                onClick={() => setTimerMode('timer')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  timerMode === 'timer'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <div className="font-medium">타이머</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">설정한 시간 측정</div>
              </button>
              <button
                onClick={() => setTimerMode('stopwatch')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  timerMode === 'stopwatch'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <div className="font-medium">스톱워치</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">무제한 측정</div>
              </button>
            </div>
          </div>

          {/* 타이머 시간 설정 */}
          {timerMode === 'timer' && (
            <div>
              <label className="block text-sm font-medium mb-3">시간 설정</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {PRESET_DURATIONS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPreset(index)}
                    className={`py-2 px-4 rounded-lg border-2 transition-all ${
                      selectedPreset === index
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedPreset(PRESET_DURATIONS.length)}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    selectedPreset === PRESET_DURATIONS.length
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  커스텀
                </button>
              </div>

              {selectedPreset === PRESET_DURATIONS.length && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(parseInt(e.target.value) || 1)}
                    className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">분</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors font-medium"
          >
            취소
          </button>
          <button
            onClick={handleStart}
            disabled={!selectedTask}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed"
          >
            시작
          </button>
        </div>
      </div>
    </div>
  )
}

function TaskItem({ task, isSelected, onSelect }: { task: Task; isSelected: boolean; onSelect: () => void }) {
  const sourceColors = {
    internal: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    notion: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    todoist: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    linear: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400',
  }

  return (
    <button
      onClick={onSelect}
      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{task.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {task.scheduledTime && (
              <span>🕐 {task.scheduledTime}</span>
            )}
            {task.estimatedDuration && (
              <span>⏱ {task.estimatedDuration}분</span>
            )}
          </div>
        </div>
        <span className={`px-2 py-0.5 text-xs rounded whitespace-nowrap ${sourceColors[task.source]}`}>
          {task.source === 'internal' ? '내부' :
           task.source === 'notion' ? 'Notion' :
           task.source === 'linear' ? 'Linear' :
           task.source === 'todoist' ? 'Todoist' : task.source}
        </span>
      </div>
    </button>
  )
}
