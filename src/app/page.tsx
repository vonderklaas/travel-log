import dynamic from 'next/dynamic';

import { Spinner } from '@/components/Spinner';
import { Sidebar } from '@/components/SIdebar';
import { TravelLogs } from '@/models/TravelLog/TravelLogs';

const Map = dynamic(import('@/components/Map'), {
    ssr: false,
    loading: Spinner,
});

export default async function Home() {
    const logs = await TravelLogs.find().toArray();
    return (
        <main className='w-full h-full'>
            <Map logs={logs} />
            <Sidebar logs={logs} />
        </main>
    );
}
