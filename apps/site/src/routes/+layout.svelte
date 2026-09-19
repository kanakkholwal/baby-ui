<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";
import SiteHeader from "$lib/components/site-header.svelte";

let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SiteHeader />
<div class="pt-14">{@render children()}</div>
