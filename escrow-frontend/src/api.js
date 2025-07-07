import axios from 'axios';

export async function createEscrow(seller, token, amount) {
  try {
    const res = await axios.post('http://localhost:3001/api/escrow/create', {
      seller,
      token,
      amount,
    });
    console.log('Escrow created:', res.data);
  } catch (error) {
    console.error('Error creating escrow:', error);
  }
}
