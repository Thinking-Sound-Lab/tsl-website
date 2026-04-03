"use client";

const GENERATED_ASSET_MIME = "application/x-thinkingsoundlab-generated-asset";

export interface DraggedStudioAsset {
  url: string;
  fileName?: string;
  contentType?: string;
}

function inferFileName(url: string, providedName?: string, contentType?: string) {
  if (providedName) {
    return providedName;
  }

  const pathname = (() => {
    try {
      return new URL(url).pathname;
    } catch {
      return "";
    }
  })();
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  if (lastSegment) {
    return lastSegment;
  }

  const extension = contentType?.split("/")[1]?.split(";")[0] ?? "png";
  return `generated-image.${extension}`;
}

export function setDraggedStudioAsset(
  dataTransfer: DataTransfer,
  asset: DraggedStudioAsset
) {
  const payload = JSON.stringify(asset);
  dataTransfer.effectAllowed = "copy";
  dataTransfer.setData(GENERATED_ASSET_MIME, payload);
  dataTransfer.setData("text/plain", asset.url);
  dataTransfer.setData("text/uri-list", asset.url);
}

export function hasDraggedStudioAsset(dataTransfer: DataTransfer) {
  return Array.from(dataTransfer.types).includes(GENERATED_ASSET_MIME);
}

export function readDraggedStudioAsset(
  dataTransfer: DataTransfer
): DraggedStudioAsset | null {
  const payload = dataTransfer.getData(GENERATED_ASSET_MIME);

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload) as DraggedStudioAsset;
  } catch {
    return null;
  }
}

export async function draggedStudioAssetToFile(asset: DraggedStudioAsset) {
  const response = await fetch(asset.url);

  if (!response.ok) {
    throw new Error("Failed to fetch generated image.");
  }

  const blob = await response.blob();
  const type = blob.type || asset.contentType || "image/png";
  const fileName = inferFileName(asset.url, asset.fileName, type);

  return new File([blob], fileName, { type });
}
