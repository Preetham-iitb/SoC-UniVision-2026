export type StageStatus = "waiting" | "running" | "completed" | "error";

export interface PipelineStage {
  id: string;
  name: string;
  status: StageStatus;
}

export interface PipelineEvent {
  id: number;
  timestamp: string;
  message: string;
}