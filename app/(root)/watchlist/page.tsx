'use client';

import { useEffect, useState } from 'react';
import { getWatchlist, removeFromWatchlist } from '@/lib/actions/watchlist.actions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

interface WatchlistItem {
  id: string;
  symbol: string;
  companyName: string;
  currentPrice?: number;
  addedDate: string;
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      setIsLoading(true);
      try {
        const items = await getWatchlist();
        setWatchlist(items);
      } catch (error) {
        toast.error('Failed to load watchlist');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemove = async (symbol: string) => {
    try {
      const result = await removeFromWatchlist(symbol);
      if (result.success) {
        setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
        toast.success(`${symbol} removed from watchlist`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to remove from watchlist');
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#0FEDBE]"></div>
          </div>
          <p className="text-gray-500">Loading watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">
            📊 My Watchlist
          </h1>
          <p className="text-gray-400">
            Track your favorite stocks and monitor market movements
          </p>
        </div>

        {/* Empty State */}
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 py-16">
            <div className="mb-4 text-5xl">📈</div>
            <h2 className="mb-2 text-2xl font-semibold text-white">
              Your watchlist is empty
            </h2>
            <p className="mb-6 text-gray-400">
              Search for stocks and add them to your watchlist to get started
            </p>
            <Link href="/search">
              <Button className="bg-[#0FEDBE] text-black hover:bg-[#0EDAAA]">
                Search Stocks
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gray-800 p-6">
                <p className="text-gray-400">Total Stocks</p>
                <p className="text-3xl font-bold text-[#0FEDBE]">
                  {watchlist.length}
                </p>
              </div>
              <div className="rounded-lg bg-gray-800 p-6">
                <p className="text-gray-400">Average Price</p>
                <p className="text-3xl font-bold text-[#0FEDBE]">
                  $
                  {(
                    watchlist.reduce((sum, item) => sum + (item.currentPrice || 0), 0) /
                    watchlist.filter((item) => item.currentPrice).length
                  ).toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg bg-gray-800 p-6">
                <p className="text-gray-400">Total Value</p>
                <p className="text-3xl font-bold text-[#0FEDBE]">
                  $
                  {watchlist
                    .reduce((sum, item) => sum + (item.currentPrice || 0), 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>

            {/* Watchlist Table */}
            <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-900">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Symbol
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Company Name
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Added Date
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {watchlist.map((item) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/stocks/${item.symbol}`}
                            className="font-bold text-[#0FEDBE] hover:underline"
                          >
                            {item.symbol}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-200">
                          {item.companyName}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {item.currentPrice ? (
                            <div className="flex items-center justify-end gap-2">
                              <span className="font-semibold text-white">
                                ${item.currentPrice.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {formatDate(item.addedDate)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            onClick={() => handleRemove(item.symbol)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
