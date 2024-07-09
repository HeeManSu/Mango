import { useState } from "react";

interface UseDialog {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

export function UseDialog(): UseDialog {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return {
        isOpen,
        openDialog,
        closeDialog
    }
}