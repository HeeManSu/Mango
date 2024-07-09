import { FetchSprintsPayload, SprintState } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const server = "http://localhost:8082/api/v1";



const initialState: SprintState = {
    sprints: [],
    status: 'idle',
    error: null,
    message: null
};


export const fetchSprints = createAsyncThunk('fetchSprints', async () => {
    try {
        const { data } = await axios.get(`${server}/sprints`, {
        });

        return data;
    } catch (error) {
        throw new Error("unable to fetch data");
    }
});


const sprintsSlice = createSlice({
    name: 'sprints',
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSprints.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSprints.fulfilled, (state, action: PayloadAction<FetchSprintsPayload>) => {
                state.status = 'succeeded';
                state.sprints = action.payload.sprints;
                state.message = action.payload.message;
            })
            .addCase(fetchSprints.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch sprints';
            });
    },
});

export const { clearMessage, clearError } = sprintsSlice.actions;

export default sprintsSlice.reducer;