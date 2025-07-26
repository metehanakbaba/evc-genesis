import { Wallet } from "../../../../../../packages/shared/api/src/lib/types/wallet.types";
import { WalletsStatsData } from "../types/wallet.types";

export function generateWalletsStats(wallets: Wallet[]): WalletsStatsData {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const total = wallets.length;
  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);

  const activeCount = wallets.filter(w => w.isActive).length;

  const recentlyCreated = wallets.filter(w => {
    const createdAt = new Date(w.createdAt);
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
  }).length;

  const lastTransactionThisMonth = wallets.filter(w => {
    if (!w.lastTransactionAt) return false;
    const txDate = new Date(w.lastTransactionAt);
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
  }).length;

  const activePercentage = total === 0 ? 0 : (activeCount / total) * 100;

  return {
    totalBalance: {
      amount: totalBalance,
      formatted: `${totalBalance.toFixed(2)} PLN`,
    },
    totalWallets: {
      count: total,
      formatted: `${total}`,
    },
    activeWallets: {
      count: activeCount,
      percentage: activePercentage.toFixed(1),
      formatted: `${activeCount} active`,
    },
    newWalletsThisMonth: {
      count: recentlyCreated,
      formatted: `${recentlyCreated}`,
    },
    walletsUsedThisMonth: {
      count: lastTransactionThisMonth,
      formatted: `${lastTransactionThisMonth}`,
    },
  };
}
