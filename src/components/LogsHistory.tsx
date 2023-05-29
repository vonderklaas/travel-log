import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';

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
                        <li className='p-2' key={log._id.toString()}>
                            <h3 className='text-xl'>{log.title}</h3>
                            <p className='mb-2'>{log.description}</p>
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
