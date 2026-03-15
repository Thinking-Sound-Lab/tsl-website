export type ContentType = "text" | "image" | "video" | "audio";

export interface NodeContent {
  type: ContentType;
  value: string | string[];
}

export interface ConfigField {
  key: string;
  type: "select" | "text" | "number" | "slider" | "toggle";
  label: string;
  defaultValue?: unknown;
  options?: { label: string; value: string | number }[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export interface NodeInputDefinition {
  dataType: string;
  label: string;
  name?: string;
  required: boolean;
  isArray?: boolean;
  maxConnections?: number;
}

export interface NodeOutputDefinition {
  dataType: string;
  label: string;
}

export interface CanvasNodeData {
  content?: NodeContent;
  configSchema?: ConfigField[];
  configValues?: Record<string, unknown>;
  inputs?: Record<string, NodeInputDefinition>;
  outputs?: Record<string, NodeOutputDefinition>;
  metadata?: Record<string, unknown>;
}

export interface SharedNode {
  id: string;
  name: string;
  title?: string;
  position_x: number;
  position_y: number;
  width?: number;
  height?: number;
  z_index: number;
  data: CanvasNodeData;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SharedConnection {
  id: string;
  source_id: string;
  source_handle?: string;
  target_id: string;
  target_handle?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SharedCanvasData {
  title: string;
  description: string | null;
  nodes: SharedNode[];
  connections: SharedConnection[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
