"use client";

import { type ComponentProps, createContext, type ReactNode, useContext } from "react";
import { Badge } from "../../badge/react/badge";
import { Button } from "../../button/react/button";
import { cn } from "../../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/react/popover";
import { Progress } from "../../progress/react/progress";
import { LOADED_MODELS_ICONS, type LoadedModelsIcon } from "../icons";
import { isLoaded, type LoadedModel, overallState, STATE_LABEL } from "../model";
import { type LoadedModelsVariant, loadedModels } from "../variants";

export type { LoadedModel, LoadedModelsVariant };

type Ctx = {
	models: LoadedModel[];
	loaded: LoadedModel[];
	variant: LoadedModelsVariant;
	onLoad?: (id: string) => void;
	onUnload?: (id: string) => void;
};

const LoadedModelsCtx = createContext<Ctx | null>(null);

export function useLoadedModels() {
	const ctx = useContext(LoadedModelsCtx);
	if (!ctx) throw new Error("LoadedModels parts must be used inside <LoadedModels>");
	return ctx;
}

function Icon({ name }: { name: LoadedModelsIcon }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d={LOADED_MODELS_ICONS[name]} />
		</svg>
	);
}

export function LoadedModels({
	models,
	variant = "ghost",
	onLoad,
	onUnload,
	children,
	...props
}: ComponentProps<typeof Popover> & {
	models: LoadedModel[];
	variant?: LoadedModelsVariant;
	/** Shows a Load action on models that are not in memory. */
	onLoad?: (id: string) => void;
	/** Shows an Unload action on models that are in memory. */
	onUnload?: (id: string) => void;
	children?: ReactNode;
}) {
	const ctx: Ctx = { models, loaded: models.filter(isLoaded), variant, onLoad, onUnload };
	return (
		<LoadedModelsCtx.Provider value={ctx}>
			<Popover {...props}>{children}</Popover>
		</LoadedModelsCtx.Provider>
	);
}

/** The status dot and a label: "Nothing loaded", the model's name, or "2 models loaded". */
export function LoadedModelsTrigger({
	className,
	children,
}: {
	className?: string;
	children?: ReactNode;
}) {
	const { models, loaded, variant } = useLoadedModels();
	const styles = loadedModels({ variant, state: overallState(models) });
	const label =
		loaded.length === 0
			? "Nothing loaded"
			: loaded.length === 1
				? loaded[0]?.name
				: `${loaded.length} models loaded`;
	return (
		<PopoverTrigger
			data-slot="loaded-models-trigger"
			render={
				<Button
					variant={variant}
					size="sm"
					aria-label="Models in memory"
					className={cn(styles.trigger(), className)}
				/>
			}
		>
			<span className={styles.dot()} />
			<span className="truncate">{children ?? label}</span>
		</PopoverTrigger>
	);
}

export function LoadedModelsContent({
	className,
	children,
	...props
}: ComponentProps<typeof PopoverContent>) {
	const { variant } = useLoadedModels();
	return (
		<PopoverContent
			data-slot="loaded-models-content"
			align="end"
			className={cn(loadedModels({ variant }).content(), className)}
			{...props}
		>
			<div className={loadedModels().list()}>{children}</div>
		</PopoverContent>
	);
}

export function LoadedModelsHeader({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const { loaded } = useLoadedModels();
	const styles = loadedModels();
	return (
		<div
			data-slot="loaded-models-header"
			className={cn(styles.header(), className)}
			{...props}
		>
			{children ?? (
				<>
					<p className={styles.title()}>In memory</p>
					<span className={styles.count()}>
						{loaded.length === 0 ? "Free" : `${loaded.length} in use`}
					</span>
				</>
			)}
		</div>
	);
}

/** One row per model; children render a custom row. */
export function LoadedModelsList({
	children,
}: {
	children?: (model: LoadedModel) => ReactNode;
}) {
	const { models } = useLoadedModels();
	return models.map((model) =>
		children ? children(model) : <LoadedModelsItem key={model.id} model={model} />,
	);
}

export function LoadedModelsItem({
	model,
	icon,
	className,
}: {
	model: LoadedModel;
	icon?: ReactNode;
	className?: string;
}) {
	const { onLoad, onUnload } = useLoadedModels();
	const styles = loadedModels({ state: model.state });
	const measurement = model.measurement;
	return (
		<div
			data-slot="loaded-models-item"
			data-state={model.state}
			className={cn(styles.row(), className)}
		>
			<div className={styles.line()}>
				<span className={styles.tile()}>
					{icon ?? <Icon name="chip" />}
					<span className={styles.tileDot()} />
				</span>
				<div className={styles.text()}>
					<p className={styles.name()}>{model.name}</p>
					<p className={styles.meta()}>
						{model.status ?? `${model.kind} · ${STATE_LABEL[model.state]}`}
					</p>
				</div>
				{model.state === "idle" && onLoad ? (
					<Button size="sm" variant="secondary" onClick={() => onLoad(model.id)}>
						<Icon name="play" />
						Load
					</Button>
				) : null}
				{model.state === "ready" && onUnload ? (
					<Button size="sm" variant="ghost" onClick={() => onUnload(model.id)}>
						<Icon name="power" />
						Unload
					</Button>
				) : null}
			</div>
			{measurement && model.state === "ready" ? (
				<div className={styles.measure()}>
					<Progress
						size="sm"
						tone={measurement.tone}
						value={measurement.value}
						label={measurement.label}
					/>
					<p className={styles.measureText()}>
						{measurement.label}
						{measurement.badge ? (
							<Badge
								size="sm"
								variant={measurement.tone === "default" ? "secondary" : measurement.tone}
							>
								{measurement.badge}
							</Badge>
						) : null}
					</p>
				</div>
			) : null}
		</div>
	);
}

/** Shown while the list has no models at all; children can add a hint or action. */
export function LoadedModelsEmpty({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const { models } = useLoadedModels();
	if (models.length > 0) return null;
	return (
		<div
			data-slot="loaded-models-empty"
			className={cn(loadedModels().empty(), className)}
			{...props}
		>
			{children ?? "Nothing is loaded, so the memory is free."}
		</div>
	);
}
