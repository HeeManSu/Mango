import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { GetALlIssuePayload, Issue, IssuePayload, IssueState } from "@/types";

const server = "http://localhost:8082/api/v1";

const initialState: IssueState = {
    status: 'idle',
    error: null,
    message: null,
    issue: {
        issue_id: 0,
        title: '',
        description: '',
        state: 'todo',
        priority: 'low',
        created_at: '',
        updated_at: '',
        customerId: 0,
        team_memberId: 0,
        organizationId: 0,
        customer: {
            customer_id: 0,
            name: '',
            phone: 0,
            email: '',
            organizationId: 0,
        },
        team_member: {
            team_member_id: 0,
            email: '',
            name: '',
            role: 'member',
            organizationId: 0,
        },
        organization: {
            organization_id: 0,
            name: '',
        },
        sprint: undefined,
    },
    issues: []
};


export const getAllIssues = createAsyncThunk<GetALlIssuePayload, void, { rejectValue: string }>(
    'getAllIssues',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<GetALlIssuePayload>(`${server}/issues`);
            return data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Unable to fetch issues");
        }
    }
);

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
                state.issues.unshift(action.payload.issue)
                state.message = action.payload.message;
            })
            .addCase(createIssue.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to create issue';
            })
            .addCase(getAllIssues.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllIssues.fulfilled, (state, action: PayloadAction<GetALlIssuePayload>) => {
                state.status = 'succeeded';
                state.issues = action.payload.issue;
            })
            .addCase(getAllIssues.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch issues';
            });
    },
});

export const { clearMessage, clearError, clearState } = issuesSlice.actions;

export default issuesSlice.reducer;
