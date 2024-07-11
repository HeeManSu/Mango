// src/hooks/useInput.ts
import React from 'react';

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

export default useInput;