import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { createAsyncPersistence, loadAsyncPersistedState } from "../../src/middleware/async-persistence";

describe("Async Persistence Middleware", () => {
  const mockStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
  };

  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockStorage.setItem.mockClear();
    mockStorage.getItem.mockClear();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should persist state correctly", async () => {
    // Simula que setItem resuelve correctamente
    mockStorage.setItem.mockResolvedValueOnce(undefined);

    const middleware = createAsyncPersistence({
      key: "testKey",
      storage: mockStorage,
      serializer: JSON.stringify,
    });

    const nextState = { value: 42 };

    const result = middleware({}, nextState);

    // Espera a que se complete la promesa
    await result;

    // Verifica que setItem fue llamado correctamente
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify(nextState)
    );

    // Verifica que no se haya llamado a console.error en caso de éxito
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should handle errors during asynchronous persistence", async () => {
    // Configura el mock para que rechace la promesa (simula un error)
    mockStorage.setItem.mockRejectedValueOnce(new Error("Simulated storage error"));

    const middleware = createAsyncPersistence({
      key: "testKey",
      storage: mockStorage,
      serializer: JSON.stringify,
    });

    const nextState = { value: 42 };

    const result = middleware({}, nextState);

    // Espera a que se complete la promesa
    await result;

    // Verifica que setItem fue llamado correctamente
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify(nextState)
    );

    // Verifica que el error fue registrado
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error persisting state❌:"),
      expect.any(Error)
    );
  });

  it("should load the state correctly", async () => {
    // Simula que el estado está disponible en el almacenamiento
    const storedState = JSON.stringify({ value: 42 });
    mockStorage.getItem.mockResolvedValueOnce(storedState);

    const result = await loadAsyncPersistedState({
      key: "testKey",
      storage: mockStorage,
      deserializer: JSON.parse,
    });

    // Verifica que el estado fue cargado correctamente
    expect(result).toEqual({ value: 42 });

    // Verifica que no se haya llamado a console.error
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should handle errors during state loading", async () => {
    // Simula que getItem lanza un error
    mockStorage.getItem.mockRejectedValueOnce(new Error("Simulated storage error"));

    const result = await loadAsyncPersistedState({
      key: "testKey",
      storage: mockStorage,
    });

    // Verifica que se haya registrado un error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error loading persisted state❌:"),
      expect.any(Error)
    );

    // Verifica que el resultado sea undefined
    expect(result).toBeUndefined();
  });
});
