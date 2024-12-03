import React from 'react';
import { useStore } from 'fluwtate';
import { counterStore } from '../store';

export const CounterDisplay: React.FC = () => {
  const count = useStore(counterStore, (state) => state.count);

  return <h1 className='text-3xl font-bold text-white/90'>Counter: {count}</h1>;
};
