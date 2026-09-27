<script lang="ts">
import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Section,
} from "@better-svelte-email/components";
import type { Snippet } from "svelte";
import { type EmailShellSurface, type EmailShellWidth, emailShell } from "./variants";

let {
	preview,
	children,
	footer,
	lang = "en",
	width = "md",
	surface = "card",
}: {
	/** Inbox preview line shown after the subject; keep it under ~90 characters. */
	preview: string;
	children: Snippet;
	/** Rendered outside the card, e.g. an EmailFooter. */
	footer?: Snippet;
	lang?: string;
	width?: EmailShellWidth;
	surface?: EmailShellSurface;
} = $props();

const s = $derived(emailShell({ width, surface }));
</script>

<Html {lang}>
	<Head>
		<meta name="color-scheme" content="light dark" />
		<meta name="supported-color-schemes" content="light dark" />
	</Head>
	<Preview {preview} />
	<Body class={s.body()}>
		<Section class={s.page()}>
			<Container class={s.container()}>
				<Section class={s.card()}>{@render children()}</Section>
				{@render footer?.()}
			</Container>
		</Section>
	</Body>
</Html>
