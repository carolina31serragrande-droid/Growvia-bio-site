import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center px-5 text-center text-sm font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "border border-paper bg-paper text-ink hover:bg-transparent hover:text-fg",
        secondary: "border border-line bg-transparent text-fg hover:border-paper hover:bg-paper hover:text-ink",
        soon: "border border-paper bg-transparent text-fg disabled:opacity-100",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      full: false,
    },
  },
);

export function Button({
  className,
  variant,
  full,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, full }), className)} {...props} />
  );
}
