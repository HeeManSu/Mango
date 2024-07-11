export interface Sprint {
  sprint_id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  organizationId: number;
}

export interface createSprintPayloadType {
  success: boolean;
  message: string;
  sprint: Sprint;
}

export interface createSprintDataType {
  name: string;
  description?: string;
  start_date: Date | null;
  end_date: Date | null;
  status: 'ongoing' | 'upcoming' | 'completed';
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
  sprint: Sprint | null;
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
  issue: IssueType;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  message: string | null;
  issues: IssueType[]
}

export interface IssuePayload {
  issue: IssueType;
  message: string;
}

export interface GetALlIssuePayload {
  success: boolean;
  message: string;
  issue: IssueType[];
}

export interface Customer {
  customer_id: number;
  name: string;
  phone: number;
  email: string;
  organizationId: number;
}

export interface TeamMember {
  team_member_id: number;
  email: string;
  name: string;
  role: 'admin' | 'member';
  organizationId: number;
}

export interface Organization {
  organization_id: number;
  name: string;
}

export interface Sprint {
  sprint_id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: 'ongoing' | 'upcoming' | 'completed';
  organizationId: number;
}

export interface IssueType {
  issue_id: number;
  title: string;
  description?: string;
  state: 'todo' | 'backlog' | 'progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  customerId: number;
  team_memberId: number;
  organizationId: number;
  sprintId?: number;
  customer: Customer;
  team_member: TeamMember;
  organization: Organization;
  sprint?: Sprint;
}