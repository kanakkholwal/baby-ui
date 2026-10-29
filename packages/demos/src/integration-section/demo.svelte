<script lang="ts">
import {
	IntegrationSection,
	IntegrationSectionDescription,
	IntegrationSectionHeader,
	IntegrationSectionItem,
	IntegrationSectionItemDescription,
	IntegrationSectionItemLink,
	IntegrationSectionItemLogo,
	IntegrationSectionItemName,
	IntegrationSectionList,
	IntegrationSectionTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import {
	INTEGRATION_SECTION as copy,
	INTEGRATION_MARK,
} from "../data/integration-section";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const variant = $derived(
	controlProps<ComponentProps<typeof IntegrationSection>>(props).variant ?? "grid",
);
</script>

<IntegrationSection {variant}>
	<IntegrationSectionHeader>
		<IntegrationSectionTitle>{copy.title}</IntegrationSectionTitle>
		<IntegrationSectionDescription>{copy.description}</IntegrationSectionDescription>
	</IntegrationSectionHeader>
	<IntegrationSectionList>
		{#each copy.items as item (item.name)}
			<IntegrationSectionItem featured={item.featured}>
				<IntegrationSectionItemLogo>
					{#if item.logo}
						<img src={item.logo} alt="" width="32" height="32" />
					{:else}
						<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
							<path d={INTEGRATION_MARK} />
						</svg>
					{/if}
				</IntegrationSectionItemLogo>
				<IntegrationSectionItemName>{item.name}</IntegrationSectionItemName>
				<IntegrationSectionItemDescription>{item.description}</IntegrationSectionItemDescription>
				<IntegrationSectionItemLink href={item.href} aria-label={`${copy.link} about ${item.name}`}>
					{copy.link}
				</IntegrationSectionItemLink>
			</IntegrationSectionItem>
		{/each}
	</IntegrationSectionList>
</IntegrationSection>
