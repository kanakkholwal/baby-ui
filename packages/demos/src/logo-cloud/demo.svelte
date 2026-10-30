<script lang="ts">
import {
	LogoCloud,
	LogoCloudContent,
	LogoCloudItem,
	LogoCloudLink,
	LogoCloudList,
	LogoCloudTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { LOGO_CLOUD as copy } from "../data/logo-cloud";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof LogoCloud>>(props).variant ?? "grid",
);
</script>

<LogoCloud {variant}>
	<LogoCloudTitle>{copy.title}</LogoCloudTitle>
	<LogoCloudContent>
		<LogoCloudList>
			{#each copy.logos as logo (logo.name)}
				<LogoCloudItem>
					<img src={logo.logo} alt={logo.name} width="24" height="24" />
				</LogoCloudItem>
			{/each}
		</LogoCloudList>
		<LogoCloudLink href={copy.link.href}>{copy.link.label}</LogoCloudLink>
	</LogoCloudContent>
</LogoCloud>
