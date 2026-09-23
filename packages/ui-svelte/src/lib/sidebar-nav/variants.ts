import { tv, type VariantProps } from "tailwind-variants";

export const sidebarNav = tv({
	variants: {
		size: {
			sm: "w-46",
			md: "w-56",
			lg: "w-64",
		},
	},
	defaultVariants: { size: "md" },
});

export type SidebarNavSize = NonNullable<VariantProps<typeof sidebarNav>["size"]>;
