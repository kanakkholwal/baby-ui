<script lang="ts">
import { Heading } from "@better-svelte-email/components";
import type { Snippet } from "svelte";
import { type EmailHeadingSize, emailHeading } from "./variants";

let { children, size = "lg" }: { children: Snippet; size?: EmailHeadingSize } = $props();
</script>

<Heading as="h1" class={emailHeading({ size })}>{@render children()}</Heading>
