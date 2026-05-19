import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-[var(--space-3)] border-b border-[hsl(var(--primary)/30%)] pb-[var(--space-2)] mb-[var(--space-4)]",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center gap-[var(--space-1)] border-none bg-transparent p-0 font-mono text-[var(--text-sm)] font-bold tracking-[0.5px] text-[hsl(var(--muted-foreground))] cursor-pointer transition-[color,text-shadow] duration-[var(--duration-fast)] ease-[var(--ease-smooth)]",
      "hover:text-[hsl(var(--hud-text-primary))]",
      "focus-visible:outline-2 focus-visible:outline-[hsl(var(--ring))] focus-visible:outline-offset-2 focus-visible:rounded-[var(--radius-sm)]",
      "data-[state=active]:text-[hsl(var(--primary))] data-[state=active]:[text-shadow:0_0_5px_hsl(var(--hud-skill-cyan)/50%)]",
      "data-[state=active]:after:absolute data-[state=active]:after:bottom-[-9px] data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-[hsl(var(--primary))] data-[state=active]:after:[box-shadow:0_0_8px_hsl(var(--primary))]",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-0 focus-visible:outline-2 focus-visible:outline-[hsl(var(--ring))] focus-visible:outline-offset-2",
      "data-[state=active]:animate-[tab-fade_var(--duration-base)_var(--ease-smooth)_forwards]",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
