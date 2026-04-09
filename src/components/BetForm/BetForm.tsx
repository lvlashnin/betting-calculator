import React from "react";
import { GAME_TYPES } from "../../constants/gameTypes";
import { CURRENCY_TYPES } from "../../constants/gameCurrency";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import type { BetFormData } from "../../types/betTypes";

import styles from "./BetForm.module.css";
import cn from "classnames";

interface BetFormProps {
  register: UseFormRegister<BetFormData>;
  errors: FieldErrors<BetFormData>;
  handleSubmit: UseFormHandleSubmit<BetFormData>;
  onSubmit: (data: BetFormData) => void;
  onCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const BetForm: React.FC<BetFormProps> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  onCurrencyChange,
}) => {
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="betAmount" className={styles.label}>
          Сума ставки
        </label>
        <input
          id="betAmount"
          type="number"
          step={0.01}
          min="0"
          className={cn(styles.input, {
            [styles.inputError]: errors.betAmount,
          })}
          placeholder="100"
          {...register("betAmount", {
            required: "Введіть суму ставки",
            min: { value: 0.01, message: "Сума повинна бути більше 0" },
            max: { value: 100000, message: "Максимум 100 000" },
          })}
        />
        {errors.betAmount && (
          <span className={styles.errorText}>{errors.betAmount.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="currency" className={styles.label}>
          Валюта
        </label>
        <select
          id="currency"
          className={cn(styles.input, { [styles.inputError]: errors.currency })}
          {...register("currency", { required: "Оберіть валюту" })}
          onChange={(e) => {
            onCurrencyChange(e);
          }}
        >
          <option value="" disabled>
            Оберіть валюту
          </option>
          {CURRENCY_TYPES.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
        {errors.currency && (
          <span className={styles.errorText}>{errors.currency.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="coefficient" className={styles.label}>
          Коефіцієнт
        </label>
        <input
          id="coefficient"
          type="number"
          step={0.01}
          min="1.01"
          className={cn(styles.input, {
            [styles.inputError]: errors.coefficient,
          })}
          placeholder="Наприклад: 1.5"
          {...register("coefficient", {
            required: "Введіть коефіцієнт",
            min: { value: 1.01, message: "Мінімальний коефіцієнт 1.01" },
            max: { value: 1000, message: "Максимум 1000" },
          })}
        />
        {errors.coefficient && (
          <span className={styles.errorText}>{errors.coefficient.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="gameType" className={styles.label}>
          Тип гри
        </label>
        <select
          id="gameType"
          className={cn(styles.input, { [styles.inputError]: errors.gameType })}
          {...register("gameType", { required: "Оберіть тип гри" })}
        >
          <option value="" disabled>
            Оберіть тип гри
          </option>
          {GAME_TYPES.map((game) => (
            <option key={game.value} value={game.value}>
              {game.label}
            </option>
          ))}
        </select>
        {errors.gameType && (
          <span className={styles.errorText}>{errors.gameType.message}</span>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Зробити ставку
      </button>
    </form>
  );
};
