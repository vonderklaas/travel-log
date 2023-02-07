'use client';

import { useState } from 'react';

export const TravelLogForm = () => {
  const [title, setTitle] = useState('');

  return (
    <form>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Title</span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <button className='btn btn-success'>Create</button>
    </form>
  );
};
