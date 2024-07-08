export interface SprintBodyInput {
    name: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    status: 'upcoming' | 'ongoing' | 'completed';
}
