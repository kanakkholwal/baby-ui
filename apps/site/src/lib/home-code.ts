// Kept out of the .svelte file: a closing script tag inside a template string ends the component script.
const REACT = `import { Button } from "@/components/ui/button";

export function SaveBar() {
  return (
    <Button variant="default" size="sm">
      Save changes
    </Button>
  );
}`;

const SVELTE = `<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<Button variant="default" size="sm">
  Save changes
</Button>`;

export const HOME_PANES = [
	{ id: "react", label: "React", code: REACT },
	{ id: "svelte", label: "Svelte", code: SVELTE },
];
