"use client";

import { AppTab } from "@/types";
import Logo from "./Logo";

interface BrowserTabBarProps {
  tabs: AppTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onShowShortcuts?: () => void;
}

export default function BrowserTabBar({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  onShowShortcuts,
}: BrowserTabBarProps) {
  const handleCloseClick = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose(tabId);
  };

  const getTabIcon = (type: AppTab["type"]) => {
    switch (type) {
      case "visualization":
        return "🏠";
      case "tasks":
        return "📋";
      case "focus":
        return "⏱️";
      default:
        return "";
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-surface-secondary dark:bg-surface border-b border-zinc-200 dark:border-zinc-800 z-50">
      {/* 로고 - 절대 위치로 왼쪽 끝에 고정
          - sm (640px 미만): 숨김
          - md (768px ~ 1024px): 숨김 (탭과 겹칠 수 있음)
          - lg (1024px 이상): 표시
      */}
      <div className="absolute left-4 top-0 bottom-0 hidden lg:flex items-center z-10">
        <Logo className="w-7 h-7" />
      </div>

      {/* 탭들
          - sm: 패딩 없음
          - lg: 로고 공간만큼 왼쪽 패딩
      */}
      <div className="flex items-start overflow-x-auto max-w-screen-xl mx-auto lg:pl-16">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;

          return (
            <div
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 min-w-[120px] max-w-[200px]
                transition-all border-r border-zinc-200 dark:border-zinc-800 cursor-pointer
                ${
                  isActive
                    ? "bg-background dark:bg-background text-foreground dark:text-foreground border-b-2 border-b-primary-500"
                    : "bg-surface-secondary dark:bg-surface-secondary text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }
              `}
            >
              {/* 아이콘 */}
              <span className="text-base flex-shrink-0">
                {getTabIcon(tab.type)}
              </span>

              {/* 제목 */}
              <span className="flex-1 text-sm font-medium truncate text-left">
                {tab.title}
              </span>

              {/* 타이머 표시 (집중 모드 탭) */}
              {tab.type === "focus" && tab.timerState && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono flex-shrink-0">
                  {formatTimer(tab.timerState)}
                </span>
              )}

              {/* 닫기 버튼 (고정되지 않은 탭만) */}
              {!tab.isPinned && (
                <button
                  onClick={(e) => handleCloseClick(e, tab.id)}
                  className="flex-shrink-0 p-1 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded transition-colors"
                  title="탭 닫기"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}

              {/* 활성 탭 표시 (하단 강조) - 이미 border로 처리됨 */}
            </div>
          );
        })}
      </div>

      {/* 단축키 도움말 버튼 - 오른쪽 끝 */}
      {onShowShortcuts && (
        <div className="absolute right-4 top-0 bottom-0 flex items-center z-10">
          <button
            onClick={onShowShortcuts}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors group"
            title="키보드 단축키 (Shift + ?)"
          >
            <svg
              className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function formatTimer(timerState: AppTab["timerState"]): string {
  if (!timerState) return "";

  const now = Date.now();
  const elapsed = timerState.isRunning
    ? now - timerState.startTime
    : timerState.elapsedTime;

  if (timerState.mode === "timer" && timerState.duration) {
    const remaining = Math.max(0, timerState.duration - elapsed);
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    const totalSeconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}
