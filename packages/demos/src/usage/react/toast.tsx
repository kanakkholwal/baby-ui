import { Button, Toaster, toast } from "@baby-ui/react";

export function Example() {
	return (
		<>
			<Button
				onClick={() =>
					toast.success("Deployment ready", { description: "acme-web is live." })
				}
			>
				Notify
			</Button>
			<Toaster />
		</>
	);
}
