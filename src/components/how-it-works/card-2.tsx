export const Card2 = () => {
  return (
    <div className="flex h-[200px] w-[373px] items-center justify-center rounded-lg border border-gray-200 p-[2px]">
      <div className="card2-inner shadow-border-sm h-[150px] w-[280px] overflow-hidden rounded-md bg-white">
        <div className="flex h-full w-full flex-col justify-between p-3.5">
          {/* File row */}
          <div
            className="card2-row flex items-center justify-between gap-2"
            style={{ animationDelay: "0ms" }}
          >
            <div className="flex min-w-0 items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-gray-400"
              >
                <path
                  d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 2v5h5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate font-mono text-[11px] text-gray-700">
                Design_System_v2.fig
              </span>
            </div>
            <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-amber-700">
              Revision 1 of 2
            </span>
          </div>

          {/* Scope row */}
          <div
            className="card2-row flex items-center gap-1.5"
            style={{ animationDelay: "60ms" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-blue-500"
            >
              <path
                d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="m9 12 2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-blue-700">
              Scope: within agreement
            </span>
          </div>

          {/* Feedback preview skeleton */}
          <div className="flex flex-col gap-1.5">
            <span
              className="card2-row text-[10px] text-gray-400"
              style={{ animationDelay: "120ms" }}
            >
              Feedback preview
            </span>
            <div
              className="card2-bar h-1.5 w-full origin-left rounded-full bg-gray-100"
              style={{ animationDelay: "160ms" }}
            />
            <div
              className="card2-bar h-1.5 w-4/5 origin-left rounded-full bg-gray-100"
              style={{ animationDelay: "200ms" }}
            />
            <div
              className="card2-bar h-1.5 w-3/5 origin-left rounded-full bg-gray-100"
              style={{ animationDelay: "240ms" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .card2-row {
          animation: card2-fade-up 240ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .card2-bar {
          animation: card2-grow-in 200ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes card2-fade-up {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes card2-grow-in {
          from {
            opacity: 0;
            transform: scaleX(0.92);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .card2-row,
          .card2-bar {
            animation-duration: 1ms;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};
