"use client";

import { ThemeToggle, type ThemeToggleValue } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

function applyTheme(next: ThemeToggleValue) {
	const root = document.documentElement;
	root.classList.toggle("dark", next === "dark");
	root.style.colorScheme = next;
}

export function ThemeToggleDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ThemeToggle>>(props);
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
			variant={p.variant ?? "rectangle"}
			start={p.start ?? "bottom-up"}
			className="rounded-xl border border-border bg-background p-2.5"
			iconClassName="size-5"
		/>
	);
}
