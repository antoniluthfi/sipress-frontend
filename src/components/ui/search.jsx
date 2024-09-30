import * as React from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils"

const Search = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-[50px] items-center rounded-md border border-input bg-[#F3F3F3] p-3 text-sm ring-offset-background",
          className,
        )}
      >
        <input
          {...props}
          type="search"
          ref={ref}
          className="w-full p-2 placeholder:text-muted-foreground bg-[#F3F3F3] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <SearchIcon className="h-[16px] w-[16px]" />
      </div>
    );
  },
);

Search.displayName = "Search";

export { Search };