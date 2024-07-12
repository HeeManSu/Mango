import React, { useEffect } from 'react'
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
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { UseDialog } from '@/hooks/useDialog';
import { CreateIssue } from '../Create Issue/CreateIssue';
import { Separator } from "@/components/ui/separator"
import { IssueTable } from '../Issue Table/IssueTable';
import { columns } from '../Issue Table/Columns';
import { IssueType } from '@/types';


const Details: React.FC = () => {

    const { sprint_id } = useParams<{ sprint_id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { isOpen, openDialog, closeDialog } = UseDialog();

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchSprints());
        }
        fetchData();
    }, [dispatch])
    const { sprints } = useSelector((state: RootState) => state.sprints);

    const sprint = sprints.find((sprint) => sprint.sprint_id === Number(sprint_id));
    console.log(sprint);

    const issues: IssueType[] = sprint?.issue || [];

    const issueCount = sprint?.issue?.length || 0;

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
                <Separator className='mt-[2px]' />
                <IssueTable columns={columns} data={issues} />
            </div>
            <CreateIssue isOpen={isOpen} onClose={closeDialog} />
        </>
    )
}

export default Details