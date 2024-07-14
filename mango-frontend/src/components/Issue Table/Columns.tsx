import { IssueType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IssueType>[] = [
    {
        accessorKey: "title",
        header: "Name",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "priority",
        header: "Priority",
    },
    {
        accessorKey: "sprint.name",
        header: "Sprint",
    },
    {
        accessorKey: "team_member.name",
        header: "Assignee",
    },
    {
        accessorKey: "start_date",
        header: "Created On",
    },
];