"use client";

import { CollabCard, type CollabCardCollaborator } from "@baby-ui/react";

const collaborators: [CollabCardCollaborator, CollabCardCollaborator] = [
	{ name: "Dylan", pill: "bg-[#A259FF]", cursor: "text-[#A259FF]" },
	{ name: "Evan", pill: "bg-[#FF7262]", cursor: "text-[#FF7262]" },
];

export function Example() {
	return (
		<CollabCard
			greeting="hello!"
			eyebrow="Now in multiplayer"
			intro="editing"
			collaborators={collaborators}
			presenceColors={["#A259FF", "#FF7262", "#1ABCFE"]}
			extraCount={1}
		/>
	);
}
