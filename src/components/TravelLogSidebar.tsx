'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { useState } from 'react';
import { TravelLogForm } from '../components/TravelLogForm';

import { useSidebarStateStore } from '@/store/store';

type TravelLogMapProps = {
  logs: TravelLogWithId[];
};

export const TravelLogSidebar = ({ logs }: TravelLogMapProps) => {
  const [logsHistory, setLogsHistory] = useState(false);

  const isOpened = useSidebarStateStore((state) => state.isOpened);
  const setIsOpened = useSidebarStateStore((state) => state.setIsOpened);

  const closeSidebar = () => setIsOpened(false);

  return (
    <>
      <div className='fixed top-4 right-36 z-[999]'>
        <button
          className='btn bnt-primary'
          onClick={() => setLogsHistory(!isOpened)}
        >
          My logs
        </button>
      </div>
      <div className='fixed top-4 right-4 z-[999]'>
        <button
          className='btn bnt-primary'
          onClick={() => setIsOpened(!isOpened)}
        >
          Add marker
        </button>
      </div>
      {isOpened ? (
        <div className='fixed h-full top-0 right-0 p-4 w-96 bg-base-100 text-base-content z-[999] overflow-y-auto'>
          <TravelLogForm onCancel={closeSidebar} onComplete={closeSidebar} />
        </div>
      ) : null}
      {logsHistory ? (
        <div className='fixed h-full top-0 right-0 p-4 w-96 bg-base-100 text-base-content z-[999] overflow-y-auto'>
          <h2>My Logs</h2>
          <ul>
            {logs.map((log) => {
              return (
                <li key={log._id.toString()}>
                  <p>{log.title}</p>
                  <p>{log.description}</p>
                  <img src={log.image} alt={log.title} />
                  <br />
                </li>
              );
            })}
          </ul>
          <div className='flex justify-between gap-4'>
            <button
              className='flex-grow btn btn-error'
              onClick={() => setLogsHistory(false)}
            >
              Discard
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
