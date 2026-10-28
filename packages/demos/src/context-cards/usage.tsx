"use client";

import { ContextCards } from "@baby-ui/react";

export function Example() {
	return (
		<ContextCards
			chunks={[
				{
					title: "Vendor onboarding rule",
					chars: "290 characters",
					body: "Cold-chain certification must be verified before a new vendor is added.",
					source: "Onboarding SOP.pdf",
					badge: "PDF",
					tone: "destructive",
				},
			]}
		/>
	);
}
