import { describe, it, expect, vi, beforeEach } from "vitest";
import { createStore } from "../src/store/store"; // Asegúrate de ajustar la ruta al archivo donde está implementada la función
import { persistMiddleware } from "../src/middleware/persist-middleware";

// Mock del persistMiddleware
const mockPersistFn = vi.fn();
vi.mock("../src/middleware/persist-middleware", () => ({
  persistMiddleware: vi.fn(() => mockPersistFn),
}));

describe("createStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Limpiar el localStorage mock
    localStorage.clear();
  });

  it("debe inicializar el estado correctamente", () => {
    const initialState = { user: null, todos: [] };
    const store = createStore(initialState);

    expect(store.getState()).toEqual(initialState);
  });

  it("debe actualizar el estado con setState", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);

    store.setState({ count: 1 });

    expect(store.getState()).toEqual({ count: 1 });
  });

  it("debe ejecutar listeners al cambiar el estado", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    const listener = vi.fn();

    store.subscribe(listener);
    store.setState({ count: 1 });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("debe manejar transacciones correctamente", () => {
    interface State {
      count: number;
      user: { name: string } | null;
    }

    const initialState: State = { count: 0, user: null };
    const store = createStore<State>(initialState);

    store.transaction(() => {
      store.setState({ count: 1 });
      store.setState({ user: { name: "Alice" } });
    });

    expect(store.getState()).toEqual({
      count: 1,
      user: { name: "Alice" },
    });
  });

  it("debe notificar a los listeners solo después de que finalice una transacción", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    const listener = vi.fn();

    store.subscribe(listener);
    store.transaction(() => {
      store.setState({ count: 1 });
      store.setState({ count: 2 });
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("debe integrar correctamente el middleware de persistencia", () => {
    const initialState = { count: 0 };
    const persistKey = "test-store";
    const store = createStore(initialState, { persistKey });

    store.setState({ count: 1 });

    expect(persistMiddleware).toHaveBeenCalledWith(persistKey, "localStorage");
    expect(mockPersistFn).toHaveBeenCalledWith({ count: 0 }, { count: 1 });
  });

  it("debe rehidratar el estado desde el almacenamiento persistente", () => {
    const persistKey = "test-store";
    const storedState = { count: 10 };

    // Simular estado almacenado
    localStorage.setItem(persistKey, JSON.stringify(storedState));

    const store = createStore({ count: 0 }, { persistKey });

    expect(store.getState()).toEqual(storedState);
  });

  it("debe manejar errores dentro de una transacción", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);

    expect(() => {
      store.transaction(() => {
        store.setState({ count: 1 });
        throw new Error("Error en la transacción");
      });
    }).toThrow();

    expect(store.getState()).toEqual({ count: 0 });
  });

  it("debe limpiar el estado de la transacción tras finalizar", () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);

    store.transaction(() => {
      store.setState({ count: 1 });
    });

    expect(() => {
      store.setState({ count: 2 });
    }).not.toThrow();
  });
});
