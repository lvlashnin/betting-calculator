import React from "react";
import type { BetHistoryItem as BetHistoryItemType } from "../../types/betTypes";
import { formatMoney, getGameLabel } from "../../utils/formatters";

import cn from "classnames";
import styles from "./BetHistoryItem.module.css";

interface BetHistoryItemProps {
  bet: BetHistoryItemType;
}

export const BetHistoryItem: React.FC<BetHistoryItemProps> = ({ bet }) => {
  const gameLabel = getGameLabel(bet.gameType);

  return (
    <div className={styles.itemCard}>
      <div className={styles.header}>
        <span className={styles.gameType}>{gameLabel}</span>
        <span className={styles.date}>{bet.date}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Ставка</span>
          <strong className={styles.statValue}>
            {formatMoney(bet.amount, bet.currency)}
          </strong>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Коеф</span>
          <strong className={styles.statValue}>x{bet.coefficient}</strong>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Виграш</span>
          <strong className={cn(styles.statValue, styles.winValue)}>
            {formatMoney(bet.potentialWin, bet.currency)}
          </strong>
        </div>
      </div>
    </div>
  );
};
