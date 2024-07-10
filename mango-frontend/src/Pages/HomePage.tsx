import { columns } from '@/components/Issue Table/Columns';
import { IssueTable } from '@/components/Issue Table/IssueTable';
import { Sidebar } from '@/components/sidebar/sidebar';
import { getAllIssues } from '@/redux/slices/issueSlice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { issues } = useSelector((state: RootState) => state.issues);
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            dispatch(getAllIssues());
            isInitialRender.current = false;
        }
    }, [dispatch]);

    return (
        <div className='flex'>
            <Sidebar />
            <IssueTable columns={columns} data={issues} />
        </div>
    );
}

export default HomePage;