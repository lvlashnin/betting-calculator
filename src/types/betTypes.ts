export type CurrencyType = "UAH" | "USD" | "EUR" | "PLN" | "GBP" | "";

export interface BetFormData {
  betAmount: string;
  coefficient: string;
  gameType: string;
  currency: CurrencyType;
}

export interface BetResult {
  win: number;
  profit: number;
}

export interface BetHistoryItem {
  id: number;
  date: string;
  amount: number;
  coefficient: number;
  gameType: string;
  currency: CurrencyType;
  potentialWin: number;
  profit: number;
}

export type BetErrors = Partial<Record<keyof BetFormData, string>>;
