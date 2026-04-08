import "./App.css";
import { useBetCalculator } from "./hooks/useBetCalculator";
import { BetForm } from "./components/BetForm/BetForm";

function App() {
  const { register, handleSubmit, errors, addToHistory, handleCurrencyChange } =
    useBetCalculator();

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
      </div>
    </>
  );
}

export default App;
