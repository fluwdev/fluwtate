import React from 'react';
import { counterStore } from '../store';
import { RippleButton as Button } from './button';

export const CounterControls: React.FC = () => {
  const increment = () => {
    counterStore.setState((state) => ({ count: state.count + 1 }));
  };

  const decrement = () => {
    if(counterStore.getState().count > 0) counterStore.setState((state) => ({ count: state.count - 1 }));
  };

  const reset = () => {
    counterStore.setState(() => ({ count: 0 }));
  };

  return (
    <div className='flex flex-row gap-4 mt-5'>
      <Button className='bg-white' onClick={increment}>Increment</Button>
      <Button className='bg-white' onClick={decrement}>Decrement</Button>
      <Button className='bg-white' onClick={reset}>Reset</Button>
    </div>
  );
};
