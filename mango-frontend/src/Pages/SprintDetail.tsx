import React from 'react'

import { Sidebar } from '@/components/sidebar/sidebar';
import Details from '@/components/SprintDetail/Details';


const SprintDetail: React.FC = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <Details />
        </div>
    )
}

export default SprintDetail