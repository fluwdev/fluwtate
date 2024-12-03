import { CounterDisplay } from "./components/counter-display";
import { CounterControls } from "./components/counter-control";

function App() {
  return(
    <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-4xl text-white font-bold uppercase mb-6">Counter Example</h1>
      <CounterDisplay />
      <CounterControls />
    </div>
  )
}

export default App
