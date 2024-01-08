import { Signal } from "./signal";
import { Computed } from "./computed";
import { Effect } from "./effect";
import Signals from "./index";

export function createSignal(initialValue) {
  return new Signal(initialValue);
}
export function createComputed(computeFn, dependencies) {
  return new Computed(computeFn, dependencies);
}
export function createEffect(effectFn) {
  return new Effect(effectFn);
}
export function executeEffects() {
  while (Signals.effectQueue.length > 0) {
    const effect = Signals.effectQueue.shift();
    effect._execute();
  }
}
