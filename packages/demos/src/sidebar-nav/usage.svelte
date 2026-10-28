<script lang="ts">
import { SidebarNav } from "@baby-ui/svelte";
</script>

<SidebarNav
	workspace={{ name: "Acme Studio", monogram: "A" }}
	navItems={[{ key: "home", label: "Home" }]}
	recents={[{ id: "onboarding", label: "Onboarding checklist" }]}
/>
