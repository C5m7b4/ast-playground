import Signals from "./index";

export class Computed {
  constructor(computeFn) {
    //console.log("creating computed for" + computeFn);
    this._computeFn = computeFn;
    this._value = undefined;
    this._isStale = true;
    this._dependents = [];
  }

  get value() {
    if (this._isStale) {
      const previousContext = Signals.currentAccessed;
      Signals.currentAccessed = this;
      this._recomputeValue();
      Signals.currentAccessed = previousContext;
    }
    if (Signals.currentAccessed) {
      this._addDependent(Signals.currentAccessed);
    }
    return this._value;
  }

  _recomputeValue() {
    this._value = this._computeFn();
    this._isStale = false;
  }

  _addDependent(dependent) {
    if (!this._dependents.includes(dependent)) {
      this._dependents.push(dependent);
    }
  }

  _update() {
    if (!this._isStale) {
      this._isStale = true;
      for (const dependent of this._dependents) {
        dependent._update();
      }
    }
  }
}
