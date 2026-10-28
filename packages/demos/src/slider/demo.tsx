"use client";

import { Slider, sliderLayout } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";
import { SLIDER_MARKS, SLIDER_PRESETS } from "../data/slider";

type Props = Record<string, unknown>;

export function SliderDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Slider>>(props);
	const variant = p.variant ?? "default";
	const preset = SLIDER_PRESETS[variant] ?? SLIDER_PRESETS.default;
	const range = Boolean(props.range);
	const { orientation } = sliderLayout(variant, p.orientation ?? "horizontal", range);
	const [value, setValue] = useState<number | number[]>(50);
	useEffect(() => {
		setValue(range ? [25, 75] : Number(props.value ?? 50));
	}, [range, props.value]);

	return (
		<div
			className={
				orientation === "vertical"
					? "flex h-56"
					: variant === "default"
						? "w-72"
						: "w-full max-w-sm"
			}
		>
			<Slider
				value={value}
				onValueChange={setValue}
				variant={variant}
				orientation={orientation}
				min={p.min ?? 0}
				max={p.max ?? 100}
				step={p.step ?? 1}
				disabled={p.disabled ?? false}
				label={preset?.label}
				formatValue={preset?.format}
				size={p.size ?? "default"}
				showValue={props.showValue === true}
				marks={variant === "default" ? SLIDER_MARKS : undefined}
				elastic={p.elastic ?? false}
			/>
		</div>
	);
}
