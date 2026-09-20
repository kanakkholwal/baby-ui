"use client";

import { Button, Toast, type ToastItem } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	function notify() {
		setToasts((current) => [
			...current,
			{
				id: crypto.randomUUID(),
				title: "Deployment ready",
				description: "acme-web is live.",
				tone: "success",
				action: { label: "View deployment", onClick: () => console.log("open") },
			},
		]);
	}

	return (
		<>
			<Button onClick={notify}>Notify</Button>
			<Toast
				toasts={toasts}
				position="bottom-right"
				variant="soft"
				max={4}
				onDismiss={(id) => setToasts((current) => current.filter((t) => t.id !== id))}
			/>
		</>
	);
}
