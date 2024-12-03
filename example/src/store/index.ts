import { createStore } from "fluwtate"; // Reemplaza con la ruta de tu librería.

type CounterState = {
  count: number;
};

export const counterStore = createStore<CounterState>({
  count: 0, // Estado inicial
});
