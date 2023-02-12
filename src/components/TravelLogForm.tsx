'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLog, TravelLogKeyType } from '@/models/TravelLog/TravelLog';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert } from './Alert';

const travelLogInputs: Record<
  TravelLogKeyType,
  {
    label?: string;
    type: 'text' | 'url' | 'textarea' | 'number';
  }
> = {
  title: {
    type: 'text',
    label: 'What was it?',
  },
  description: {
    type: 'textarea',
    label: 'Your trip in few words',
  },
  image: {
    type: 'url',
    label: 'Add Image URL',
  },
  latitude: {
    type: 'number',
    label: 'Copy & Paste Latitude',
  },
  longitude: {
    type: 'number',
    label: 'Copy & Paste Longitude',
  },
};

interface TravelLogFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const TravelLogForm = ({ onComplete, onCancel }: TravelLogFormProps) => {
  const [formError, setFormError] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      title: '',
      description: '',
      latitude: 90,
      longitude: 180,
    },
  });

  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    const afterAddCleanup = () => {
      // Refresh, reset form and close Sidebar()
      router.push('/');
      // Reset form
      reset();
      // hide sidebar
      onComplete();
    };

    try {
      setFormError('');
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        afterAddCleanup();
      } else {
        const json = await response.json();
        // COMES FROM FROM BACKEND
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setFormError(error.message);
    }
  };

  return (
    <form
      className='mx-auto max-w-md flex gap-4 flex-col'
      onSubmit={handleSubmit(onSubmit)}
    >
      {formError ? <Alert message={formError} /> : null}
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const property = name as TravelLogKeyType;
        return (
          <div key={name} className='form-control w-full'>
            <label className='label'>
              <span className='label-text capitalize'>
                {value.label || name}
              </span>
            </label>
            {value.type === 'textarea' ? (
              <textarea
                className={`textarea textarea-bordered w-full ${
                  errors[property] ? 'textarea-error' : ''
                }`}
                {...register(property)}
              />
            ) : (
              <input
                type={value.type}
                step='any'
                className={`input input-bordered input-accent w-full ${
                  errors[property] ? 'input-error' : ''
                }`}
                {...register(property)}
              />
            )}
            {errors[property] && <span>{errors[property]?.message}</span>}
          </div>
        );
      })}

      <div className='flex justify-between gap-4'>
        <button className='flex-grow btn btn-warning'>Add marker</button>
        <button className='flex-grow btn btn-error' onClick={onCancel}>
          Discard
        </button>
      </div>
    </form>
  );
};
