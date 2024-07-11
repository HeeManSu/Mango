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

interface CreateSprintProps {
    isOpen: boolean;
    onClose: () => void;
}

export type InputReturnType = [
    string,
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    () => void
];

const useInput = (initialValue: string): InputReturnType => {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setValue(e.target.value);
    };

    const reset = () => setValue(initialValue);
    return [value, handleChange, reset] as const;
};

const CreateSprint: React.FC<CreateSprintProps> = ({ isOpen, onClose }) => {

    const [title, handleTitleChange, resetTitle] = useInput('');
    const [description, handleDescriptionChange, resetDescription] = useInput('');
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);

    console.log(title);
    console.log(description)
    console.log(startDate);
    console.log(endDate)


    const handleClose = (): void => {
        resetTitle();
        resetDescription();
        setStartDate(null)
        setEndDate(null)
        onClose();
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="">
                    <DialogHeader>
                        <div className='w-fit flex gap-3 items-center'>
                            <div className='border-2 cursor-pointer p-[2px] rounded-md text-[15px]'>✨Atlas</div>
                            <DialogTitle>Create Cycle</DialogTitle>
                        </div>
                        <DialogDescription />
                        <div className='pt-2 flex flex-col gap-3'>
                            <Input id='title' type={'text'} placeholder='Title...' value={title} onChange={handleTitleChange} />
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
                            onClick={handleClose}
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