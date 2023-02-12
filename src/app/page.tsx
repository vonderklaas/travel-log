import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import { TravelLogMap } from '@/components/TravelLogMap';
import { TravelLogSidebar } from '@/components/TravelLogSidebar';

// React Server component (can only run on server, ssr)
export default async function Home() {
  // Querying database inside

  // ADD REMOVE LOG BACK-END
  const logs = await TravelLogs.find().toArray();
  return (
    <main className='w-full h-full'>
      <TravelLogMap logs={logs} />
      <TravelLogSidebar logs={logs} />
    </main>
  );
}
