import { TravelLogForm } from '@/components/AddForm';

export default async function Add() {
  return (
    <main className='h-full overflow-auto p-6'>
      <h1 className='text-3xl font-bold underline'>Travel Log</h1>
      <TravelLogForm />
    </main>
  );
}
