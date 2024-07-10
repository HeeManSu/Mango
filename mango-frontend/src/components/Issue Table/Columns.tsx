import { IssueType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IssueType>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "sprint.name",
        header: "Sprint",
    },
    {
        accessorKey: "team_member.name",
        header: "Assignee",
    },
];