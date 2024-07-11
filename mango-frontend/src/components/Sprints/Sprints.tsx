import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchSprints } from '@/redux/slices/sprintSlice'
import { UseDialog } from '@/hooks/useDialog'
import CreateSprint from '../Create Sprint/CreateSprint'

const Sprints: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { sprints } = useSelector((state: RootState) => state.sprints);
    const isMounted = useRef(false);

    const { isOpen, openDialog, closeDialog } = UseDialog();

    React.useEffect(() => {
        if (!isMounted.current) {
            const fetchSprintsAsync = async () => {
                await dispatch(fetchSprints());
            }
            fetchSprintsAsync();
            isMounted.current = true;
        }
    }, [dispatch]);

    console.log(sprints)

    return (
        <>
            <div className='w-full'>
                <div className='flex justify-between mx-5 mt-4'>
                    <h3 className='cursor-pointer font-[600] font-poppins text-[24px]'>Sprints</h3>
                    <Button className='border-2' onClick={openDialog}>Add Sprint</Button>
                </div>
                <Separator className='mt-[2px]' />
                <div className='mx-4 mt-3'>
                    <Tabs defaultValue="ongoing" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ongoing">
                            {sprints.map((sprint, i) => (
                                <div className='text-black' key={i}>
                                    {sprint.status === 'ongoing' && sprint.name}
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="upcoming">
                            {sprints.map((sprint, i) => (
                                <div key={i}>
                                    {sprint.status === 'upcoming' && sprint.name}
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="completed">
                            {sprints.map((sprint, i) => (
                                <div key={i}>
                                    {sprint.status === 'completed' && sprint.name}
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <CreateSprint isOpen={isOpen} onClose={closeDialog} />
        </>
    )
}

export default Sprints