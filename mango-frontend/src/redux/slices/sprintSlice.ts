import { createSprintDataType, createSprintPayloadType, FetchSprintsPayload, SprintState } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const server = "http://localhost:8082/api/v1";

const initialState: SprintState = {
    sprints: [],
    status: 'idle',
    error: null,
    message: null,
    sprint: null,
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

export const createSprint = createAsyncThunk<createSprintPayloadType, createSprintDataType>('createSprint', async (sprintData) => {
    try {
        const { data } = await axios.post(`${server}/sprints/create`, sprintData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data;
    } catch (error) {
        throw new Error('unable to create new sprint')
    }
})

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
        clearState() {
            return initialState;
        }
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
            })
            .addCase(createSprint.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createSprint.fulfilled, (state, action: PayloadAction<createSprintPayloadType>) => {
                state.status = 'succeeded';
                state.sprint = action.payload.sprint;
                state.sprints.unshift(action.payload.sprint)
                state.message = action.payload.message;
            })
            .addCase(createSprint.rejected, (state) => {
                state.status = 'failed';
                state.error = 'Failed to create issue';
            })
    },
});

export const { clearMessage, clearError, clearState } = sprintsSlice.actions;

export default sprintsSlice.reducer;