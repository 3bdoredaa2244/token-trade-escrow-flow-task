
import { EscrowTransaction } from '../types/escrow';

export const generateEscrowId = (): string => {
  return `ESC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateTimeRemaining = (expiresAt: Date): string => {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending': return 'text-yellow-400';
    case 'active': return 'text-blue-400';
    case 'disputed': return 'text-red-400';
    case 'released': return 'text-green-400';
    case 'cancelled': return 'text-gray-400';
    default: return 'text-gray-400';
  }
};

export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'pending': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
    case 'active': return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
    case 'disputed': return 'bg-red-400/20 text-red-400 border-red-400/30';
    case 'released': return 'bg-green-400/20 text-green-400 border-green-400/30';
    case 'cancelled': return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  }
};
