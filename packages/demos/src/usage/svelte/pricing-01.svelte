<script lang="ts">
import { Pricing01 } from "@baby-ui/svelte";

const periods = [
	{ value: "monthly", label: "Monthly", cadence: "/month" },
	{ value: "yearly", label: "Yearly", cadence: "/year" },
];

const plans = [
	{
		id: "hobby",
		name: "Hobby",
		prices: { monthly: "$0", yearly: "$0" },
		features: ["1 project", "Community support"],
		href: "/signup",
	},
	{
		id: "pro",
		name: "Pro",
		prices: { monthly: "$20", yearly: "$192" },
		features: ["Unlimited projects", "Email support"],
		note: "Most teams start here.",
		badge: "Popular",
		featured: true,
		href: "/signup?plan=pro",
	},
];

let period = $state("monthly");
</script>

<Pricing01 title="Pricing" {plans} {periods} bind:period />
