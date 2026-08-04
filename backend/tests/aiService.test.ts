import test from "node:test";
import assert from "node:assert/strict";
import { detectsCompletion } from "../src/services/aiService";

test("detects and removes consultation completion marker", () => {
  assert.deepEqual(detectsCompletion("I have just the pieces.\nCONSULTATION_COMPLETE"), {
    complete: true,
    text: "I have just the pieces.",
  });
});

test("leaves ordinary responses incomplete", () => {
  assert.deepEqual(detectsCompletion("What feeling should it leave?"), {
    complete: false,
    text: "What feeling should it leave?",
  });
});
