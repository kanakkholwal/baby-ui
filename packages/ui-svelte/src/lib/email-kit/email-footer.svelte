<script lang="ts">
import { Column, Link, Row, Section, Text } from "@better-svelte-email/components";
import { type EmailFooterAlign, type EmailFooterLayout, emailFooter } from "./variants";

export interface EmailFooterLink {
	label: string;
	href: string;
}

let {
	lines,
	links = [],
	reason,
	brand,
	layout = "plain",
	align = "center",
}: {
	/** Sender identity and postal address: required for commercial mail in many regions. */
	lines: string[];
	links?: EmailFooterLink[];
	/** Why the recipient got this email, e.g. "You're receiving this because you signed up". */
	reason?: string;
	/** Wordmark shown in the `bar` layout, usually the product name. */
	brand?: string;
	/** `plain` goes in EmailShell's `footer`; `band`, `bar` and `row` go in its `cardFooter`. */
	layout?: EmailFooterLayout;
	align?: EmailFooterAlign;
} = $props();

const s = $derived(emailFooter({ layout, align }));
</script>

{#snippet linkRow()}
	{#if links.length > 0}
		<Text class={s.linkText()}>
			{#each links as link, i (link.href)}{#if i > 0}{" · "}{/if}<Link href={link.href} class={s.link()}>{link.label}</Link>{/each}
		</Text>
	{/if}
{/snippet}

{#snippet legal()}
	{#if reason}<Text class={s.reason()}>{reason}</Text>{/if}
	{#each lines as line (line)}
		<Text class={s.text()}>{line}</Text>
	{/each}
{/snippet}

{#if layout === "bar"}
	<Section class={s.root()}>
		<Section class={s.bar()}>
			<Row>
				<Column><Text class={s.brand()}>{brand ?? ""}</Text></Column>
				<Column class={s.linksCell()}>{@render linkRow()}</Column>
			</Row>
		</Section>
		<Section class={s.legal()}>{@render legal()}</Section>
	</Section>
{:else if layout === "row"}
	<Section class={s.root()}>
		<Row>
			<Column>{@render legal()}</Column>
			<Column class={s.linksCell()}>{@render linkRow()}</Column>
		</Row>
	</Section>
{:else}
	<Section class={s.root()}>
		{@render legal()}
		{@render linkRow()}
	</Section>
{/if}
