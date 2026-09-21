<script lang="ts">
import { PMS } from "$lib/pm";
import { type PackageManager, prefs } from "$lib/preferences.svelte";
import Tabs from "./tabs.svelte";

const tabs = PMS.map((id) => ({ id, label: id }));
</script>

<Tabs
	{tabs}
	bind:active={() => prefs.pm, (next) => prefs.set("pm", next as PackageManager)}
	variant="segment"
/>
