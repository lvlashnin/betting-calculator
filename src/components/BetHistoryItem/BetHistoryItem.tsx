import React from "react";
import type { BetHistoryItem as BetHistoryItemType } from "../../types/betTypes";
import { GAME_TYPES } from "../../constants/gameTypes";

interface BetHistoryItemProps {
  bet: BetHistoryItemType;
}

export const BetHistoryItem: React.FC<BetHistoryItemProps> = ({ bet }) => {
  const gameLabel =
    GAME_TYPES.find((el) => el.value === bet.gameType)?.label || bet.gameType;

  const formatMoney = (amount: number, currCode: string) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: currCode || "UAH",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="history-item">
      <div className="history-item-header">
        <span className="game-type">{gameLabel}</span>
        <span className="date">{bet.date}</span>
      </div>

      <div className="history-item-body">
        <div className="stat">
          <span className="stat-label">Ставка:</span>
          <strong>{formatMoney(bet.amount, bet.currency)}</strong>
        </div>
        <div className="stat">
          <span className="stat-label">Коеф:</span>
          <strong>x{bet.coefficient}</strong>
        </div>
        <div className="stat win">
          <span className="stat-label">Виграш:</span>
          <strong>{formatMoney(bet.potentialWin, bet.currency)}</strong>
        </div>
      </div>
    </div>
  );
};
