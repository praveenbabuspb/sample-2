"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: (NavItem | React.ReactNode)[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-background/50 border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item, index) => {
          if (React.isValidElement(item)) {
            return <React.Fragment key={index}>{item}</React.Fragment>;
          }
          
          const navItem = item as NavItem;
          const Icon = navItem.icon
          const isActive = pathname === navItem.url

          return (
            <Link
              key={navItem.name}
              href={navItem.url}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "text-primary",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </div>
              <span className="hidden md:inline">{navItem.name}</span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-muted rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Lamp (points up) */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
