"use client";

import { cn } from "@/lib/utils";

interface Model {
	name: string;
	description: string;
}

interface Provider {
	name: string;
	displayName?: string;
	models: Model[];
	colSpan?: number;
	rowSpan?: number;
}

const providers: Provider[] = [
	{
		name: "Google",
		colSpan: 2,
		models: [
			{ name: "Gemini 2.5 Flash Image", description: "State-of-the-art image generation" },
			{ name: "Imagen 3", description: "Photorealistic image generation" },
			{ name: "Imagen 4", description: "High-fidelity image synthesis" },
			{ name: "Gemini 2.5 Pro", description: "Advanced multimodal reasoning" },
			{ name: "Veo2", description: "Realistic short video clips" },
			{ name: "Veo3", description: "Cinematic long-form video" },
		],
	},
	{
		name: "runway",
		rowSpan: 2,
		models: [
			{ name: "Aleph", description: "Creative media foundation model" },
			{ name: "Gen-4 Turbo", description: "Real-time video generation" },
			{ name: "References", description: "Style/subject consistency from refs" },
			{ name: "Act-Two", description: "Narrative video storytelling" },
			{ name: "Gen-3 Alpha", description: "Cinematic video realism" },
		],
	},
	{
		name: "Wan",
		models: [{ name: "Wan2.2", description: "Culturally tuned image model" }],
	},
	{
		name: "OpenAI",
		models: [
			{ name: "GPT-5", description: "State-of-the-art multimodal AI" },
			{ name: "GPT-4o Mini", description: "Small, fast multimodal" },
			{ name: "GPT Image", description: "Detailed image editing" },
		],
	},
	{
		name: "Black Forest Labs",
		colSpan: 2,
		models: [
			{ name: "FLUX 1.1 Pro", description: "Balanced photo/creative images" },
			{ name: "FLUX Dev", description: "Developer-focused generator" },
			{ name: "FLUX Depth", description: "Depth-map guided images" },
			{ name: "FLUX Kontext Max", description: "Multi-reference guided images" },
			{ name: "FLUX Redux", description: "Image refinement and polish" },
			{ name: "FLUX Canny", description: "Edge-map controlled images" },
		],
	},
	{
		name: "stability.ai",
		models: [
			{ name: "Stable Diffusion 3.5", description: "Open, versatile image synthesis" },
		],
	},
	{
		name: "Hailuo AI",
		models: [
			{ name: "Minimax Hailuo", description: "General-purpose image generator" },
			{ name: "Minimax Hailuo-02 Pro", description: "Enhanced precision image generation" },
		],
	},
	{
		name: "Pika",
		models: [
			{ name: "Pika", description: "Creative, fast video generation" },
		],
	},
	{
		name: "KlingAI",
		models: [
			{ name: "Kling 2.1 Master", description: "Refined cinematic video model" },
			{ name: "Kling 2.0 Master", description: "Advanced cinematic video model" },
			{ name: "Kling Pro 1.5", description: "Prior-gen high-quality video model" },
			{ name: "Kling Pro 1.6", description: "High-quality video generation" },
		],
	},
	{
		name: "RECRAFT",
		models: [
			{ name: "Recraft V3", description: "Vector & design-oriented image generation" },
		],
	},
	{
		name: "ByteDance Seed",
		displayName: "ByteDance | Seed",
		models: [
			{ name: "Seedream 4.0", description: "Multimodal image generation and editing" },
			{ name: "Seeldance 1.0 Pro", description: "Multi-shot videos from text or images" },
		],
	},
	{
		name: "Luma AI",
		models: [
			{ name: "Dream Machine", description: "AI video generation" },
			{ name: "Ray2", description: "Next-gen video synthesis" },
		],
	},
	{
		name: "MOONVALLEY",
		colSpan: 2,
		models: [
			{ name: "Marey", description: "Commercially safe, production-grade video creation" },
		],
	},
];

function ProviderCard({ provider }: { provider: Provider }) {
	const colSpanClass = provider.colSpan === 2 ? "md:col-span-2" : "";
	const rowSpanClass = provider.rowSpan === 2 ? "md:row-span-2" : "";
	const gridCols = provider.colSpan === 2 && provider.models.length > 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1";

	return (
		<div
			className={cn(
				"bg-secondary rounded-sm p-4 flex flex-col h-full min-h-[200px] border border-border/50",
				colSpanClass,
				rowSpanClass
			)}
		>
			<h3 className="text-[15px] lg:text-[16px] text-foreground mb-4">
				{provider.displayName || provider.name}
			</h3>
			<div className={cn("grid gap-x-6 gap-y-3 mt-auto", gridCols)}>
				{provider.models.map((model, idx) => (
					<div key={idx}>
						<p className="text-[15px] lg:text-[16px] text-foreground">{model.name}</p>
						<p className="text-[15px] lg:text-[16px] text-muted-foreground tracking-tight">{model.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export function Benefits() {
	return (
		<section className="bg-background">
			<div className="flex flex-col items-start max-w-2xl mb-10">
				<h2 className="text-3xl md:text-4xl text-foreground mb-4 tracking-tight">
					One subscription to rule them all.
				</h2>
				<p className="text-lg text-muted-foreground tracking-tight text-balance">
					One plan. 50+ models. Stay on the creative edge without chasing licenses.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[minmax(250px,auto)]">
				{providers.map((provider, idx) => (
					<ProviderCard key={idx} provider={provider} />
				))}
			</div>
		</section>
	);
}
