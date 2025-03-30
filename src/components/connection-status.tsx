import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { WebSocketStatus } from "@/lib/ws-enum";
import { AlertCircle, Clock, MinusCircle, Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  status: WebSocketStatus | number;
  showText?: boolean;
  className?: string;
}

export function ConnectionStatus({
  status,
  showText = true,
  className,
}: ConnectionStatusProps) {
  // Map status to display information
  const statusInfo: Record<
    WebSocketStatus,
    {
      label: string;
      color: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
      description: string;
    }
  > = {
    [WebSocketStatus.UNINSTANTIATED]: {
      label: "Not Connected",
      color: "bg-gray-200 text-gray-800 hover:bg-gray-200",
      icon: MinusCircle,
      description: "WebSocket not initialized",
    },
    [WebSocketStatus.CONNECTING]: {
      label: "Connecting",
      color: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      icon: Clock,
      description: "Establishing connection...",
    },
    [WebSocket.OPEN]: {
      label: "Connected",
      color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
      icon: Wifi,
      description: "WebSocket connection is open and active",
    },
    [WebSocket.CLOSING]: {
      label: "Closing",
      color: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      icon: AlertCircle,
      description: "Connection is closing",
    },
    [WebSocket.CLOSED]: {
      label: "Disconnected",
      color: "bg-rose-100 text-rose-800 hover:bg-rose-100",
      icon: WifiOff,
      description: "WebSocket connection is closed",
    },
  };

  const currentStatus =
    statusInfo[status as WebSocketStatus] || statusInfo[WebSocketStatus.CLOSED];
  const StatusIcon = currentStatus.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            data-testid="connection-status"
            variant="outline"
            className={cn(
              "flex items-center gap-1 px-2 py-1 h-9 transition-colors",
              currentStatus.color,
              className
            )}
          >
            <StatusIcon className="h-4 w-4" />
            {showText && <span>{currentStatus.label}</span>}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{currentStatus.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
