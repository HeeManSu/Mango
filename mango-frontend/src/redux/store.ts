import { configureStore } from '@reduxjs/toolkit';
import sprintSlice from './slices/sprintSlice';
import issueSlice from './slices/issueSlice';

export const store = configureStore({
    reducer: {
        sprints: sprintSlice,
        issues: issueSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch