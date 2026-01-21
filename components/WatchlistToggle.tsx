'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  addToWatchlist,
  isInWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';
import { Button } from '@/components/ui/button';

interface WatchlistToggleProps {
  symbol: string;
  companyName: string;
  size?: 'sm' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  iconOnly?: boolean;
}

export default function WatchlistToggle({
  symbol,
  companyName,
  size = 'lg',
  variant = 'outline',
  iconOnly = false,
}: WatchlistToggleProps) {
  const [isInList, setIsInList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if stock is in watchlist on mount
  useEffect(() => {
    const checkWatchlist = async () => {
      setIsLoading(true);
      const inList = await isInWatchlist(symbol);
      setIsInList(inList);
      setIsLoading(false);
    };

    checkWatchlist();
  }, [symbol]);

  const handleToggleWatchlist = async () => {
    try {
      setIsLoading(true);

      if (isInList) {
        // Remove from watchlist
        const result = await removeFromWatchlist(symbol);
        if (result.success) {
          setIsInList(false);
          toast.success(`${symbol} removed from watchlist`);
        } else {
          toast.error(result.message);
        }
      } else {
        // Add to watchlist
        const result = await addToWatchlist(symbol, companyName);
        if (result.success) {
          setIsInList(true);
          toast.success(`${symbol} added to watchlist`);
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const iconSize = {
    sm: 16,
    lg: 24,
  }[size];

  return (
    <Button
      onClick={handleToggleWatchlist}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={isInList ? 'text-red-500 hover:text-red-600' : ''}
      title={isInList ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <Heart
        size={iconSize}
        fill={isInList ? 'currentColor' : 'none'}
        className={isInList ? 'text-red-500' : ''}
      />
      {!iconOnly && (
        <span className="ml-2 hidden sm:inline">
          {isInList ? 'Remove' : 'Add to Watchlist'}
        </span>
      )}
    </Button>
  );
}
