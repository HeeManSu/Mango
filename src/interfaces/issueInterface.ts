export interface IssueBodyData {
    title: string;
    description?: string;
    state: 'todo' | 'backlog' | 'completed';
    priority: 'high' | 'medium' | 'low';
    customerName: string;
    teamMemberName: string;
    sprintName?: string;
}

export interface IssueCreateData {
    title: string;
    description?: string;
    state: 'todo' | 'backlog' | 'progress' | 'completed';
    priority: 'high' | 'medium' | 'low';
    customer: { connect: { customer_id: number } };
    team_member: { connect: { team_member_id: number } };
    organization: { connect: { organization_id: number } };
    sprint?: { connect: { sprint_id: number } };
}