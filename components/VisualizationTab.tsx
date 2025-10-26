"use client";

import { VisualizationView, Task } from "@/types";
import { useState, useRef, useEffect } from "react";

interface VisualizationTabProps {
  tasks: Task[];
  onStartFocus: () => void;
}

export default function VisualizationTab({
  tasks,
  onStartFocus,
}: VisualizationTabProps) {
  const [currentView, setCurrentView] = useState<VisualizationView>("hourly");

  return (
    <div className="flex flex-col h-full">
      {/* 뷰 전환 탭 */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <button
          onClick={() => setCurrentView("hourly")}
          className={`flex-1 py-3 flex items-center justify-center transition-colors ${
            currentView === "hourly"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="시간별"
        >
          <svg
            className="w-5 h-5"
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
        <button
          onClick={() => setCurrentView("daily")}
          className={`flex-1 py-3 flex items-center justify-center transition-colors ${
            currentView === "daily"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="주간"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button
          onClick={() => setCurrentView("monthly")}
          className={`flex-1 py-3 flex items-center justify-center transition-colors ${
            currentView === "monthly"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
          title="월별"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      {/* 뷰 내용 */}
      <div className="flex-1 overflow-auto p-4">
        {currentView === "hourly" && <HourlyView tasks={tasks} />}
        {currentView === "daily" && <DailyView tasks={tasks} />}
        {currentView === "monthly" && <MonthlyView tasks={tasks} />}
      </div>

      {/* 집중 시작 FAB */}
      <button
        onClick={onStartFocus}
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center"
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
  );
}

function HourlyView({ tasks }: { tasks: Task[] }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentHourRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 시 현재 시간대로 스크롤
  useEffect(() => {
    if (currentHourRef.current && containerRef.current) {
      const container = containerRef.current;
      const currentElement = currentHourRef.current;

      // 현재 시간 요소의 위치 계산
      const elementTop = currentElement.offsetTop;
      const containerHeight = container.clientHeight;
      const scrollPosition = elementTop - containerHeight / 3; // 화면 1/3 지점에 현재 시간 배치

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-2 overflow-auto h-full">
      <h2 className="text-lg font-semibold mb-4 sticky top-0 bg-zinc-50 dark:bg-zinc-950 z-10 pb-2">
        시간별 일정
      </h2>
      {hours.map((hour) => {
        const hourTasks = tasks.filter((task) => {
          if (!task.scheduledTime) return false;
          const taskHour = parseInt(task.scheduledTime.split(":")[0]);
          return taskHour === hour;
        });

        const isCurrentHour = hour === currentHour;
        const isFocusHour = hourTasks.some(
          (task) => task.status === "in_progress"
        );

        return (
          <div
            key={hour}
            ref={isCurrentHour ? currentHourRef : null}
            className={`relative flex gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2 ${
              isCurrentHour ? "bg-blue-50/30 dark:bg-blue-950/20" : ""
            }`}
          >
            <div
              className={`w-16 text-sm font-mono ${
                isCurrentHour
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {hour.toString().padStart(2, "0")}:00
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
                  const isFocusing = task.status === "in_progress";
                  return (
                    <div
                      key={task.id}
                      className={`p-2 mb-1 rounded text-sm border ${
                        isFocusing
                          ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800 shadow-sm"
                          : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isFocusing && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          </div>
                        )}
                        <span className={isFocusing ? "font-medium" : ""}>
                          {task.title}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-zinc-300 dark:text-zinc-700 text-sm">
                  -
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DailyView({ tasks }: { tasks: Task[] }) {
  const now = new Date();
  const currentDay = now.getDay(); // 0 (일) ~ 6 (토)
  const currentHour = now.getHours();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentHourRef = useRef<HTMLDivElement>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  // 주의 시작(월요일) 구하기
  const startOfWeek = new Date(now);
  const diff = now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1);
  startOfWeek.setDate(diff + weekOffset * 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // 각 요일별 날짜 계산
  const weekDates = weekDays.map((_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  // 요일/시간별 task 그룹핑
  const getTasksForDayAndHour = (dayIndex: number, hour: number) => {
    const targetDate = weekDates[dayIndex].toDateString();
    return tasks.filter((task) => {
      if (!task.scheduledDate || !task.scheduledTime) return false;
      const taskDate = new Date(task.scheduledDate).toDateString();
      const taskHour = parseInt(task.scheduledTime.split(":")[0]);
      return taskDate === targetDate && taskHour === hour;
    });
  };

  // 현재 시간으로 자동 스크롤
  useEffect(() => {
    if (weekOffset === 0 && currentHourRef.current && containerRef.current) {
      const container = containerRef.current;
      const currentElement = currentHourRef.current;

      const elementTop = currentElement.offsetTop;
      const containerHeight = container.clientHeight;
      const scrollPosition = elementTop - containerHeight / 3;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [weekOffset]);

  const goToPreviousWeek = () => setWeekOffset(weekOffset - 1);
  const goToNextWeek = () => setWeekOffset(weekOffset + 1);
  const goToCurrentWeek = () => setWeekOffset(0);

  return (
    <div ref={containerRef} className="overflow-auto h-full relative">
      {/* 헤더 + 주간 네비게이션 */}
      <div className="sticky top-0 bg-zinc-50 dark:bg-zinc-950 z-30 pb-2 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">주간 일정</h2>
        <div className="flex gap-1">
          <button
            onClick={goToCurrentWeek}
            className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors"
          >
            현재 주
          </button>
          <button
            onClick={goToPreviousWeek}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
            title="이전 주"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNextWeek}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
            title="다음 주"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="inline-block min-w-full">
        {/* 요일 헤더 (sticky) */}
        <div className="flex sticky top-[37px] bg-zinc-50 dark:bg-zinc-950 z-20 border-b-2 border-zinc-300 dark:border-zinc-700">
          <div className="w-16 flex-shrink-0" /> {/* 시간 칼럼 공간 */}
          {weekDays.map((day, index) => {
            const isToday = weekOffset === 0 && (index + 1) % 7 === currentDay;
            return (
              <div
                key={day}
                className={`flex-1 min-w-[100px] text-center py-2 font-semibold ${
                  isToday
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <div>{day}</div>
                <div className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                  {weekDates[index].getDate()}
                </div>
              </div>
            );
          })}
        </div>

        {/* 시간대별 행 */}
        {hours.map((hour) => {
          const isCurrentHour = weekOffset === 0 && hour === currentHour;

          return (
            <div
              key={hour}
              ref={isCurrentHour ? currentHourRef : null}
              className={`flex border-b border-zinc-200 dark:border-zinc-800 ${
                isCurrentHour ? "bg-blue-50/30 dark:bg-blue-950/20" : ""
              }`}
            >
              {/* 시간 */}
              <div
                className={`w-16 flex-shrink-0 py-2 px-2 text-xs text-center font-mono ${
                  isCurrentHour
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {hour.toString().padStart(2, "0")}:00
              </div>

              {/* 각 요일 셀 */}
              {weekDays.map((_, dayIndex) => {
                const cellTasks = getTasksForDayAndHour(dayIndex, hour);
                const isToday =
                  weekOffset === 0 && (dayIndex + 1) % 7 === currentDay;
                const isCurrentCell = isToday && isCurrentHour;

                return (
                  <div
                    key={dayIndex}
                    className={`flex-1 min-w-[100px] p-1 min-h-[60px] relative ${
                      isToday ? "bg-blue-50/20 dark:bg-blue-950/10" : ""
                    }`}
                  >
                    {/* 현재 시간 표시 */}
                    {isCurrentCell && (
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 z-10">
                        <div className="absolute -left-1 -top-1 w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full" />
                      </div>
                    )}

                    {cellTasks.map((task) => {
                      const isFocusing = task.status === "in_progress";
                      return (
                        <div
                          key={task.id}
                          className={`text-xs p-1 mb-1 rounded truncate ${
                            isFocusing
                              ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                              : "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
                          }`}
                          title={task.title}
                        >
                          {isFocusing && (
                            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
                          )}
                          {task.title}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthlyView({ tasks }: { tasks: Task[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 해당 월의 첫날과 마지막날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 캘린더 시작일 (이전 달 날짜 포함)
  const startDay = new Date(firstDay);
  startDay.setDate(startDay.getDate() - ((firstDay.getDay() + 6) % 7)); // 월요일부터 시작

  // 6주치 날짜 생성
  const calendarDays: Date[] = [];
  const currentDay = new Date(startDay);
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // 특정 날짜의 task 개수 계산
  const getTaskCountForDate = (date: Date) => {
    const dateString = date.toDateString();
    return tasks.filter((task) => {
      if (!task.scheduledDate) return false;
      return new Date(task.scheduledDate).toDateString() === dateString;
    }).length;
  };

  // 이전/다음 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {year}년 {month + 1}월
        </h2>
        <div className="flex gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition-colors"
          >
            오늘
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
        {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
          <div
            key={day}
            className={`text-center py-2 text-sm font-semibold bg-zinc-50 dark:bg-zinc-900 ${
              index >= 5
                ? "text-red-600 dark:text-red-400"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const isToday = date.toDateString() === today.toDateString();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const taskCount = getTaskCountForDate(date);

          return (
            <div
              key={index}
              className={`min-h-[80px] p-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer relative ${
                !isCurrentMonth ? "opacity-40" : ""
              }`}
            >
              {/* 날짜 숫자 */}
              <div
                className={`text-sm font-medium ${
                  isToday
                    ? "flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full"
                    : isWeekend
                    ? "text-red-600 dark:text-red-400"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {date.getDate()}
              </div>

              {/* Task 표시 */}
              {taskCount > 0 && (
                <div className="mt-1">
                  {taskCount <= 3 ? (
                    // 3개 이하: 점으로 표시
                    <div className="flex gap-1">
                      {Array.from({ length: taskCount }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"
                        />
                      ))}
                    </div>
                  ) : (
                    // 4개 이상: 숫자로 표시
                    <div className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                      {taskCount}
                    </div>
                  )}
                </div>
              )}

              {/* Task 밀도에 따른 배경 색상 */}
              {taskCount > 0 && (
                <div
                  className="absolute inset-0 bg-blue-500 dark:bg-blue-600 pointer-events-none"
                  style={{
                    opacity: Math.min(taskCount * 0.05, 0.2),
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
