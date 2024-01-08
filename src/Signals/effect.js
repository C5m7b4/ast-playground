import Signals from "./index";

export class Effect {
  constructor(effectFn) {
    //console.log("creating effect for " + effectFn);
    this._effectFn = effectFn;
    this._isStale = true;
    this._execute();
  }

  _execute() {
    if (this._isStale) {
      Signals.currentAccessed = this;
      this._effectFn();
      Signals.currentAccessed = null;
    }
    this._isStale = false;
  }

  _update() {
    if (!this._isStale) {
      this._isStale = true;
      Signals.effectQueue.push(this);
    }
  }
}
