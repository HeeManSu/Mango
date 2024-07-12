import type { Sprint } from '@/types'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Ellipsis } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from 'react-router-dom';

type listPropType = {
    sprints: Sprint[]
}

const SprintList: React.FC<listPropType> = ({ sprints }) => {
    console.log(sprints);
    return (
        <div className='w-full'>
            {sprints.map((sprint, i) => (
                <div key={i}>
                    <SingleSprint sprint={sprint} />

                </div>
            ))}
        </div>
    )
}

export default SprintList;

const SingleSprint: React.FC<{ sprint: Sprint }> = ({ sprint }) => {
    const formatDate = (date: string) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        })
    };

    const days = React.useMemo(() => {
        const calculateDays = (): number | null => {
            if (sprint?.end_date) {
                const today = new Date();
                const end = new Date(sprint?.end_date);
                const diffInTime = end.getTime() - today.getTime();
                const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24) + 1);
                return diffInDays;
            }
            return null;
        };
        return calculateDays();
    }, [sprint?.end_date]);

    return (
        <>
            <div className='text-black flex text-[14px] items-center mt-4 h-11 hover:bg-blue-50'>
                <div className='flex w-full items-center justify-between'>
                    <div className='mx-4 pl-1'>
                        <Link to={`/sprints/${sprint.sprint_id}`}>{sprint?.name}</Link>
                    </div>
                    <div className='flex items-center gap-3 mr-7'>
                        <div className='border rounded-sm px-1 h-fit w-fit bg-[#e9ece5] border-gray-300'>
                            <h3 className='text-[12px]'>
                                {formatDate(sprint?.start_date)} &nbsp; 🡒  &nbsp; {formatDate(sprint?.end_date)}
                            </h3>
                        </div>
                        <div className='border-yellow-500 text-[11px] border bg-[#ffe5a3] rounded-sm px-[6px]'>{days} days left</div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="bg-blue-500 h-6 w-6 cursor-pointer rounded-full">
                                    <h5 className="text-center text-white text-[12px] pt-[1px]">HS</h5>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Creator</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Ellipsis className='h-6 w-8' />
                    </div>


                </div>

            </div>
            <Separator />

        </>)
}