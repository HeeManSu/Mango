
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CreateIssueProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateIssue({ isOpen, onClose }: CreateIssueProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Create Issue</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input
                            type="text"
                            placeholder="Title"
                        />
                    </div>
                </div>
                <div>
                    <Textarea
                        placeholder="Click to add description"
                    />
                </div>
                <div className="flex gap-5 justify-around">
                    <Button className="border-2">
                        Backlog
                    </Button>
                    <Button className="border-2">
                        Low
                    </Button>
                    <Button className="border-2">
                        Assignes
                    </Button>
                    <Button className="border-2">
                        Sprint
                    </Button>
                </div>
                <DialogFooter className="" >
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button className="border-2">
                        Create Issue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}