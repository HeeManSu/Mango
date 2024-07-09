import { Sprint } from "@prisma/client";

export interface FetchSprintsPayload {
  sprints: Sprint[];
  message: string;
}

export interface SprintState {
  sprints: Sprint[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  message: string | null;
}
