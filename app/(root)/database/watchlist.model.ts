import mongoose from 'mongoose';

interface IWatchlist extends mongoose.Document {
  userId: string;
  symbol: string;
  companyName: string;
  currentPrice?: number;
  addedDate: Date;
  updatedDate: Date;
}

const WatchlistSchema = new mongoose.Schema<IWatchlist>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      default: null,
    },
    addedDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create unique compound index for userId and symbol (one entry per user per stock)
WatchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export const Watchlist =
  mongoose.models.Watchlist || mongoose.model('Watchlist', WatchlistSchema);

export type { IWatchlist };
