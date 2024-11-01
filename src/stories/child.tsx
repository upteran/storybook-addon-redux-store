import React from 'react';
import { useSelector } from 'react-redux';

export const Child = () => {
  const { x } = useSelector(state => {
    console.log(state)
    return { x: state.count.x }
  });
  return (
    <div>{x}</div>
  )
}
