import { Task } from '@/types'

/**
 * 샘플 Task 데이터
 * 실제 환경에서는 API 호출로 대체됩니다.
 */
export const mockTasks: Task[] = [
  {
    id: '1',
    title: '프로젝트 기획 회의',
    content: '새로운 프로젝트의 전반적인 기획 방향 논의',
    status: 'todo',
    priority: 'high',
    source: 'internal',
    scheduledDate: new Date(),
    scheduledTime: '10:00',
    tags: ['회의', '기획'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: '디자인 시스템 구축',
    content: 'Figma에서 컴포넌트 라이브러리 구축',
    status: 'in_progress',
    priority: 'high',
    source: 'internal',
    scheduledDate: new Date(),
    scheduledTime: '14:00',
    tags: ['디자인', '개발'],
    duration: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'API 문서 작성',
    content: 'RESTful API 엔드포인트 문서화',
    status: 'todo',
    priority: 'medium',
    source: 'notion',
    scheduledDate: new Date(),
    scheduledTime: '16:00',
    tags: ['문서', '백엔드'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: '코드 리뷰',
    content: 'PR #123 리뷰 및 피드백',
    status: 'todo',
    priority: 'medium',
    source: 'internal',
    scheduledDate: new Date(),
    scheduledTime: '09:00',
    tags: ['개발', '리뷰'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: '주간 회고',
    content: '이번 주 진행 사항 정리 및 회고',
    status: 'todo',
    priority: 'low',
    source: 'todoist',
    scheduledDate: new Date(),
    scheduledTime: '17:30',
    tags: ['회의'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: '버그 수정 - 로그인 이슈',
    content: '로그인 시 토큰 만료 오류 수정',
    status: 'in_progress',
    priority: 'high',
    source: 'internal',
    scheduledDate: new Date(),
    scheduledTime: '11:30',
    tags: ['버그', '긴급'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 미분류 작업들 (시간 미지정)
  {
    id: '7',
    title: '블로그 포스트 작성',
    content: 'React 성능 최적화에 대한 글 작성',
    status: 'todo',
    priority: 'low',
    source: 'internal',
    tags: ['블로그', '작성'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    title: '라이브러리 업데이트',
    content: 'Next.js 및 종속성 최신 버전으로 업데이트',
    status: 'todo',
    priority: 'medium',
    source: 'notion',
    tags: ['유지보수'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    title: '팀 빌딩 이벤트 기획',
    content: '다음 달 팀 빌딩 아이디어 제안',
    status: 'todo',
    priority: 'low',
    source: 'todoist',
    tags: ['팀'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    title: '데이터베이스 마이그레이션',
    content: 'PostgreSQL 15로 업그레이드',
    status: 'todo',
    priority: 'high',
    source: 'internal',
    tags: ['DB', '인프라'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

/**
 * 주간 스케줄 샘플 데이터
 * 각 요일별로 다양한 시간대에 task 배치
 */
export const mockWeeklyTasks: Task[] = [
  // 월요일
  {
    id: 'w1',
    title: '주간 회의',
    status: 'completed',
    priority: 'high',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-6), // 이번 주 월요일
    scheduledTime: '09:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w2',
    title: '스프린트 플래닝',
    status: 'completed',
    priority: 'high',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-6),
    scheduledTime: '14:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w3',
    title: '이메일 확인',
    status: 'completed',
    priority: 'low',
    source: 'todoist',
    scheduledDate: getDateByDayOffset(-6),
    scheduledTime: '08:30',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 화요일
  {
    id: 'w4',
    title: '고객 미팅',
    status: 'completed',
    priority: 'high',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-5),
    scheduledTime: '10:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w5',
    title: '프로토타입 개발',
    status: 'completed',
    priority: 'high',
    source: 'notion',
    scheduledDate: getDateByDayOffset(-5),
    scheduledTime: '14:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w6',
    title: '데일리 스탠드업',
    status: 'completed',
    priority: 'medium',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-5),
    scheduledTime: '09:30',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 수요일
  {
    id: 'w7',
    title: '개발 작업',
    status: 'completed',
    priority: 'medium',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-4),
    scheduledTime: '13:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w8',
    title: 'UI 리뷰',
    status: 'completed',
    priority: 'medium',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-4),
    scheduledTime: '15:30',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w9',
    title: '운동하기',
    status: 'completed',
    priority: 'low',
    source: 'todoist',
    scheduledDate: getDateByDayOffset(-4),
    scheduledTime: '18:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 목요일
  {
    id: 'w10',
    title: '테스트 작성',
    status: 'completed',
    priority: 'medium',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-3),
    scheduledTime: '11:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w11',
    title: '기술 문서 작성',
    status: 'completed',
    priority: 'medium',
    source: 'notion',
    scheduledDate: getDateByDayOffset(-3),
    scheduledTime: '14:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w12',
    title: '팀 세미나',
    status: 'completed',
    priority: 'high',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-3),
    scheduledTime: '16:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 금요일 (오늘)
  ...mockTasks.filter(t => t.scheduledDate && t.scheduledTime),
  // 토요일
  {
    id: 'w13',
    title: '개인 프로젝트',
    status: 'todo',
    priority: 'low',
    source: 'internal',
    scheduledDate: getDateByDayOffset(1),
    scheduledTime: '10:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w14',
    title: '책 읽기',
    status: 'todo',
    priority: 'low',
    source: 'todoist',
    scheduledDate: getDateByDayOffset(1),
    scheduledTime: '14:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 일요일
  {
    id: 'w15',
    title: '주간 계획 세우기',
    status: 'todo',
    priority: 'medium',
    source: 'internal',
    scheduledDate: getDateByDayOffset(2),
    scheduledTime: '10:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w16',
    title: '운동하기',
    status: 'todo',
    priority: 'low',
    source: 'todoist',
    scheduledDate: getDateByDayOffset(2),
    scheduledTime: '16:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 다음 주 월요일
  {
    id: 'w17',
    title: '프로젝트 킥오프',
    status: 'todo',
    priority: 'high',
    source: 'internal',
    scheduledDate: getDateByDayOffset(3),
    scheduledTime: '09:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w18',
    title: '아키텍처 설계',
    status: 'todo',
    priority: 'high',
    source: 'notion',
    scheduledDate: getDateByDayOffset(3),
    scheduledTime: '14:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // 지난 주 데이터
  {
    id: 'w19',
    title: '월간 보고서 작성',
    status: 'completed',
    priority: 'high',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-10),
    scheduledTime: '10:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w20',
    title: '성과 평가 회의',
    status: 'completed',
    priority: 'high',
    source: 'internal',
    scheduledDate: getDateByDayOffset(-10),
    scheduledTime: '15:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'w21',
    title: '코드 리팩토링',
    status: 'completed',
    priority: 'medium',
    source: 'notion',
    scheduledDate: getDateByDayOffset(-9),
    scheduledTime: '13:00',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

/**
 * 날짜 오프셋으로 Date 객체 생성
 * @param offset - 오늘 기준 일 수 (음수면 과거, 양수면 미래)
 */
function getDateByDayOffset(offset: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date
}

/**
 * 월별 샘플 데이터 생성
 * @param year - 연도
 * @param month - 월 (0-11)
 */
export function generateMonthlyTasks(year: number, month: number): Task[] {
  const tasks: Task[] = []
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const numTasks = Math.floor(Math.random() * 5) // 0-4개 task

    for (let i = 0; i < numTasks; i++) {
      tasks.push({
        id: `monthly-${year}-${month}-${day}-${i}`,
        title: `Task ${i + 1}`,
        status: Math.random() > 0.5 ? 'completed' : 'todo',
        priority: 'medium',
        source: 'internal',
        scheduledDate: date,
        scheduledTime: `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:00`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  return tasks
}
