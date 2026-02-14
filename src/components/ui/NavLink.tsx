"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps {
  to: string;
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string | undefined);
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ to, className, activeClassName, pendingClassName, ...props }, ref) => {
    const pathname = usePathname();
    // Simple active check: exact match or starts with if it's not root
    const isActive = to === "/" ? pathname === "/" : pathname?.startsWith(to);
    const isPending = false; // Not supported in this simplified version

    let finalClassName: string | undefined = "";
    if (typeof className === "function") {
      finalClassName = className({ isActive, isPending });
    } else {
      finalClassName = cn(className, isActive && activeClassName, isPending && pendingClassName);
    }

    return (
      <Link
        ref={ref}
        href={to}
        className={finalClassName}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
