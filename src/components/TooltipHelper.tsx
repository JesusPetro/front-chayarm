import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/ToolTip";

import type { ReactNode } from "react";

interface TooltipHelperProps {
  children: ReactNode;
  text: string;
}

export default function TooltipHelper({ children, text }: TooltipHelperProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
