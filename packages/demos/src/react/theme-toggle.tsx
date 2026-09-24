"use client";

import {
	ThemeToggle,
	type ThemeToggleStart,
	type ThemeToggleValue,
	type ThemeToggleVariant,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

function applyTheme(next: ThemeToggleValue) {
	const root = document.documentElement;
	root.classList.toggle("dark", next === "dark");
	root.style.colorScheme = next;
}

export function ThemeToggleDemo({ props }: { props: Props }) {
	const [theme, setTheme] = useState<ThemeToggleValue>("light");

	useEffect(() => {
		setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
	}, []);

	function onThemeChange(next: ThemeToggleValue) {
		applyTheme(next);
		setTheme(next);
	}

	return (
		<ThemeToggle
			theme={theme}
			onThemeChange={onThemeChange}
			variant={(props.variant as ThemeToggleVariant) ?? "rectangle"}
			start={(props.start as ThemeToggleStart) ?? "bottom-up"}
			className="rounded-xl border border-border bg-background p-2.5"
			iconClassName="size-5"
		/>
	);
}
