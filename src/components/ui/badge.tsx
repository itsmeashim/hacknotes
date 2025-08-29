import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2.5 py-0.5 font-medium text-xs shadow-sm transition-all duration-150 hover:shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/90 [a&]:hover:bg-primary/90",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 [a&]:hover:bg-secondary/90",
				destructive:
					"border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/80 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
				outline:
					"text-foreground hover:bg-accent hover:text-accent-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				low: "border-transparent bg-blue-500/90 text-white hover:bg-blue-500",
				medium:
					"border-transparent bg-yellow-500/90 text-white hover:bg-yellow-500",
				high: "border-transparent bg-orange-500/90 text-white hover:bg-orange-500",
				critical:
					"border-transparent bg-red-500/90 text-white hover:bg-red-500",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(
				badgeVariants({ variant }),
				className,
				"cursor-pointer hover:scale-105 active:scale-95",
			)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
