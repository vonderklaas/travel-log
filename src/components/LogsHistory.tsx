import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import React from 'react';

type LogsHistoryProps = {
  logs: TravelLogWithId[];
  setLogsHistory: (property: boolean) => void;
};

export const LogsHistory = ({ logs, setLogsHistory }: LogsHistoryProps) => {
  return (
    <>
      <ul>
        {logs.map((log) => {
          return (
            <li key={log._id.toString()}>
              <h3 className='text-xl'>{log.title}</h3>
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
          Close
        </button>
      </div>
    </>
  );
};

export default LogsHistory;
