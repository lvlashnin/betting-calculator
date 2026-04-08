import React from "react";
import type { BetHistoryItem as BetHistoryItemType } from "../../types/betTypes";
import { BetHistoryItem } from "../BetHistoryItem/BetHistoryItem";

interface BetHistoryProps {
  history: BetHistoryItemType[];
  onClear: () => void;
}

export const BetHistory: React.FC<BetHistoryProps> = ({ history, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="bet-history empty">
        <p>Історія порожня</p>
      </div>
    );
  }
  return (
    <div className="bet-history">
      <div className="history-header">
        <h3>Останні ставки</h3>
        <button onClick={onClear} className="clear-btn">
          Очистити
        </button>
      </div>

      <div className="history-list">
        {history.map((bet) => (
          <BetHistoryItem key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  );
};
