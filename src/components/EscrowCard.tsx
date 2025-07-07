
import React, { useState } from 'react';
import { Clock, ExternalLink, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { EscrowTransaction } from '../types/escrow';
import { useEscrow } from '../contexts/EscrowContext';
import { calculateTimeRemaining, getStatusColor, getStatusBadgeColor } from '../utils/escrowUtils';

interface EscrowCardProps {
  transaction: EscrowTransaction;
}

const EscrowCard: React.FC<EscrowCardProps> = ({ transaction }) => {
  const { releaseEscrow, disputeEscrow, cancelEscrow, userAddress } = useEscrow();
  const [disputeReason, setDisputeReason] = useState('');
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);

  const timeRemaining = calculateTimeRemaining(transaction.expiresAt);
  const isBuyer = transaction.buyer === userAddress;
  const isSeller = transaction.seller === userAddress;
  const canRelease = transaction.status === 'active' && isBuyer;
  const canDispute = transaction.status === 'active' && isBuyer;
  const canCancel = transaction.status === 'active' && isSeller;

  const handleDispute = () => {
    if (disputeReason.trim()) {
      disputeEscrow(transaction.id, disputeReason);
      setDisputeReason('');
      setIsDisputeOpen(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-white">{transaction.tokenSymbol}</span>
            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadgeColor(transaction.status)}`}>
              {transaction.status.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-300 text-sm">{transaction.itemDescription}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{transaction.amount}</p>
          <p className="text-sm text-gray-400">{transaction.tokenSymbol}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Buyer:</span>
          <span className="text-gray-300">{transaction.buyer.slice(0, 6)}...{transaction.buyer.slice(-4)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Seller:</span>
          <span className="text-gray-300">{transaction.seller.slice(0, 6)}...{transaction.seller.slice(-4)}</span>
        </div>
        {transaction.status === 'active' && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Time Remaining:</span>
            <span className={`font-medium ${timeRemaining === 'Expired' ? 'text-red-400' : 'text-blue-400'}`}>
              <Clock className="w-3 h-3 inline mr-1" />
              {timeRemaining}
            </span>
          </div>
        )}
      </div>

      {transaction.fulfillmentLink && (
        <div className="mb-4">
          <a
            href={transaction.fulfillmentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            View Fulfillment
          </a>
        </div>
      )}

      {transaction.disputeReason && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            Dispute: {transaction.disputeReason}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {canRelease && (
          <Button
            onClick={() => releaseEscrow(transaction.id)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Release
          </Button>
        )}

        {canDispute && (
          <Dialog open={isDisputeOpen} onOpenChange={setIsDisputeOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-red-600 hover:bg-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Dispute
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>File a Dispute</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="Explain the reason for your dispute..."
                  className="bg-gray-800 border-gray-700"
                />
                <Button
                  onClick={handleDispute}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!disputeReason.trim()}
                >
                  Submit Dispute
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {canCancel && (
          <Button
            onClick={() => cancelEscrow(transaction.id)}
            className="flex-1 bg-gray-600 hover:bg-gray-700"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default EscrowCard;
