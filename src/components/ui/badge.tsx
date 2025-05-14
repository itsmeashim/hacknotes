import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-150 overflow-hidden shadow-sm hover:shadow",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/80",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        low:
          "border-transparent bg-blue-500/90 text-white hover:bg-blue-500",
        medium:
          "border-transparent bg-yellow-500/90 text-white hover:bg-yellow-500",
        high:
          "border-transparent bg-orange-500/90 text-white hover:bg-orange-500",
        critical:
          "border-transparent bg-red-500/90 text-white hover:bg-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot='badge'
      className={cn(
        badgeVariants({ variant }),
        className,
        "cursor-pointer hover:scale-105 active:scale-95"
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
