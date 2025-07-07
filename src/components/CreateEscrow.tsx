
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEscrow } from '../contexts/EscrowContext';

const CreateEscrow: React.FC = () => {
  const { tokens, createEscrow, isConnected } = useEscrow();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    tokenSymbol: '',
    tokenAddress: '',
    amount: '',
    seller: '',
    itemDescription: '',
    fulfillmentLink: '',
  });

  const handleTokenSelect = (tokenSymbol: string) => {
    const token = tokens.find(t => t.symbol === tokenSymbol);
    if (token) {
      setFormData(prev => ({
        ...prev,
        tokenSymbol: token.symbol,
        tokenAddress: token.address,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    createEscrow({
      tokenSymbol: formData.tokenSymbol,
      tokenAddress: formData.tokenAddress,
      amount: parseFloat(formData.amount),
      buyer: '0x742d35Cc6634C0532925a3b8D', // Mock user address
      seller: formData.seller,
      itemDescription: formData.itemDescription,
      fulfillmentLink: formData.fulfillmentLink || undefined,
    });

    setFormData({
      tokenSymbol: '',
      tokenAddress: '',
      amount: '',
      seller: '',
      itemDescription: '',
      fulfillmentLink: '',
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Escrow
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New Escrow</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="token">Token</Label>
            <Select onValueChange={handleTokenSelect} required>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {tokens.map(token => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol} - {token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="bg-gray-800 border-gray-700"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="seller">Seller Address</Label>
            <Input
              id="seller"
              value={formData.seller}
              onChange={(e) => setFormData(prev => ({ ...prev, seller: e.target.value }))}
              className="bg-gray-800 border-gray-700"
              placeholder="0x..."
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Item Description</Label>
            <Textarea
              id="description"
              value={formData.itemDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, itemDescription: e.target.value }))}
              className="bg-gray-800 border-gray-700"
              placeholder="Describe the item or service"
              required
            />
          </div>

          <div>
            <Label htmlFor="fulfillment">Fulfillment Link (Optional)</Label>
            <Input
              id="fulfillment"
              value={formData.fulfillmentLink}
              onChange={(e) => setFormData(prev => ({ ...prev, fulfillmentLink: e.target.value }))}
              className="bg-gray-800 border-gray-700"
              placeholder="https://..."
            />
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Create Escrow
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEscrow;
