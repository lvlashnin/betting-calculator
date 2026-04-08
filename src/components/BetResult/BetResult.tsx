import React from "react";
import type {
  BetResult as BetResultType,
  CurrencyType,
} from "../../types/betTypes";
import { GAME_TYPES } from "../../constants/gameTypes";

interface BetResultProps {
  result: BetResultType | null;
  gameType: string;
  currency: CurrencyType;
}

export const BetResult: React.FC<BetResultProps> = ({
  result,
  gameType,
  currency,
}) => {
  if (!result) {
    return (
      <div className="bet-result placeholder">
        <p>Введіть дані для розрахунку</p>
      </div>
    );
  }

  const gameLabel =
    GAME_TYPES.find((el) => el.value === gameType)?.label || gameType;

  const formatMoney = (amount: number, currCode: string) => {
    const validCurr = currCode || "UAH";
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: validCurr,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bet-result active">
      <h3>
        <span className="game-badge">{gameLabel}</span>
      </h3>

      <div className="result-cards">
        <div className="result-card win">
          <span className="label">Потенційний виграш:</span>
          <strong className="amount">
            {formatMoney(result.win, currency)}
          </strong>
        </div>

        <div className="result-card profit">
          <span className="label">Чистий прибуток:</span>
          <strong className="amount">
            {formatMoney(result.profit, currency)}
          </strong>
        </div>
      </div>
    </div>
  );
};
