import type { ReactNode } from "react";

type Size = "sm" | "md" | "lg" | "xl" | "full";

// Literal classes so Tailwind sees them; auto demos are gitignored and never scanned.
const WIDTH: Record<Size, string> = {
	sm: "w-full max-w-sm",
	md: "w-full max-w-md",
	lg: "w-full max-w-2xl",
	xl: "w-full max-w-4xl",
	full: "w-full",
};

export function DemoFrame({
	size = "full",
	children,
}: {
	size?: Size;
	children: ReactNode;
}) {
	return <div className={WIDTH[size]}>{children}</div>;
}
