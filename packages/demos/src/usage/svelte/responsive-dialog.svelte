<script lang="ts">
import {
	Button,
	ResponsiveDialog,
	ResponsiveDialogClose,
	ResponsiveDialogContent,
	ResponsiveDialogDescription,
	ResponsiveDialogFooter,
	ResponsiveDialogHeader,
	ResponsiveDialogTitle,
	ResponsiveDialogTrigger,
} from "@baby-ui/svelte";

let open = $state(false);
</script>

<ResponsiveDialog bind:open>
	<ResponsiveDialogTrigger>Edit profile</ResponsiveDialogTrigger>
	<ResponsiveDialogContent>
		<ResponsiveDialogHeader>
			<ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
			<ResponsiveDialogDescription>Dialog on desktop, Drawer on mobile.</ResponsiveDialogDescription>
		</ResponsiveDialogHeader>
		<ResponsiveDialogFooter>
			<ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
			<Button onclick={() => (open = false)}>Save</Button>
		</ResponsiveDialogFooter>
	</ResponsiveDialogContent>
</ResponsiveDialog>
