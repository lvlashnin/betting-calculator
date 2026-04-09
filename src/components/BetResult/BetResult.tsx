import React from "react";
import type {
  BetResult as BetResultType,
  CurrencyType,
} from "../../types/betTypes";
import { formatMoney, getGameLabel } from "../../utils/formatters";

import styles from "./BetResult.module.css";
import cn from "classnames";

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
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <p>Введіть суму, коефіцієнт та оберіть тип гри</p>
        </div>
      </div>
    );
  }

  const gameLabel = getGameLabel(gameType);

  return (
    <div className={styles.container}>
      <div className={styles.activeState}>
        <div className={styles.header}>
          <span className={styles.gameBadge}>{gameLabel}</span>
        </div>

        <div className={styles.cardsWrapper}>
          <div className={cn(styles.resultCard, styles.winCard)}>
            <span className={cn(styles.label, styles.winLabel)}>
              Потенційний виграш:
            </span>
            <strong className={cn(styles.amount, styles.winAmount)}>
              {formatMoney(result.win, currency)}
            </strong>
          </div>

          <div className={styles.resultCard}>
            <span className={styles.label}>Чистий прибуток:</span>
            <strong className={styles.amount}>
              {formatMoney(result.profit, currency)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
