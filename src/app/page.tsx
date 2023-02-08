import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import { TravelLogMap } from '@/components/TravelLogMap';

export default async function Home() {
  const logs = await TravelLogs.find().toArray();
  return (
    <main className='w-full h-full'>
      <TravelLogMap logs={logs} />
    </main>
  );
}
