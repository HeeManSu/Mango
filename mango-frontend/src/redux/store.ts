import { configureStore } from '@reduxjs/toolkit';
import sprintSlice from './slices/sprintSlice';

export const store = configureStore({
    reducer: {
        sprints: sprintSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch