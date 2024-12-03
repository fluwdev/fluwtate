import { describe, it, expect } from "vitest";
import { shallow } from "../src";

describe("shallow", () => {
  it("should return true for equal primitive values", () => {
    expect(shallow(1, 1)).toBe(true);
    expect(shallow("test", "test")).toBe(true);
    expect(shallow(true, true)).toBe(true);
  });

  it("should return false for different primitive values", () => {
    expect(shallow(1, 2)).toBe(false);
    expect(shallow("test", "different")).toBe(false);
    expect(shallow(true, false)).toBe(false);
  });

  it("should return true for identical objects (same reference)", () => {
    const obj = { a: 1 };
    expect(shallow(obj, obj)).toBe(true);
  });

  it("should return true for different objects but with the same content", () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 2 };
    expect(shallow(objA, objB)).toBe(true);
  });

  it("should return false for objects with different properties", () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1 };
    expect(shallow(objA, objB)).toBe(false);
  });

  it("should handle deeply nested structures", () => {
    const objA = { a: { b: { c: 3 } } };
    const objB = { a: { b: { c: 3 } } };
    expect(shallow(objA, objB)).toBe(true);
  });

  it("should handle circular references", () => {
    const objA: any = { a: 1 };
    objA.self = objA;

    const objB: any = { a: 1 };
    objB.self = objB;

    expect(shallow(objA, objB)).toBe(true);
  });

  it("should return false for deeply different structures", () => {
    const objA = { a: { b: { c: 3 } } };
    const objB = { a: { b: { c: 4 } } };
    expect(shallow(objA, objB)).toBe(false);
  });

  it("should return true for identical arrays", () => {
    const arrA = [1, 2, 3];
    const arrB = [1, 2, 3];
    expect(shallow(arrA, arrB)).toBe(true);
  });

  it("should return false for different arrays", () => {
    const arrA = [1, 2, 3];
    const arrB = [1, 2, 4];
    expect(shallow(arrA, arrB)).toBe(false);
  });

  it("should handle arrays with circular references", () => {
    const arrA: any[] = [1, 2];
    arrA.push(arrA);

    const arrB: any[] = [1, 2];
    arrB.push(arrB);

    expect(shallow(arrA, arrB)).toBe(true);
  });

  it("should return false for unsupported objects and arrays", () => {
    expect(shallow({ a: 1 }, [1])).toBe(false);
    expect(shallow([1], { a: 1 })).toBe(false);
  });
});
