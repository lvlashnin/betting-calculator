import { GAME_TYPES } from "../constants/gameTypes";

export const formatMoney = (amount: number, currencyCode: string) => {
  const validCurr = currencyCode || "UAH";
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: validCurr,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getGameLabel = (gameValue: string) => {
  return GAME_TYPES.find((el) => el.value === gameValue)?.label || gameValue;
};
