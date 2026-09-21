<script lang="ts">
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@baby-ui/svelte";
</script>

<Drawer>
	<DrawerTrigger>Open drawer</DrawerTrigger>
	<DrawerContent>
		<DrawerHeader>
			<DrawerTitle>Monthly budget</DrawerTitle>
			<DrawerDescription>Alerts go out when spend crosses this line.</DrawerDescription>
		</DrawerHeader>
		<DrawerClose />
		<DrawerFooter>
			<DrawerClose>Done</DrawerClose>
		</DrawerFooter>
	</DrawerContent>
</Drawer>
