import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { clearError, clearMessage, fetchSprints } from '@/redux/slices/sprintSlice'
import { UseDialog } from '@/hooks/useDialog'
import CreateSprint from '../Create Sprint/CreateSprint'
import SprintList from './SprintList'

const Sprints: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { sprints } = useSelector((state: RootState) => state.sprints);
    const isMounted = useRef(false);

    const { isOpen, openDialog, closeDialog } = UseDialog();

    React.useEffect(() => {
        if (!isMounted.current) {
            const fetchSprintsAsync = async () => {
                await dispatch(fetchSprints());
                clearMessage();
                clearError()
            }
            fetchSprintsAsync();
            isMounted.current = true;
        }
    }, [dispatch]);

    return (
        <>
            <div className='w-full'>
                <div className='flex justify-between mx-5 mt-4'>
                    <h3 className='cursor-pointer font-[600] font-poppins text-[24px]'>Sprints</h3>
                    <Button className='border-2' onClick={openDialog}>Add Sprint</Button>
                </div>
                <Separator className='mt-[2px]' />
                <div className=' mt-3'>
                    <Tabs defaultValue="ongoing">
                        <TabsList className='mx-4'>
                            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ongoing">
                            <SprintList sprints={sprints.filter(sprint => sprint.status === 'ongoing')} />
                        </TabsContent>
                        <TabsContent value="upcoming">
                            <SprintList sprints={sprints.filter(sprint => sprint.status === 'upcoming')} />
                        </TabsContent>
                        <TabsContent value="completed">
                            <SprintList sprints={sprints.filter(sprint => sprint.status === 'completed')} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <CreateSprint isOpen={isOpen} onClose={closeDialog} />
        </>
    )
}

export default Sprints