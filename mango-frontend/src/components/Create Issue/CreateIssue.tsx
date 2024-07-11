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
import { Issue } from "@/types";
import { createIssue } from "@/redux/slices/issueSlice";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface CreateIssueProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CustomDropdownProps {
    label: string;
    items: { value: string; label: string }[];
    defaultValue: string;
    onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, items, defaultValue, onChange }) => {
    const [position, setPosition] = React.useState(defaultValue);

    const handleChange = (value: string) => {
        setPosition(value);
        onChange(value);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="border-2">{label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
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

const StateDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => (<CustomDropdown
    label="State"
    items={[
        { value: "todo", label: "Todo" },
        { value: "backlog", label: "Backlog" },
        { value: "progress", label: "Progress" },
        { value: "completed", label: "Completed" },
    ]}
    defaultValue="bottom"
    onChange={onChange}
/>
);

const PriorityDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => (<CustomDropdown
    label="Priority"
    items={[
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
    ]}
    defaultValue="bottom"
    onChange={onChange}
/>
);

const AssigneesDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => (
    <CustomDropdown
        label="Assignee"
        items={[
            { value: "Himanshu Sharma", label: "Himanshu Sharma" },
            { value: "Rahul Sharma", label: "Rahul Sharma" },
            { value: "Kinshu Sharma", label: "Kinshu Sharma" },
        ]}
        defaultValue="bottom"
        onChange={onChange}
    />
);

const SprintsDropdown: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
    const { sprints } = useSelector((state: RootState) => state.sprints);
    const sprintItems = sprints.map((sprint) => ({ value: sprint.name, label: sprint.name }));

    return (
        <CustomDropdown
            label="Sprints"
            items={sprintItems}
            defaultValue={sprintItems.length > 0 ? sprintItems[0].value : ''}
            onChange={onChange}
        />
    );
};

export function CreateIssue({ isOpen, onClose }: CreateIssueProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast();

    const { status: sprintsStatus, error: sprintsError, message: sprintsMessage } = useSelector((state: RootState) => state.sprints);
    const { status: issueStatus, error: issuesError, message: issuesMessage } = useSelector((state: RootState) => state.issues);

    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [state, setState] = React.useState<string>('todo');
    const [priority, setPriority] = React.useState<string>('low');
    const [assignee, setAssignee] = React.useState<string>('Himanshu Sharma');
    const [sprint, setSprint] = React.useState<string>('');


    React.useEffect(() => {
        if (isOpen && sprintsStatus === 'idle') {
            const fetchSprintsAsync = async () => {
                await dispatch(fetchSprints());
            };

            fetchSprintsAsync();
        }
    }, [isOpen, sprintsStatus, dispatch]);

    React.useEffect(() => {
        if (sprintsMessage || issuesMessage) {
            dispatch(clearMessage());
        }
        if (sprintsError || issuesError) {
            dispatch(clearError());
        }
    }, [sprintsMessage, issuesMessage, sprintsError, issuesError, dispatch]);


    React.useEffect(() => {
        if (!isOpen) {
            setTitle('');
            setDescription('');
            setState('todo');
            setPriority('low');
            setAssignee('Himanshu Sharma');
            setSprint('');
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        const issue: Issue = {
            title,
            description,
            state: state as 'todo' | 'backlog' | 'completed',
            priority: priority as 'low' | 'medium' | 'high',
            customerName: "Jane Smith",
            teamMemberName: assignee,
            sprintName: sprint,
        };

        const resultAction = await dispatch(createIssue(issue));

        if (createIssue.fulfilled.match(resultAction)) {
                toast({
                    title: "Issue Created",
                    description: "A new issue has been successfully created.",
                });
            onClose();
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error creating the issue.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-describedby="create-issue-dialog">
                <DialogHeader>
                    <DialogTitle>Create Issue</DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                <div>
                    <Textarea placeholder="Click to add description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex gap-5 justify-around">
                    <StateDropdown onChange={setState} />
                    <PriorityDropdown onChange={setPriority} />
                    <AssigneesDropdown onChange={setAssignee} />
                    <SprintsDropdown onChange={setSprint} />
                </div>
                <DialogFooter className="flex justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button className="border-2" onClick={handleSubmit} disabled={issueStatus === 'loading'}>
                        {issueStatus === 'loading' ? "Creating..." : "Create Issue"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
