"use client";

import { FocusSession } from "@/types";
import { useRef, useEffect } from "react";

interface HourlyViewProps {
  sessions: FocusSession[];
}

export default function HourlyView({ sessions }: HourlyViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentHourRef = useRef<HTMLDivElement>(null);

  // 오늘 날짜의 세션만 필터링
  const todaySessions = sessions.filter(session => {
    const sessionDate = session.startTime;
    const today = new Date();
    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()
    );
  });

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
    <div
      ref={containerRef}
      className="space-y-2 overflow-auto h-full max-w-7xl mx-auto px-4"
    >
      <h2 className="text-lg font-semibold mb-4 sticky top-0 bg-background dark:bg-background z-10 pb-2">
        시간별 일정
      </h2>
      {hours.map((hour) => {
        // 해당 시간대의 세션들 필터링
        const hourSessions = todaySessions.filter((session) => {
          const sessionHour = session.startTime.getHours();
          return sessionHour === hour;
        });

        const isCurrentHour = hour === currentHour;

        return (
          <div
            key={hour}
            ref={isCurrentHour ? currentHourRef : null}
            className={`relative flex gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-2 ${
              isCurrentHour ? "bg-primary-50/30 dark:bg-primary-950/20" : ""
            }`}
          >
            <div
              className={`w-16 text-sm font-mono ${
                isCurrentHour
                  ? "text-primary-600 dark:text-primary-400 font-semibold"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {hour.toString().padStart(2, "0")}:00
            </div>
            <div className="flex-1 relative">
              {/* 현재 시간 막대 */}
              {isCurrentHour && (
                <div
                  className="absolute left-0 right-0 h-0.5 bg-primary-500 dark:bg-primary-400 z-10 shadow-sm"
                  style={{
                    top: `${(currentMinute / 60) * 100}%`,
                  }}
                >
                  <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-primary-500 dark:bg-primary-400 rounded-full" />
                </div>
              )}

              {hourSessions.length > 0 ? (
                hourSessions.map((session) => {
                  const startMinute = session.startTime.getMinutes();
                  const durationMinutes = Math.round(session.duration / 60000);

                  return (
                    <div
                      key={session.id}
                      className="p-2 mb-1 rounded text-sm border bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span className="font-medium">{session.taskTitle}</span>
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {hour.toString().padStart(2, "0")}:
                          {startMinute.toString().padStart(2, "0")}
                          {session.endTime && ` (${durationMinutes}분)`}
                        </div>
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
