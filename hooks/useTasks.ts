'use client'

import { useState, useEffect } from 'react'
import { Task } from '@/types'
import { mockWeeklyTasks } from '@/lib/mockData'

const STORAGE_KEY = 'fotion2_tasks'

/**
 * LocalStorage를 DB처럼 사용하는 custom hook
 * 초기 데이터는 mockWeeklyTasks를 사용하되, LocalStorage에 저장된 데이터가 있으면 우선 사용
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: LocalStorage에서 데이터 읽기
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedTasks = JSON.parse(stored, (key, value) => {
          // Date 객체 복원
          if (key === 'scheduledDate' || key === 'createdAt' || key === 'updatedAt') {
            return value ? new Date(value) : undefined
          }
          return value
        })
        setTasks(parsedTasks)
      } else {
        // 저장된 데이터가 없으면 mock 데이터 사용
        setTasks(mockWeeklyTasks)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockWeeklyTasks))
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error)
      setTasks(mockWeeklyTasks)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // tasks 변경 시 자동으로 LocalStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      } catch (error) {
        console.error('Failed to save tasks to localStorage:', error)
      }
    }
  }, [tasks, isLoaded])

  // Task 추가
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks(prev => [...prev, newTask])
    return newTask
  }

  // Task 수정
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    )
  }

  // Task 삭제
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  // Task 상태 변경
  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    updateTask(taskId, { status })
  }

  // LocalStorage 초기화 (목업 데이터로 리셋)
  const resetToMockData = () => {
    setTasks(mockWeeklyTasks)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockWeeklyTasks))
  }

  return {
    tasks,
    isLoaded,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    resetToMockData,
  }
}
