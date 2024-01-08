import { createComputed, createEffect, createSignal } from "./helpers";

const currentAccessed = null;
const effectQueue = [];

const Signals = {
  createSignal,
  createComputed,
  createEffect,
  effectQueue,
  currentAccessed,
};
export default Signals;
