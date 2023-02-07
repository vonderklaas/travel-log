'use client';

import { useState } from 'react';

export const TravelLogForm = () => {
  const [title, setTitle] = useState('');

  return (
    <form>
      <label>Title</label>
      <input
        onChange={(e) => setTitle(e.currentTarget.value)}
        value={title}
        type='text'
      />
      <button>Create</button>
    </form>
  );
};
