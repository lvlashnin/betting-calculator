import "./App.css";
import { useBetCalculator } from "./hooks/useBetCalculator";
import { BetForm } from "./components/BetForm/BetForm";
import { BetResult } from "./components/BetResult/BetResult";
import { BetHistory } from "./components/BetHistory/BetHistory";
import { BetChart } from "./components/BetChart/BetChart";

function App() {
  const {
    result,
    register,
    watch,
    errors,
    history,
    addToHistory,
    clearHistory,
    handleSubmit,
    handleCurrencyChange,
  } = useBetCalculator();

  return (
    <>
      <div className="app-container page">
        <header className="header">
          <h1>🎰 Betverse Calculator</h1>
        </header>

        <main className="main-content">
          <div className="calculator-section">
            <BetForm
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={addToHistory}
              onCurrencyChange={handleCurrencyChange}
            />

            <BetResult
              result={result}
              gameType={watch("gameType")}
              currency={watch("currency")}
            />
          </div>

          <div className="history-section">
            <BetChart history={history} />
            <BetHistory history={history} onClear={clearHistory} />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
