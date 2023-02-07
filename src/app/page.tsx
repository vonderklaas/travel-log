import { TravelLogs, TravelLog } from '@/models/TravelLogs';
import { TravelLogForm } from '@/components/TravelLogForm';

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main>
      <h1 className='text-3xl font-bold underline'>TravelLog</h1>
      {Object.keys(logs).length === 0 ? (
        <p>No logs</p>
      ) : (
        <>
          {logs.map((log: TravelLog) => {
            // @ts-ignore
            return <div key={log._id.toString()}>{log.title}</div>;
          })}
        </>
      )}
      <TravelLogForm />
    </main>
  );
}
