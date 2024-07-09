export interface Sprint {
  sprint_id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  organizationId: number;
}

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