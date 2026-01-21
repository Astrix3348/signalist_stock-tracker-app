'use server';

import { connectToDatabase } from '@/app/(root)/database/mongoose';
import { Watchlist } from '@/app/(root)/database/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { getCompanyQuote } from '@/lib/actions/finnhub.actions';

// Get current user
async function getCurrentUser() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList as any });
    return session?.user?.id;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

// Add stock to watchlist
export async function addToWatchlist(
  symbol: string,
  companyName: string
): Promise<{ success: boolean; message: string }> {
  try {
    await connectToDatabase();

    const userId = await getCurrentUser();
    if (!userId) {
      return { success: false, message: 'User not authenticated' };
    }

    // Check if already in watchlist
    const existing = await Watchlist.findOne({ userId, symbol });
    if (existing) {
      return { success: false, message: 'Stock already in watchlist' };
    }

    // Add to watchlist
    const watchlistItem = new Watchlist({
      userId,
      symbol: symbol.toUpperCase(),
      companyName,
    });

    await watchlistItem.save();

    return {
      success: true,
      message: `${symbol} added to watchlist`,
    };
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return { success: false, message: 'Failed to add to watchlist' };
  }
}

// Remove stock from watchlist
export async function removeFromWatchlist(
  symbol: string
): Promise<{ success: boolean; message: string }> {
  try {
    await connectToDatabase();

    const userId = await getCurrentUser();
    if (!userId) {
      return { success: false, message: 'User not authenticated' };
    }

    const result = await Watchlist.deleteOne({ userId, symbol });

    if (result.deletedCount === 0) {
      return { success: false, message: 'Stock not found in watchlist' };
    }

    return {
      success: true,
      message: `${symbol} removed from watchlist`,
    };
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return { success: false, message: 'Failed to remove from watchlist' };
  }
}

// Get all watchlist items for current user
export async function getWatchlist(): Promise<
  Array<{
    id: string;
    symbol: string;
    companyName: string;
    currentPrice?: number;
    addedDate: string;
  }>
> {
  try {
    await connectToDatabase();

    const userId = await getCurrentUser();
    if (!userId) {
      return [];
    }

    const watchlist = await Watchlist.find({ userId }).sort({ addedDate: -1 });

    // Fetch current prices from Finnhub
    const watchlistWithPrices = await Promise.all(
      watchlist.map(async (item: any) => {
        let currentPrice = item.currentPrice;
        
        // If no price stored, fetch from Finnhub
        if (!currentPrice) {
          try {
            const quoteData = await getCompanyQuote(item.symbol);
            currentPrice = quoteData?.c || undefined;
          } catch (error) {
            console.error(`Failed to fetch price for ${item.symbol}:`, error);
          }
        }

        return {
          id: item._id.toString(),
          symbol: item.symbol,
          companyName: item.companyName,
          currentPrice,
          addedDate: item.addedDate.toISOString(),
        };
      })
    );

    return watchlistWithPrices;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
}

// Check if stock is in watchlist
export async function isInWatchlist(symbol: string): Promise<boolean> {
  try {
    await connectToDatabase();

    const userId = await getCurrentUser();
    if (!userId) {
      return false;
    }

    const item = await Watchlist.findOne({
      userId,
      symbol: symbol.toUpperCase(),
    });

    return !!item;
  } catch (error) {
    console.error('Error checking watchlist:', error);
    return false;
  }
}

// Update current price for watchlist item
export async function updateWatchlistPrice(
  symbol: string,
  price: number
): Promise<{ success: boolean }> {
  try {
    await connectToDatabase();

    const userId = await getCurrentUser();
    if (!userId) {
      return { success: false };
    }

    await Watchlist.updateOne(
      { userId, symbol },
      { currentPrice: price, updatedDate: new Date() }
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating watchlist price:', error);
    return { success: false };
  }
}
