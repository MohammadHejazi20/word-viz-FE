import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type ColorVariant =
  | "blue"
  | "purple"
  | "emerald"
  | "amber"
  | "rose"
  | "indigo"
  | "teal"
  | "orange";

interface ColorBadgeProps {
  color: ColorVariant;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

const colorStyles: Record<ColorVariant, string> = {
  blue: "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200",
  purple: "bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200",
  emerald:
    "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200",
  rose: "bg-rose-50 text-rose-700 hover:bg-rose-50 border-rose-200",
  indigo: "bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-200",
  teal: "bg-teal-50 text-teal-700 hover:bg-teal-50 border-teal-200",
  orange: "bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200",
};

export function ColorBadge({
  color,
  icon: Icon,
  children,
  className,
}: ColorBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        colorStyles[color],
        "flex items-center gap-1 w-fit",
        className
      )}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </Badge>
  );
}
