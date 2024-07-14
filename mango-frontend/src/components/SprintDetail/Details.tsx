import React, { useEffect } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchSprints } from '@/redux/slices/sprintSlice';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UseDialog } from '@/hooks/useDialog';
import { CreateIssue } from '../Create Issue/CreateIssue';
import { Separator } from "@/components/ui/separator"
import { Issue, IssueType, Sprint } from '@/types';
import { Plus } from 'lucide-react';
import { CircleDotDashed as InProgress } from 'lucide-react';
import { Circle as Todo } from 'lucide-react';
import { CircleCheck as Completed } from 'lucide-react';
import { CircleDashed as ALlIssues } from 'lucide-react';
import { CircleEqual as Backlog } from 'lucide-react';
import { CalendarClock as CalendarClock } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { createIssue } from '@/redux/slices/issueSlice';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const Details: React.FC = () => {

    const { sprint_id } = useParams<{ sprint_id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast();
    const [fetchDataTrigger, setFetchDataTrigger] = React.useState<number>(0);
    const { isOpen, openDialog, closeDialog } = UseDialog();
    const [newIssue, setNewIssue] = React.useState<boolean | (() => boolean)>(false);
    const [title, setTitle] = React.useState<string>('');

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchSprints());
        }
        fetchData();
    }, [dispatch, fetchDataTrigger]);

    const { sprints } = useSelector((state: RootState) => state.sprints);
    const sprint = sprints.find((sprint) => sprint.sprint_id === Number(sprint_id));
    const issues: IssueType[] = sprint?.issue || [];
    const issueCount = sprint?.issue?.length || 0;
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setNewIssue(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (newIssue && inputRef.current) {
            inputRef.current.focus();
        }
    }, [newIssue])

    const createNewIssue = async () => {
        if (title.trim() === '') {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Title cannot be empty.',
            });
            return;
        }
        const issue: Issue = {
            title,
            sprintName: sprint?.name,
            state: 'todo',
            priority: 'low',
            description: '',
            teamMemberName: 'Himanshu Sharma',
            customerName: "Jane Smith",
        };
        const resultAction = await dispatch(createIssue(issue));
        if (createIssue.fulfilled.match(resultAction)) {
            toast({
                title: 'Issue Created',
                description: 'A new issue has been successfully created.',
            });
            setTitle('');
            setFetchDataTrigger(prev => prev + 1); 
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'There was an error creating the issue.',
                action: <ToastAction altText='Try again'>Try again</ToastAction>,
            });
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createNewIssue();
        }
    };


    return (
        <>
            <div className=' w-full my-5'>
                <div className='flex mx-7 justify-between items-center'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                🥭 Mango
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link to="/sprints">Sprints</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='border px-2 rounded-sm'>{sprint?.name}&nbsp;&nbsp;
                                    <span className='bg-blue-300 px-1 rounded-lg text-white '>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger> {issueCount}</TooltipTrigger>
                                                <TooltipContent>
                                                    <p>This sprint has {issueCount} issue</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </span>
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Button onClick={openDialog} size={'md'} className='border bg-blue-400 text-white hover:bg-blue-500'>
                        Add Issue
                    </Button>
                </div>
                <Separator className='mt-2' />
                <div className='border-b bg-gray-100 h-[50px] w-full'>
                    <div className='flex h-full items-center justify-between'>
                        <div className='flex ml-6 items-center gap-2'>
                            <ALlIssues className='w-5 h-5' />
                            <h1 className='font-[600] tracking-wide text-[18px]'> Issues</h1>
                        </div>
                        <Plus className='mr-7' />
                    </div>
                </div>
                {
                    sprint && issues.map((issue, i) => {
                        return (
                            <IssueRow key={i} issue={issue} sprint={sprint} />
                        )
                    })
                }
                {
                    newIssue === false ? (
                        <div onClick={() => setNewIssue(true)} className='relative h-[45px]'>
                            <Plus className='absolute text-gray-400 left-2 top-1/2 transform -translate-y-1/2' />
                            <input placeholder='New Issue' className='border-b focus-visible:outline-none disabled:cursor-not-allowed w-full h-full pl-12' />
                        </div>
                    ) : (
                        <div>
                            <div className='h-[45px] border-b flex items-center'>
                                <h1 className='text-[12px] pl-5 pt-[1px] text-blue-400 font-[500]'>MANGO-</h1>
                                <input
                                    type="text"
                                    placeholder='Enter Title'
                                    className='w-full h-full pl-7 focus-visible:outline-none disabled:cursor-not-allowed '
                                    onBlur={() => setNewIssue(false)}
                                    ref={inputRef}
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value); e.preventDefault(); }}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className='text-[13px] w-fit px-5 rounded-md border-b border-r py-1 text-blue-500 font-[500]'>Press 'Enter' to add another issue</div>
                        </div>
                    )
                }
            </div>
            <CreateIssue isOpen={isOpen} onClose={closeDialog} />
        </>
    )
}

export default Details;




const IssueRow: React.FC<{ issue: IssueType, sprint: Sprint }> = ({ issue, sprint }) => {
    const [state, setState] = React.useState(issue?.state);
    const [priority, setPriority] = React.useState(issue?.priority);

    const handleChange = (value: "todo" | "backlog" | "progress" | "completed") => {
        setState(value);
    }

    const handlePriorityChange = (value: "high" | "medium" | "low") => {
        setPriority(value);
    }

    const renderSelectItem = (value: "todo" | "backlog" | "progress" | "completed") => {
        let IconComponent;
        let label;
        let className;

        switch (value) {
            case "backlog":
                IconComponent = Backlog;
                label = "Backlog";
                className = 'h-4 w-4 text-indigo-500';
                break;
            case "todo":
                IconComponent = Todo;
                label = "Todo";
                className = 'h-4 w-4';
                break;
            case "progress":
                IconComponent = InProgress;
                label = "In Progress";
                className = 'h-4 w-4 text-yellow-500';
                break;
            case "completed":
                IconComponent = Completed;
                label = "Completed";
                className = 'h-4 w-4 text-green-600';
                break;
            default:
                return null;
        }

        return (
            <div className='flex items-center gap-2'>
                <IconComponent className={className} />
                <h1>{label}</h1>
            </div>
        );
    };

    const renderPriorityItem = (value: "high" | "medium" | "low") => {
        let label;

        switch (value) {
            case "high":
                label = "P100";
                break;
            case "medium":
                label = "P1";
                break;
            case "low":
                label = "P0";
                break;
            default:
                return null;
        }

        return (
            <div className='flex items-center gap-2'>
                <h1>{label}</h1>
            </div>
        );
    };

    const formatDate = (date: string) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        })
    };

    const assignes = (fullName: string) => {
        const nameParts = fullName.split(' ');

        if (nameParts.length > 2) {
            throw new Error('Full name must include at least first name and last name');
        }

        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];

        const firstLetter = firstName[0];
        const lastLetter = lastName[0];
        const shortName = (`${firstLetter}${lastLetter}`)
        return shortName.toUpperCase();
    }


    function capitalizeFirstLetter(str: string): string {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    const issueName = capitalizeFirstLetter(issue?.title);

    return (
        <div className='w-[100%] h-[45px] border-b'>
            <div className='mx-5 flex justify-between items-center h-full'>
                <div className='w-[40%] flex items-center gap-6 max-w-[50%] border-r h-full'>
                    <p className='text-[12px] pt-[1px] text-gray-400 font-[500]'>{`MANGO-${issue?.issue_id}`}</p>
                    <div className='flex items-center text-[15px] h-full'>
                        {issueName}
                    </div>
                </div>
                <div className='flex gap-4 pr-5 justify-end items-center w-[60%] max-w-full  h-full'>
                    <Select value={state} onValueChange={handleChange}>
                        <SelectTrigger className='text-[13px]'>
                            {renderSelectItem(state)}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="backlog">
                                {renderSelectItem("backlog")}
                            </SelectItem>
                            <SelectItem value="todo">
                                {renderSelectItem("todo")}
                            </SelectItem>
                            <SelectItem value="progress">
                                {renderSelectItem("progress")}
                            </SelectItem>
                            <SelectItem value="completed">
                                {renderSelectItem("completed")}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={priority} onValueChange={handlePriorityChange}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <SelectTrigger
                                        className={`text-[13px] h-[25px] focus-within:border ${priority === 'high' ? 'border-red-500' :
                                            priority === 'medium' ? 'border-blue-500' :
                                                priority === 'low' ? 'border-green-500' :
                                                    ''
                                            }`}
                                    >
                                        {renderPriorityItem(priority)}
                                    </SelectTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {priority === 'high' ? <p>Urgent </p> : priority === 'medium' ? <p>Medium </p> : <p>Low </p>}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <SelectContent>
                            <SelectItem value="high">
                                {renderPriorityItem("high")}
                            </SelectItem>
                            <SelectItem value="medium">
                                {renderPriorityItem("medium")}
                            </SelectItem>
                            <SelectItem value="low">
                                {renderPriorityItem("low")}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <div className='pt-2'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <CalendarClock className='h-4 w-4' />
                                    <TooltipContent>
                                        <p>{formatDate(issue.created_at)}</p>
                                    </TooltipContent>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className=''>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="bg-blue-500 h-6 w-6 cursor-pointer rounded-full">
                                    <p className="text-center text-white text-[12px] pt-[1px]">{assignes(issue.team_member.name)}</p>
                                    <TooltipContent>
                                        <p>{issue.team_member.name}</p>
                                    </TooltipContent>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className='border-yellow-500 text-[12px] border bg-[#ffe5a3] rounded-sm px-[6px]'>
                        {sprint.name}
                    </div>
                </div>
            </div>
        </div>
    )
}