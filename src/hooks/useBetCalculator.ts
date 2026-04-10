import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import type {
  BetFormData,
  BetResult,
  BetHistoryItem,
  CurrencyType,
} from "../types/betTypes";
import { EXCHANGE_RATES } from "../constants/gameCurrency";

export const useBetCalculator = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BetFormData>({
    defaultValues: {
      betAmount: "",
      coefficient: "",
      gameType: "",
      currency: "UAH",
    },
    mode: "onChange",
  });

  const betAmount = watch("betAmount");
  const coefficient = watch("coefficient");
  const gameType = watch("gameType");

  const [history, setHistory] = useState<BetHistoryItem[]>(() => {
    const saved = localStorage.getItem("betHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("betHistory", JSON.stringify(history));
    } catch (error) {
      console.error("error during setting in localStorage:", error);
    }
  }, [history]);

  const result = useMemo<BetResult | null>(() => {
    const amount = parseFloat(betAmount);
    const coeff = parseFloat(coefficient);

    if (
      isNaN(amount) ||
      isNaN(coeff) ||
      amount <= 0 ||
      coeff < 1.01 ||
      !gameType
    ) {
      return null;
    }

    const win = amount * coeff;
    return {
      win,
      profit: win - amount,
    };
  }, [betAmount, coefficient, gameType]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as CurrencyType;
    const oldCurrency = getValues("currency");
    const currentAmount = parseFloat(getValues("betAmount"));

    if (
      !isNaN(currentAmount) &&
      currentAmount > 0 &&
      oldCurrency !== newCurrency
    ) {
      const amountInBase = currentAmount * EXCHANGE_RATES[oldCurrency];
      const convertedAmount = amountInBase / EXCHANGE_RATES[newCurrency];

      setValue("betAmount", convertedAmount.toFixed(2), {
        shouldValidate: true,
      });
    }

    setValue("currency", newCurrency, { shouldValidate: true });
  };

  const addToHistory = (data: BetFormData) => {
    if (!result) return;

    const newBet: BetHistoryItem = {
      id: Date.now(),
      date: new Date().toLocaleString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      amount: parseFloat(data.betAmount),
      coefficient: parseFloat(data.coefficient),
      gameType: data.gameType,
      currency: data.currency,
      potentialWin: result.win,
      profit: result.profit,
    };

    setHistory((prev) => [newBet, ...prev].slice(0, 5));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    register,
    handleSubmit,
    errors,
    result,
    history,
    watch,
    addToHistory,
    clearHistory,
    handleCurrencyChange,
  };
};
