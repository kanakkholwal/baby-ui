<script lang="ts">
import "./layout.css";
import { onMount } from "svelte";
import PreferencesPanel from "$lib/components/preferences-panel.svelte";
import SiteHeader from "$lib/components/site-header.svelte";
import { prefs } from "$lib/preferences.svelte";

let { children } = $props();

onMount(() => prefs.hydrate());
</script>

<SiteHeader />
<PreferencesPanel />
<div class="pt-14">{@render children()}</div>
