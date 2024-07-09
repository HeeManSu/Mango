import { SidebarButton } from './button';
import { Separator } from "@/components/ui/separator"
import Add from '../../assets/Add.svg'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, MoreHorizontal, Settings } from 'lucide-react';
import { CreateIssue } from '../Create Issue/CreateIssue';
import { UseDialog } from '@/hooks/useDialog';

export function SidebarDesktop() {
    const { isOpen, openDialog, closeDialog } = UseDialog();
    return (
        <>

            <aside className='w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r'>
                <div className='h-full py-4'>
                    <div className="flex px-6 items-center justify-between">
                        <h3 className='cursor-pointer font-[600] font-poppins text-[24px]'>Atlas</h3>
                        <div className="bg-blue-500 h-9 w-9 cursor-pointer rounded-md">
                            <h5 className="text-center text-white pt-1.5">HS</h5>
                        </div>
                    </div>
                    <Separator className='my-1.5 w-full' />
                    <div className="w-auto  mx-4 mt-3">
                        <Button onClick={openDialog} className="w-full items-center justify-start border-2">
                            <img className="pr-2" src={Add} />
                            New issue
                        </Button>
                    </div>
                    <div className="mt-5 mx-4">
                        <h3>Workspace</h3>
                        <div className='mt-5'>
                            <div className='flex flex-col gap-1 w-full'>
                                <Button className="border-2 justify-start">
                                    All issues
                                </Button>
                                <Button className="border-2 justify-start">
                                    Sprints
                                </Button>
                            </div>
                            <div className='absolute left-0 bottom-3 w-full px-3'>
                                <Separator className='absolute -top-3 left-0 w-full' />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant='ghost' className='w-full justify-start'>
                                            <div className='flex justify-between items-center w-full'>
                                                <div className='flex gap-2'>
                                                    <Avatar className='h-5 w-5'>
                                                        <AvatarImage src='https://github.com/max-programming.png' />
                                                        <AvatarFallback>Himanshu Sharma</AvatarFallback>
                                                    </Avatar>
                                                    <span>Himanshu Sharma</span>
                                                </div>
                                                <MoreHorizontal size={20} />
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
                                        <div className='space-y-1'>
                                            <SidebarButton size='sm' icon={Settings} className='w-full'>
                                                Account Settings
                                            </SidebarButton>

                                            <SidebarButton size='sm' icon={LogOut} className='w-full'>
                                                Log Out
                                            </SidebarButton>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <CreateIssue isOpen={isOpen} onClose={closeDialog} />        </>
    );
}
