import React from 'react';
import { useSelector } from 'react-redux';
import Routes from './routes';



function App() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <Routes signed={signed} />
  )
}

export default App;
