"use client";

import { SidebarNav } from "@baby-ui/react";

export function Example() {
	return (
		<SidebarNav
			workspace={{ name: "Acme Studio", monogram: "A" }}
			navItems={[{ key: "home", label: "Home" }]}
			recents={[{ id: "onboarding", label: "Onboarding checklist" }]}
		/>
	);
}
