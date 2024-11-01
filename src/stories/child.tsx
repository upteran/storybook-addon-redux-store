import React from 'react';
import { useSelector } from 'react-redux';

export const Child = () => {
  const { x } = useSelector(state => {
    console.log('child component state', state)
    return { x: state.counter.value }
  });
  return (
    <div>{x}</div>
  )
}
