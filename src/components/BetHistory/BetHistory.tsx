import React, { useState } from "react";
import type { BetHistoryItem as BetHistoryItemType } from "../../types/betTypes";
import { BetHistoryItem } from "../BetHistoryItem/BetHistoryItem";

import cn from "classnames";
import styles from "./BetHistory.module.css";

interface BetHistoryProps {
  history: BetHistoryItemType[];
  onClear: () => void;
}

export const BetHistory: React.FC<BetHistoryProps> = ({ history, onClear }) => {
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = () => {
    setIsClearing(true);

    setTimeout(() => {
      onClear();
      setIsClearing(false);
    }, 500);
  };

  if (history.length === 0) {
    return (
      <div className={styles.historyContainer}>
        <p>Історія порожня</p>
      </div>
    );
  }
  return (
    <div className={styles.historyContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Останні ставки</h3>
        <button
          onClick={handleClear}
          className={styles.clearBtn}
          disabled={isClearing}
        >
          Очистити
        </button>
      </div>

      <div className={cn(styles.list, { [styles.isClearing]: isClearing })}>
        {history.map((bet) => (
          <BetHistoryItem key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  );
};
