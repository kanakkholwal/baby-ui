"use client";

import { useState } from "react";
import { Button, Toast, type ToastItem } from "@baby-ui/react";

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
			},
		]);
	}

	return (
		<>
			<Button onClick={notify}>Notify</Button>
			<Toast
				toasts={toasts}
				position="bottom-right"
				onDismiss={(id) => setToasts((current) => current.filter((t) => t.id !== id))}
			/>
		</>
	);
}
