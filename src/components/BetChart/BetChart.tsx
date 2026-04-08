import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BetHistoryItem } from "../../types/betTypes";

import styles from "./BetChart.module.css";

interface BetChartProps {
  history: BetHistoryItem[];
}

export const BetChart: React.FC<BetChartProps> = ({ history }) => {
  if (history.length < 2) return null;

  const chartData = [...history].reverse().map((bet, index) => ({
    name: `Ставка ${index + 1}`,
    profit: bet.profit,
    currency: bet.currency,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <div className={styles.tooltipLabel}>{label}</div>
          <div className={styles.tooltipValue}>
            Прибуток: {data.profit.toFixed(2)} {data.currency || "UAH"}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>Динаміка прибутку</h3>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.4}
                />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="profit"
              stroke="var(--primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorProfit)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
