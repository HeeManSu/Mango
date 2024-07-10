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

export interface Issue {
  title: string;
  description?: string;
  state: 'todo' | 'backlog' | 'completed';
  priority: 'high' | 'medium' | 'low';
  customerName: string;
  teamMemberName: string;
  sprintName?: string;
}

export interface IssueState {
  issue: Issue;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  message: string | null;
}

export interface IssuePayload {
  issue: Issue;
  message: string;
}