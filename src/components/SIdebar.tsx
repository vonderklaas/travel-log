'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { useState } from 'react';
import { AddForm } from './AddForm';

import { useSidebarStateStore } from '@/store/store';
import LogsHistory from './LogsHistory';

type TravelLogMapProps = {
    logs: TravelLogWithId[];
};

export const Sidebar = ({ logs }: TravelLogMapProps) => {
    const [logsHistory, setLogsHistory] = useState(false);

    const isOpened = useSidebarStateStore((state) => state.isOpened);
    const setIsOpened = useSidebarStateStore((state) => state.setIsOpened);

    const closeSidebar = () => setIsOpened(false);

    return (
        <>
            <div className='fixed top-4 right-48 z-[999]'>
                <button
                    className='btn bnt-primary'
                    onClick={() => setLogsHistory(!isOpened)}
                >
                    MY EXPERIENCES
                </button>
            </div>
            <div className='fixed top-4 right-4 z-[999]'>
                <button
                    className='btn bnt-primary'
                    onClick={() => setIsOpened(!isOpened)}
                >
                    ADD EXPERIENCE
                </button>
            </div>
            {isOpened ? (
                <div className='fixed h-full top-0 right-0 p-4 w-96 bg-base-100 text-base-content z-[999] overflow-y-auto'>
                    <AddForm
                        onCancel={closeSidebar}
                        onComplete={closeSidebar}
                    />
                </div>
            ) : null}
            {logsHistory ? (
                <div className='fixed h-full top-0 right-0 p-4 w-96 bg-base-100 text-base-content z-[999] overflow-y-auto'>
                    <LogsHistory logs={logs} setLogsHistory={setLogsHistory} />
                </div>
            ) : null}
        </>
    );
};
