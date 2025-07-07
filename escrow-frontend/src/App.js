import React, { useState } from 'react';
import WalletConnect from './WalletConnect';
import { createEscrow } from './api';

function App() {
  const [seller, setSeller] = useState('');
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');

  const handleCreate = () => {
    createEscrow(seller, token, amount);
  };

  return (
    <div>
      <WalletConnect />
      <h1>Create Escrow</h1>
      <input placeholder="Seller Address" onChange={e => setSeller(e.target.value)} />
      <input placeholder="Token Address" onChange={e => setToken(e.target.value)} />
      <input placeholder="Amount (wei)" onChange={e => setAmount(e.target.value)} />
      <button onClick={handleCreate}>Create Escrow</button>
    </div>
  );
}

export default App;
