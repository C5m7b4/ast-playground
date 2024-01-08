import { executeEffects } from "./helpers";
import Signals from "./index";

export class Signal {
  constructor(initialValue) {
    console.log("creating signal with value: " + initialValue);
    this._value = initialValue;
    this._dependents = [];
  }

  get value() {
    console.log("getting value, " + JSON.stringify(this._value));
    if (Signals.currentAccessed) {
      this._addDependent(Signals.currentAccessed);
    }
    return this._value;
  }

  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._notifyDependents();
      Signals.currentAccessed = newValue;
      executeEffects();
    }
  }

  _addDependent(dependent) {
    if (typeof dependent !== "object") return;
    if (!this._dependents.includes(dependent)) {
      this._dependents.push(dependent);
    }
  }

  _removeDependent(dependent) {
    this._dependents = this._dependents.filter((dep) => dep !== dependent);
  }

  _notifyDependents() {
    for (const dependent of this._dependents) {
      dependent._update();
    }
  }
}
