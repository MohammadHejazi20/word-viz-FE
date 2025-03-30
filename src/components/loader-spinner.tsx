import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  className?: string;
}

export function LoadingSpinner({
  size = 24,
  text = "Loading...",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
    >
      <Loader2 className="animate-spin mb-2" size={size} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
