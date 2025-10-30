'use client'

import { FocusSession } from '@/types'

interface SessionDetailModalProps {
  isOpen: boolean
  onClose: () => void
  session: FocusSession | null
}

export default function SessionDetailModal({ isOpen, onClose, session }: SessionDetailModalProps) {
  if (!isOpen || !session) return null

  const startTime = session.startTime
  const endTime = new Date(startTime.getTime() + session.duration)
  const actualMinutes = Math.round(session.duration / 60000)
  const isInProgress = !session.completed

  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
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
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold">집중 세션 상세</h2>
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
        <div className="p-6 space-y-4">
          {/* 작업 상태 */}
          {isInProgress && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">작업 중</span>
            </div>
          )}

          {/* 작업 제목 */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              작업
            </label>
            <p className="text-lg font-semibold">{session.taskTitle}</p>
          </div>

          {/* 날짜 */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              날짜
            </label>
            <p className="text-base">{formatDate(startTime)}</p>
          </div>

          {/* 시간 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                시작 시간
              </label>
              <p className="text-base font-mono">{formatTime(startTime)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                종료 시간
              </label>
              <p className="text-base font-mono">{formatTime(endTime)}</p>
            </div>
          </div>

          {/* 실제 소요 시간 */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              실제 소요 시간
            </label>
            <p className="text-base">
              {Math.floor(actualMinutes / 60) > 0 && (
                <span className="font-semibold">{Math.floor(actualMinutes / 60)}시간 </span>
              )}
              <span className="font-semibold">{actualMinutes % 60}분</span>
            </p>
          </div>

          {/* 타이머 모드 */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              모드
            </label>
            <p className="text-base">
              {session.mode === 'timer' ? '타이머' : '스톱워치'}
            </p>
          </div>

          {/* 완료 여부 */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              상태
            </label>
            <div className="flex items-center gap-2">
              {session.completed ? (
                <>
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-600 dark:text-green-400 font-medium">완료</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">미완료</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors font-medium"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
