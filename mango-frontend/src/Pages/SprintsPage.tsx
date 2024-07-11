import { Sidebar } from '@/components/sidebar/sidebar'
import Sprints from '@/components/Sprints/Sprints'
import React from 'react'

const SprintsPage: React.FC = () => {
    return (
        <div className='flex'>
            <Sidebar />
            {/* <IssueTable columns={columns} data={issues} /> */}
            <Sprints />
        </div>
    )
}

export default SprintsPage