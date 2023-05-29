'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TravelLog,
    TravelLogKeyType,
    TravelLogKeyTypeWithoutLocation,
} from '@/models/TravelLog/TravelLog';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert } from './Alert';

import { useLocationStore } from '@/store/store';

const travelLogInputs: Record<
    TravelLogKeyTypeWithoutLocation,
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
    rating: {
        type: 'number',
        label: 'Rate your experience?',
    },
    image: {
        type: 'url',
        label: 'Add Image URL',
    },
};

type AddFormProps = {
    onComplete: () => void;
    onCancel: () => void;
};

export const AddForm = ({ onComplete, onCancel }: AddFormProps) => {
    const [formError, setFormError] = useState('');

    const router = useRouter();

    const location = useLocationStore((state: any) => state.location);
    const setLocation = useLocationStore((state: any) => state.setLocation);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<TravelLog>({
        resolver: zodResolver(TravelLog),
        defaultValues: {
            title: '',
            description: '',
            rating: 5,
            latitude: location?.lat,
            longitude: location?.lng,
        },
    });

    useEffect(() => {
        if (!location) {
            return;
        }
        setValue('latitude', location?.lat);
        setValue('longitude', location?.lng);
    }, [location]);

    const onSubmit: SubmitHandler<TravelLog> = async (data) => {
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
                router.push('/');
                reset();
                onComplete();
            } else {
                const json = await response.json();
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
                                min={value.type === 'number' ? 1 : undefined}
                                max={value.type === 'number' ? 10 : undefined}
                                className={`input input-bordered w-full ${
                                    errors[property] ? 'input-error' : ''
                                }`}
                                {...register(property)}
                            />
                        )}
                        {errors[property] && (
                            <span>{errors[property]?.message}</span>
                        )}
                    </div>
                );
            })}
            <div className='form-control'>
                <label className='label'>
                    <span className='label-text capitalize'>
                        Latitude, Longitude
                    </span>
                </label>
                {location ? (
                    <input
                        value={[
                            location.lat.toFixed(5),
                            location.lng.toFixed(5),
                        ].join(', ')}
                        className='input input-bordered input-disabled input-accent w-full'
                        disabled
                        type='text'
                    />
                ) : (
                    <input
                        className='input input-bordered input-disabled input-accent w-full'
                        value='Click on the map!'
                        disabled
                        type='text'
                    />
                )}
            </div>
            <div className='flex justify-between gap-4'>
                <button className='flex-grow btn btn-warning'>
                    Add Experience
                </button>
                <button
                    className='flex-grow btn btn-error'
                    onClick={() => {
                        onCancel();
                        reset();
                        setLocation(null);
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
