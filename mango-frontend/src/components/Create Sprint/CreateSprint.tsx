import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from './DatePicker'
import { isBefore, startOfToday } from 'date-fns'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { createSprintDataType } from '@/types'
import { clearState, createSprint } from '@/redux/slices/sprintSlice'
import toast from 'react-hot-toast'
import useInput from '@/hooks/useInput'

interface CreateSprintProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateSprint: React.FC<CreateSprintProps> = ({ isOpen, onClose }) => {

    const [name, handleNameChange, resetName] = useInput('');
    const [description, handleDescriptionChange, resetDescription] = useInput('');
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [status, setStatus] = React.useState<'ongoing' | 'upcoming' | 'completed'>('ongoing');
    const today = startOfToday();
    const dispatch = useDispatch<AppDispatch>();

    // const { message, error } = useSelector((state: RootState) => state.sprints);

    // console.log("message: ", message);
    // console.log("error: ", error)

    React.useEffect(() => {
        if (startDate && isBefore(today, startDate)) {
            setStatus('upcoming');
        }
    }, [startDate, today]);

    const calculateDays = (): number | null => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffInTime = end.getTime() - start.getTime();
            const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24) + 1);
            return diffInDays;
        }
        return null;
    };

    console.log(calculateDays())

    const handleClose = (): void => {
        resetName();
        resetDescription();
        setStartDate(null)
        setEndDate(null)
        onClose();
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const sprint: createSprintDataType = {
            name,
            description,
            start_date: startDate,
            end_date: endDate,
            status
        };
        const resultAction = await dispatch(createSprint(sprint));
        if (createSprint.fulfilled.match(resultAction)) {
            toast.success(resultAction?.payload?.message);
            dispatch(clearState());
        } else if (createSprint.rejected.match(resultAction)) {
            toast.error('Failed to create Sprint');
        } else {
            toast.error('Unexpected error occurred');
        }
        onClose();
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="">
                    <DialogHeader>
                        <div className='w-fit flex gap-3 items-center'>
                            <div className='border cursor-pointer hover:bg-blue-50 p-[1.5px] rounded-md text-[14px]'>✨ &nbsp;Atlas</div>
                            <DialogTitle>Create Cycle</DialogTitle>
                        </div>
                        <DialogDescription />
                        <div className='pt-2 flex flex-col gap-3'>
                            <Input id='name' type={'text'} placeholder='Title...' value={name} onChange={handleNameChange} />
                            <Textarea placeholder='Description' value={description} onChange={handleDescriptionChange} />
                        </div>
                        <div className='pt-[10px]'>
                            <DatePicker
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                            />
                        </div>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                            <Button className='border-2 bg-white' type="button" variant="secondary" size={'md'}
                                onClick={handleClose}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="button" variant="secondary" size={'md'}
                            onClick={handleSubmit}
                            className='bg-blue-500 hover:bg-blue-500 text-white'
                        >
                            Create Issue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateSprint