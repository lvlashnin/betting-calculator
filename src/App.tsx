import "./App.css";
import { useBetCalculator } from "./hooks/useBetCalculator";
import { BetForm } from "./components/BetForm/BetForm";
import { BetResult } from "./components/BetResult/BetResult";

function App() {
  const {
    result,
    watch,
    register,
    handleSubmit,
    errors,
    addToHistory,
    handleCurrencyChange,
  } = useBetCalculator();

  return (
    <>
      <div className="app">
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
    </>
  );
}

export default App;
