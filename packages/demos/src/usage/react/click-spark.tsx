import { ClickSpark } from "@baby-ui/react";
import type { ReactNode } from "react";

// Once, near the root of the app: every press on the page bursts.
export function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<ClickSpark />
			{children}
		</>
	);
}
