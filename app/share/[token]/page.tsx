import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CanvasViewer } from "@/components/canvas-viewer";
import type { SharedCanvasData, ApiResponse } from "@/types/canvas";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getSharedCanvas(
  token: string
): Promise<SharedCanvasData | null> {
  const res = await fetch(`${API_BASE}/api/canvas/share/${token}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const json: ApiResponse<SharedCanvasData> = await res.json();
  return json.success ? json.data ?? null : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const canvas = await getSharedCanvas(token);

  if (!canvas) {
    return { title: "Canvas Not Found" };
  }

  return {
    title: `${canvas.title} | Invook Canvas`,
    description: canvas.description || "View this shared canvas on Invook",
    openGraph: {
      title: canvas.title,
      description: canvas.description || "Shared canvas on Invook",
      type: "article",
    },
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const canvas = await getSharedCanvas(token);

  if (!canvas) {
    notFound();
  }

  return <CanvasViewer canvas={canvas} shareToken={token} />;
}
