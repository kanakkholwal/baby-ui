import { OrbitCardStack } from "@baby-ui/react";
import { useState } from "react";

const team = [
	{ name: "Mira Vale", role: "Design", description: "Owns the visual system." },
	{
		name: "Ari Chen",
		role: "Founder",
		description: "Sets the taste bar.",
		href: "/team/ari",
	},
	{ name: "Sana Holt", role: "Engineering", description: "Builds the motion." },
];

export function Example() {
	const [active, setActive] = useState(1);
	return <OrbitCardStack items={team} value={active} onValueChange={setActive} />;
}
