import React, { useState } from 'react';
import Header from './Header';

export default function Home() {
  const [pesquisa, setPesquisa] = useState('');
  return (
    <>
      <Header />
      <div className="container mt-4">Home</div>
    </>
  );
}
