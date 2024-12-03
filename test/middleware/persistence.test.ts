import { describe, it, expect, vi, beforeEach } from "vitest";
import { createPersistenceMiddleware, loadPersistedState } from "../../src/middleware/persistence";

describe("createPersistenceMiddleware", () => {
  const mockStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should persist state in provided storage", () => {
    const middleware = createPersistenceMiddleware({
      key: "testKey",
      storage: mockStorage as unknown as Storage,
      serializer: JSON.stringify,
    });

    const nextState = { value: 42 };
    const result = middleware({}, nextState);

    expect(result).toBe(true);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify(nextState)
    );
  });

  it("should handle errors when persisting state", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
    mockStorage.setItem.mockImplementation(() => {
      throw new Error("Simulated storage error");
    });

    const middleware = createPersistenceMiddleware({
      key: "testKey",
      storage: mockStorage as unknown as Storage,
      serializer: JSON.stringify,
    });

    const nextState = { value: 42 };
    const result = middleware({}, nextState);

    expect(result).toBe(true);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error persisting state❌:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});

describe("loadPersistedState", () => {
  const mockStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load the persisted state correctly", () => {
    const storedData = JSON.stringify({ value: 42 });
    mockStorage.getItem.mockReturnValue(storedData);

    const state = loadPersistedState({
      key: "testKey",
      storage: mockStorage as unknown as Storage,
      deserializer: JSON.parse,
    });

    expect(state).toEqual({ value: 42 });
    expect(mockStorage.getItem).toHaveBeenCalledWith("testKey");
  });

  it("should return undefined if there is no persisted data", () => {
    mockStorage.getItem.mockReturnValue(null);

    const state = loadPersistedState({
      key: "testKey",
      storage: mockStorage as unknown as Storage,
      deserializer: JSON.parse,
    });

    expect(state).toBeUndefined();
    expect(mockStorage.getItem).toHaveBeenCalledWith("testKey");
  });

  it("should handle errors when loading persisted state", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
    mockStorage.getItem.mockImplementation(() => {
      throw new Error("Simulated storage error");
    });

    const state = loadPersistedState({
      key: "testKey",
      storage: mockStorage as unknown as Storage,
      deserializer: JSON.parse,
    });

    expect(state).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error loading persisted state❌:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
