<script lang="ts">
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@baby-ui/svelte";
</script>

<DropdownMenu>
	<DropdownMenuTrigger>Account</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>Signed in as ada</DropdownMenuLabel>
		<DropdownMenuItem>Profile</DropdownMenuItem>
		<DropdownMenuItem>Team settings</DropdownMenuItem>
		<DropdownMenuSeparator />
		<DropdownMenuItem destructive>Sign out</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
