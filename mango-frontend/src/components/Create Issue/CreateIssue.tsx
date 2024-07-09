import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { clearError, clearMessage, fetchSprints } from "@/redux/slices/sprintSlice";

interface CreateIssueProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CustomDropdownProps {
    label: string;
    items: { value: string; label: string }[];
    defaultValue: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, items, defaultValue }) => {
    const [position, setPosition] = React.useState(defaultValue);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="border-2">{label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    {items.map((item) => (
                        <DropdownMenuRadioItem key={item.value} value={item.value}>
                            {item.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const StateDropdown: React.FC = () => (
    <CustomDropdown
        label="State"
        items={[
            { value: "todo", label: "Todo" },
            { value: "backlog", label: "Backlog" },
            { value: "progress", label: "Progress" },
            { value: "completed", label: "Completed" },
        ]}
        defaultValue="bottom"
    />
);

const PriorityDropdown: React.FC = () => (
    <CustomDropdown
        label="Priority"
        items={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
        ]}
        defaultValue="bottom"
    />
);

const AssigneesDropdown: React.FC = () => (
    <CustomDropdown
        label="Assignee"
        items={[
            { value: "Himanshu Sharma", label: "Himanshu Sharma" },
            { value: "Rahul Sharma", label: "Rahul Sharma" },
            { value: "Kinshu Sharma", label: "Kinshu Sharma" },
        ]}
        defaultValue="bottom"
    />
);

const SprintsDropdown: React.FC = () => {
    const { sprints } = useSelector((state: RootState) => state.sprints);
    const sprintItems = sprints.map((sprint) => ({ value: sprint.name, label: sprint.name }));

    return (
        <CustomDropdown
            label="Sprints"
            items={sprintItems}
            defaultValue="bottom"
        />
    );
};

export function CreateIssue({ isOpen, onClose }: CreateIssueProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { status, error, message } = useSelector((state: RootState) => state.sprints);

    React.useEffect(() => {
        if (isOpen && status === 'idle') {
            dispatch(fetchSprints());
        }
    }, [isOpen, status, dispatch]);

    React.useEffect(() => {
        if (message) {
            dispatch(clearMessage());
        }
        if (error) {
            dispatch(clearError());
        }
    }, [message, error, dispatch]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-describedby="create-issue-dialog">
                <DialogHeader>
                    <DialogTitle>Create Issue</DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input type="text" placeholder="Title" />
                    </div>
                </div>
                <div>
                    <Textarea placeholder="Click to add description" />
                </div>
                <div className="flex gap-5 justify-around">
                    <StateDropdown />
                    <PriorityDropdown />
                    <AssigneesDropdown />
                    <SprintsDropdown />
                </div>
                <DialogFooter className="flex justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button className="border-2">Create Issue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
