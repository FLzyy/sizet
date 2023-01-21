import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { remote, local } from "../src/index.js";

const COMPARISON_DIFFERENCE = 3000;

const remotePackage = "react@18.2.0";
const localPackage = "tests/local_case";

const inBetween = (value: number, min: number, max: number): boolean => {
  return value > min && value < max;
};

describe("Remote Packages", () => {
  const returned = remote(remotePackage);

  it("should return a valid object", () => {
    assert(returned.tarGzipped);
    assert(returned.unpacked);
  });

  it("should return reasonable values", () => {
    assert(
      inBetween(
        returned.tarGzipped,
        88808 - COMPARISON_DIFFERENCE,
        88808 + COMPARISON_DIFFERENCE
      ) &&
        inBetween(
          returned.unpacked,
          338422 - COMPARISON_DIFFERENCE,
          338422 + COMPARISON_DIFFERENCE
        )
    );
  });
});

describe("Local Packages", () => {
  const returned = local(localPackage);

  it("should return a valid object", () => {
    assert(returned.tarGzipped);
    assert(returned.unpacked);
  });

  it("should return reasonable values", () => {
    assert(
      inBetween(
        returned.tarGzipped,
        1575 - COMPARISON_DIFFERENCE,
        1575 + COMPARISON_DIFFERENCE
      ) &&
        inBetween(
          returned.unpacked,
          3210 - COMPARISON_DIFFERENCE,
          3210 + COMPARISON_DIFFERENCE
        )
    );
  });
});
