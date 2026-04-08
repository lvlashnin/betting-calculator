import React from "react";
import type {
  BetResult as BetResultType,
  CurrencyType,
} from "../../types/betTypes";
import { GAME_TYPES } from "../../constants/gameTypes";

import cn from "classnames";
import styles from "./BetResult.module.css";

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
          <p>Введіть суму, коефіцієнт та оберіть тип гри...</p>
        </div>
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
