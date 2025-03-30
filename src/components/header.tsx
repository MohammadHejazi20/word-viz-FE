import * as React from "react";
import { Github, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectionStatus } from "./connection-status";
import { WebSocketStatus } from "@/lib/ws-enum";

interface HeaderProps {
  title: string;
  githubUrl?: string;
  apiDocsUrl?: string;
  connectionStatus?: WebSocketStatus | number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  githubUrl,
  apiDocsUrl,
  connectionStatus = WebSocketStatus.UNINSTANTIATED,
}) => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <ConnectionStatus status={connectionStatus} />
          {githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}

          {apiDocsUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={apiDocsUrl} target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-2 h-4 w-4" />
                API Docs
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
