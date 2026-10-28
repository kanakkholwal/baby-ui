import { LoadingScreen } from "@baby-ui/react";

export function Example({ ready }: { ready: boolean }) {
	return (
		<LoadingScreen
			open={!ready}
			indicator="dots"
			logo={
				<svg viewBox="0 0 24 24" aria-hidden>
					<circle cx="12" cy="12" r="9" fill="currentColor" />
				</svg>
			}
		/>
	);
}
