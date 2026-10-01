"use client";

import {
	Badge,
	Swappable,
	SwappableHandle,
	SwappableItem,
	SwappableSlot,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import {
	DASHBOARD_SLOTS,
	KANBAN_CARDS,
	KANBAN_COLUMNS,
	KANBAN_MAP,
	LIST_ITEMS,
	SALES,
	type SlotMap,
	TODOS,
} from "../data/swappable";

type Props = Record<string, unknown>;
type Shared = Pick<
	ComponentProps<typeof Swappable>,
	"variant" | "animation" | "swapMode" | "enabled" | "dragOnHold"
>;

const DASHBOARD_CARDS = ["date", "todos", "sales", "subscribers"];

function DashboardCard({ id }: { id: string }) {
	const now = new Date();
	if (id === "date") {
		return (
			<div className="flex h-full flex-col justify-between p-4">
				<div className="flex justify-between text-muted-foreground text-xs">
					<span>{now.toLocaleString("en", { month: "long" })}</span>
					<span>{now.getFullYear()}</span>
				</div>
				<span className="text-center font-light text-5xl text-primary">
					{now.getDate()}
				</span>
			</div>
		);
	}
	if (id === "todos") {
		return (
			<div className="flex h-full flex-col gap-2 p-4">
				<span className="text-muted-foreground text-xs">My todos</span>
				{TODOS.map((todo) => (
					<span key={todo} className="flex items-center gap-2 text-sm">
						<svg viewBox="0 0 16 16" className="size-4 shrink-0 text-primary" aria-hidden>
							<circle cx="8" cy="8" r="7" fill="currentColor" />
							<path
								d="m5 8.2 2 2 4-4.4"
								fill="none"
								stroke="var(--primary-foreground)"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						{todo}
					</span>
				))}
			</div>
		);
	}
	if (id === "sales") {
		return (
			<div className="relative flex h-full flex-col overflow-hidden p-4">
				<span className="text-muted-foreground text-xs">Sales</span>
				<svg
					viewBox="0 0 300 80"
					preserveAspectRatio="none"
					className="absolute inset-x-0 bottom-0 h-3/5 w-full text-primary"
					aria-hidden
				>
					<path d={SALES} fill="currentColor" fillOpacity="0.12" />
					<path
						d={SALES.replace(/ L300 80 L0 80 Z$/, "")}
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
					/>
				</svg>
			</div>
		);
	}
	return (
		<div className="flex h-full flex-col justify-end gap-1 p-4">
			<span className="text-muted-foreground text-xs">New subscribers</span>
			<span className="font-semibold text-4xl text-primary tabular-nums">700+</span>
		</div>
	);
}

// Static content: Swapy moves the DOM itself, so nothing here needs to re-render.
function Dashboard(shared: Shared) {
	return (
		<Swappable
			{...shared}
			className="grid w-full max-w-2xl gap-3 sm:auto-rows-[9rem] sm:grid-cols-3"
		>
			{DASHBOARD_SLOTS.map((slot, i) => (
				<SwappableSlot key={slot.id} id={slot.id} className={slot.span}>
					<SwappableItem id={DASHBOARD_CARDS[i] ?? slot.id}>
						<DashboardCard id={DASHBOARD_CARDS[i] ?? ""} />
					</SwappableItem>
				</SwappableSlot>
			))}
		</Swappable>
	);
}

// Rendered from data: `manualSwap`, and each swap hands back the slot map to render from.
function Kanban(shared: Shared) {
	const [map, setMap] = useState<SlotMap>(KANBAN_MAP);
	return (
		<Swappable
			{...shared}
			manualSwap
			onSwap={(e) => setMap(e.newSlotItemMap.asArray)}
			className="grid w-full max-w-3xl gap-3 sm:grid-cols-3"
		>
			{KANBAN_COLUMNS.map((column) => {
				const slots = map.filter((entry) => entry.slot.startsWith(`${column.id}-`));
				return (
					<section
						key={column.id}
						aria-label={column.label}
						className="flex flex-col gap-2 rounded-2xl border border-border p-2"
					>
						<header className="flex items-center justify-between px-1.5 pt-0.5 font-medium text-sm">
							{column.label}
							<span className="text-muted-foreground text-xs tabular-nums">
								{slots.filter((entry) => entry.item).length}
							</span>
						</header>
						{slots.map(({ slot, item }) => {
							const card = KANBAN_CARDS.find((c) => c.id === item);
							return (
								<SwappableSlot
									key={slot}
									id={slot}
									className={
										card ? "min-h-20" : "min-h-20 border border-border border-dashed"
									}
								>
									{card ? (
										<SwappableItem
											key={card.id}
											id={card.id}
											className="flex flex-col gap-2 p-3"
										>
											<span className="font-medium text-sm">{card.title}</span>
											<Badge size="sm" variant="secondary" className="w-fit">
												{card.tag}
											</Badge>
										</SwappableItem>
									) : null}
								</SwappableSlot>
							);
						})}
					</section>
				);
			})}
		</Swappable>
	);
}

// Handles only: the rows stay selectable and drag along one axis.
function List(shared: Shared) {
	const [map, setMap] = useState<SlotMap>(() =>
		LIST_ITEMS.map((entry, i) => ({ slot: String(i), item: entry.id })),
	);
	return (
		<Swappable
			{...shared}
			manualSwap
			dragAxis="y"
			onSwap={(e) => setMap(e.newSlotItemMap.asArray)}
			className="flex w-full max-w-sm flex-col gap-2"
		>
			{map.map(({ slot, item }) => {
				const row = LIST_ITEMS.find((entry) => entry.id === item);
				return (
					<SwappableSlot key={slot} id={slot}>
						{row ? (
							<SwappableItem
								key={row.id}
								id={row.id}
								className="flex items-center gap-2 px-2 py-2.5 text-sm"
							>
								<SwappableHandle className="size-6" />
								{row.label}
							</SwappableItem>
						) : null}
					</SwappableSlot>
				);
			})}
		</Swappable>
	);
}

export function SwappableDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Swappable>>(props);
	const shared: Shared = {
		variant: p.variant ?? "card",
		animation: p.animation ?? "dynamic",
		swapMode: p.swapMode ?? "hover",
		enabled: p.enabled ?? true,
		dragOnHold: p.dragOnHold ?? false,
	};
	if (props.layout === "kanban") return <Kanban {...shared} />;
	if (props.layout === "list") return <List {...shared} />;
	return <Dashboard {...shared} />;
}
