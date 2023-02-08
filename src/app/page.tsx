import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import { TravelLogForm } from '@/components/TravelLogForm';

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main>
      <h1 className='text-3xl font-bold underline'>Travel Log</h1>
      <p>There are {Object.keys(logs).length} logs in database </p>
      {Object.keys(logs).length === 0 ? (
        <p>No logs</p>
      ) : (
        <>
          {logs.map((log) => {
            // @ts-ignore
            return <div key={log._id.toString()}>{log.title}</div>;
          })}
        </>
      )}
      <TravelLogForm />
    </main>
  );
}
