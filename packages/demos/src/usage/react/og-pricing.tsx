import { OgPricing } from "@baby-ui/react";

export function Example() {
	return (
		<OgPricing
			plan="Pro"
			price="$29"
			period="/month"
			popular="Most popular"
			features={["Unlimited projects", "Priority support", "SSO and audit logs"]}
		/>
	);
}
