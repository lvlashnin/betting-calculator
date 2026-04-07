import { useState, useEffect, useMemo } from "react";
import type {
  BetFormData,
  BetResult,
  BetHistoryItem,
  BetErrors,
} from "../types/betTypes";
import { EXCHANGE_RATES } from "../constants/gameCurrency";

export const useBetCalculator = () => {
  const [formData, setFormData] = useState<BetFormData>({
    betAmount: "",
    coefficient: "",
    gameType: "",
    currency: "UAH",
  });

  const [errors, setErrors] = useState({});

  const [history, setHistory] = useState<BetHistoryItem[]>(() => {
    const saved = localStorage.getItem("betHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("betHistory", JSON.stringify(history));
  }, [history]);

  const result = useMemo<BetResult | null>(() => {
    const amount = parseFloat(formData.betAmount);
    const coeff = parseFloat(formData.coefficient);

    if (isNaN(amount) || isNaN(coeff) || amount <= 0 || coeff < 1.01) {
      return null;
    }

    const win = amount * coeff;
    const profit = win - amount;
    const rate = EXCHANGE_RATES[formData.currency] | 1;

    return {
      win: win * rate,
      profit: profit * rate,
    };
  }, [formData.betAmount, formData.coefficient, formData.currency]);

  const validate = (): boolean => {
    const newErrors: BetErrors = {};
    const amount = parseFloat(formData.betAmount);
    const coeff = parseFloat(formData.coefficient);

    if (!formData.betAmount || isNaN(amount))
      newErrors.betAmount = "Введіть суму ставки";
    else if (amount <= 0) newErrors.betAmount = "Сума повинна бути більше 0";
    else if (amount > 100000) newErrors.betAmount = "Максимум 100 000";

    if (!formData.coefficient || isNaN(coeff))
      newErrors.coefficient = "Введіть коефіцієнт";
    else if (coeff < 1.01)
      newErrors.coefficient = "Мінімальний коефіцієнт 1.01";
    else if (coeff > 1000) newErrors.coefficient = "Максимум 1000";

    if (!formData.gameType) newErrors.gameType = "Оберіть тип гри";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof BetFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const addToHistory = () => {
    if (!validate() || !result) return;

    const newBet: BetHistoryItem = {
      id: Date.now(),
      date: new Date().toLocaleString("uk-UA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      amount: parseFloat(formData.betAmount),
      coefficient: parseFloat(formData.coefficient),
      gameType: formData.gameType,
      currency: formData.currency,
      potentialWin: result.win,
      profit: result.profit,
    };

    setHistory((prev) => [newBet, ...prev].slice(0, 5));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    formData,
    errors,
    history,
    result,
    handleInputChange,
    addToHistory,
    clearHistory,
    validate,
  };
};
