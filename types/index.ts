// Task 관련 타입
export interface Task {
  id: string
  title: string
  content?: string // WYSIWYG 에디터 내용 (JSON 또는 HTML)
  status: 'todo' | 'in_progress' | 'completed'
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  source: 'internal' | 'notion' | 'todoist' // 작업 출처

  // 시간 관련
  scheduledDate?: Date
  scheduledTime?: string // "09:00" 형식
  duration?: number // 예상 소요 시간 (분)

  // 메타데이터
  createdAt: Date
  updatedAt: Date
}

// 타이머 관련 타입
export type TimerMode = 'timer' | 'stopwatch'

export interface TimerState {
  isRunning: boolean
  mode: TimerMode
  startTime: number // timestamp
  duration?: number // 타이머 모드일 때 목표 시간 (밀리초)
  elapsedTime: number // 경과 시간 (밀리초)
  taskId?: string // 현재 집중하고 있는 task
}

// 집중 세션 기록
export interface FocusSession {
  id: string
  taskId: string
  startTime: Date
  endTime?: Date
  duration: number // 실제 집중한 시간 (밀리초)
  completed: boolean // 타이머 완료 여부
}

// 탭 관련 타입
export type TabType = 'visualization' | 'tasks' | 'focus'

export interface AppTab {
  id: string
  type: TabType
  title: string
  isPinned: boolean // 고정 탭 (닫기 불가)

  // 집중 모드 탭 전용
  taskId?: string
  timerState?: TimerState
}

export type VisualizationView = 'hourly' | 'daily' | 'monthly'

// 앱 전역 상태
export interface AppState {
  tabs: AppTab[]
  activeTabId: string
  currentView: VisualizationView
  tasks: Task[]
  focusSessions: FocusSession[]
}
