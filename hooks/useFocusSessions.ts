'use client'

import { useState, useEffect } from 'react'
import { FocusSession } from '@/types'

const STORAGE_KEY = 'fotion2_focus_sessions'

/**
 * FocusSession을 LocalStorage에서 관리하는 custom hook
 * 실제로 집중 모드로 작업한 기록을 저장/조회
 */
export function useFocusSessions() {
  const [sessions, setSessions] = useState<FocusSession[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: LocalStorage에서 데이터 읽기
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedSessions = JSON.parse(stored, (key, value) => {
          // Date 객체 복원
          if (key === 'startTime' || key === 'endTime') {
            return value ? new Date(value) : undefined
          }
          return value
        })
        setSessions(parsedSessions)
      } else {
        // 저장된 데이터가 없으면 빈 배열로 시작
        setSessions([])
      }
    } catch (error) {
      console.error('Failed to load focus sessions from localStorage:', error)
      setSessions([])
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // sessions 변경 시 자동으로 LocalStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
      } catch (error) {
        console.error('Failed to save focus sessions to localStorage:', error)
      }
    }
  }, [sessions, isLoaded])

  // FocusSession 추가 (집중 모드 시작)
  const startSession = (
    taskId: string,
    taskTitle: string,
    mode: 'timer' | 'stopwatch',
    targetDuration?: number
  ): FocusSession => {
    const newSession: FocusSession = {
      id: Date.now().toString(),
      taskId,
      taskTitle,
      startTime: new Date(),
      duration: 0,
      completed: false,
      mode,
      targetDuration,
    }
    setSessions(prev => [...prev, newSession])
    return newSession
  }

  // FocusSession 종료
  const endSession = (sessionId: string, completed: boolean = false) => {
    setSessions(prev =>
      prev.map(session => {
        if (session.id === sessionId && !session.endTime) {
          const endTime = new Date()
          const duration = endTime.getTime() - session.startTime.getTime()
          return {
            ...session,
            endTime,
            duration,
            completed,
          }
        }
        return session
      })
    )
  }

  // FocusSession 삭제
  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId))
  }

  // 특정 기간의 세션 조회
  const getSessionsByDateRange = (startDate: Date, endDate: Date): FocusSession[] => {
    return sessions.filter(session => {
      const sessionDate = session.startTime
      return sessionDate >= startDate && sessionDate <= endDate
    })
  }

  // 특정 날짜의 세션 조회
  const getSessionsByDate = (date: Date): FocusSession[] => {
    return sessions.filter(session => {
      const sessionDate = session.startTime
      return (
        sessionDate.getDate() === date.getDate() &&
        sessionDate.getMonth() === date.getMonth() &&
        sessionDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // 오늘의 세션 조회
  const getTodaySessions = (): FocusSession[] => {
    return getSessionsByDate(new Date())
  }

  // LocalStorage 초기화
  const resetSessions = () => {
    setSessions([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    sessions,
    isLoaded,
    startSession,
    endSession,
    deleteSession,
    getSessionsByDateRange,
    getSessionsByDate,
    getTodaySessions,
    resetSessions,
  }
}
