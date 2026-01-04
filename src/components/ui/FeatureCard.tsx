import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  iconBg?: string;
}

export function FeatureCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg = "bg-primary/10",
}: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-dark rounded-xl shadow-card p-5 flex items-center justify-between gap-4 animate-fade-in">
      <div>
        <p className="text-sm text-gray-sec">{title}</p>
        <h4 className="text-2xl font-bold text-dark dark:text-white mt-1">
          {value}
        </h4>
        <span
          className={cn(
            "inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full",
            changeType === "positive"
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          )}
        >
          {change}
        </span>
      </div>
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center",
          iconBg
        )}
      >
        <Icon className="text-primary" size={28} />
      </div>
    </div>
  );
}
