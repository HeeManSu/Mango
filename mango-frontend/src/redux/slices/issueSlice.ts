import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Issue, IssuePayload, IssueState } from "@/types";

const server = "http://localhost:8082/api/v1";

const initialState: IssueState = {
    status: 'idle',
    error: null,
    message: null,
    issue: {
        title: '',
        description: '',
        state: 'todo',
        priority: 'low',
        customerName: '',
        teamMemberName: '',
        sprintName: ''
    },
};

export const createIssue = createAsyncThunk<IssuePayload, Issue, { rejectValue: string }>(
    'createIssue',
    async (issueData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<IssuePayload>(`${server}/issues/create`, issueData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Unable to create issue");
        }
    }
);

const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = null;
        },
        clearError(state) {
            state.error = null;
        },
        clearState(state) {
            state.status = 'idle';
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createIssue.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createIssue.fulfilled, (state, action: PayloadAction<IssuePayload>) => {
                state.status = 'succeeded';
                state.issue = action.payload.issue;
                state.message = action.payload.message;
            })
            .addCase(createIssue.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to create issue';
            });
    },
});

export const { clearMessage, clearError, clearState } = issuesSlice.actions;

export default issuesSlice.reducer;
