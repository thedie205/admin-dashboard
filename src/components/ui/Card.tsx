import type { ReactNode } from "react";

export interface CardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({
  title,
  action,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h3 className="text-sm font-semibold text-gray-800">
              {title}
            </h3>
          )}

          {action}
        </div>
      )}

      {children}
    </div>
  );
}