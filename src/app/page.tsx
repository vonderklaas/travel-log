import LoadingSpinner from '@/components/LoadingSpinner';
import { TravelLogSidebar } from '@/components/TravelLogSidebar';
import { TravelLogs } from '@/models/TravelLog/TravelLogs';
// import { TravelLogSidebar } from '@/components/TravelLogSidebar';

const TravelLogMap = dynamic(import('@/components/TravelLogMap'), {
  ssr: false,
  loading: LoadingSpinner,
});

// import { TravelLogMap } from '@/components/TravelLogMap';
import dynamic from 'next/dynamic';
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
