import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export function Card({
  children,
  className,
  title,
  subtitle,
  action,
  noPadding = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-dark rounded-xl shadow-card animate-fade-in",
        !noPadding && "p-5",
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-5">
          <div>
            {title && (
              <h4 className="text-lg font-semibold text-dark dark:text-white">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="text-sm text-gray-sec mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
