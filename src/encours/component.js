import { destroyDom, mountDom, patchDom } from "./dom";
import { DOM_TYPES, extractChildren } from "./h";
import { hasOwnProperty } from "./utils/objects";

export function defineComponent({ render, state, ...methods }) {
  class Component {
    #vdom = null;
    #hostEl = null;
    #isMounted = false;

    constructor(props = {}) {
      this.props = props;
      this.state = state ? state(props) : {};
    }
    render() {
      return render.call(this);
    }

    get elements() {
      if (this.#vdom == null) {
        return [];
      }

      if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
        return extractChildren(this.#vdom).map((child) => child.el);
      }

      return [this.#vdom.el];
    }

    get firstElement() {
      return this.elements[0];
    }

    get offset() {
      if (this.#vdom.type === DOM_TYPES.FRAGMENT) {
        return Array.from(this.#hostEl.children).indexOf(this.firstElement);
      }
      return 0;
    }

    updateState(state) {
      console.log(state);
      this.state = { ...this.state, ...state };
      this.patch();
    }

    mount(hostEl, index = null) {
      if (this.#isMounted) {
        throw new Error("Component is already mounted");
      }
      this.#vdom = this.render();
      mountDom(this.#vdom, hostEl, index, this);

      this.#hostEl = hostEl;
      this.#isMounted = true;
    }

    unmount() {
      if (!this.#isMounted) {
        throw new Error("Component is not mounted");
      }
      destroyDom(this.#vdom);
      this.#vdom = null;
      this.#hostEl = null;
      this.#isMounted = false;
    }

    patch() {
      if (!this.#isMounted) {
        throw new Error("Component is not mounted");
      }

      const vdom = this.render();
      this.#vdom = patchDom(this.#vdom, vdom, this.#hostEl, this);
    }
  }

  for (const methodName in methods) {
    if (hasOwnProperty(Component, methodName)) {
      throw new Error(`${methodName} already exists in this component`);
    }

    Component.prototype[methodName] = methods[methodName];
  }

  return Component;
}
