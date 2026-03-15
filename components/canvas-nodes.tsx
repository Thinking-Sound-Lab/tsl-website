"use client";

import { type Node, type NodeProps } from "@xyflow/react";
import type { NodeContent } from "@/types/canvas";

type CanvasFlowNodeData = {
  title?: string;
  content?: NodeContent;
  [key: string]: unknown;
};

type CanvasFlowNode = Node<CanvasFlowNodeData>;

function TextNode({ data }: NodeProps<CanvasFlowNode>) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 min-w-[200px]">
      {data.title && (
        <div className="text-xs font-medium text-gray-500 mb-2">
          {data.title}
        </div>
      )}
      <div className="prose prose-sm">
        {data.content?.type === "text" && (
          <p>{Array.isArray(data.content.value) ? data.content.value[0] : data.content.value}</p>
        )}
      </div>
    </div>
  );
}

function MediaNode({ data }: NodeProps<CanvasFlowNode>) {
  const content = data.content;
  if (!content) return null;

  const url = Array.isArray(content.value) ? content.value[0] : content.value;

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      {data.title && (
        <div className="text-xs font-medium text-gray-500 px-3 pt-2">
          {data.title}
        </div>
      )}
      {content.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={data.title || ""} className="max-w-full" />
      )}
      {content.type === "video" && (
        <video src={url} controls className="max-w-full" />
      )}
      {content.type === "audio" && (
        <audio src={url} controls className="w-full p-3" />
      )}
    </div>
  );
}

function DefaultNode({ data }: NodeProps<CanvasFlowNode>) {
  return (
    <div className="bg-gray-50 border border-dashed rounded-lg p-4 min-w-[150px]">
      <div className="text-xs font-medium text-gray-400">
        {data.title || "Node"}
      </div>
    </div>
  );
}

export const nodeTypes = {
  text_display: TextNode,
  image_generator: MediaNode,
  video_generator: MediaNode,
  audio_generator: MediaNode,
  multimedia: MediaNode,
  default: DefaultNode,
};
