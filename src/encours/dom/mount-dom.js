import { DOM_TYPES } from "../h";
import { setAttributes } from "../utils/attributes";
import { destroyDom } from "./destroy-dom";

export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;

  function emit(eventName, payload) {}

  function renderApp() {
    const newDvom = view(state, emit);
    mountDom(newVdom, parentEl);
  }

  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      vdom = view(state, emit);
      console.log(vdom);
      render(vdom, parentEl);
    },
    unmount() {
      destroyDom(vdom);
      vdom = null;
    },
  };
}

export function render(vdom, parentEl) {
  mountDom(vdom, parentEl);
}

function insert(el, parentEl, index) {
  if (index == null) {
    parentEl.append(el);
    return;
  }
  if (index < 0) {
    throw new Error(`Index must be a positive number, got: ${index}`);
  }
  const children = parentEl.childNodes;
  if (index >= children.length) {
    parentEl.append(el);
  } else {
    parentEl.insertBefore(el, children[index]);
  }
}

function createTextNode(vdom, parentEl, index) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  vdom.el = textNode;

  insert(textNode, parentEl, index);
}

function createElementNode(vdom, parentEl, index) {
  const { tag, props } = vdom;
  let { children } = vdom;

  const element = document.createElement(tag);
  addProps(element, props, vdom);
  vdom.el = element;

  children.forEach((child) => mountDom(child, element));
  insert(element, parentEl, index);
}

function addProps(el, props = {}, vdom) {
  if (!props) return;
  const { ...attrs } = props;
  setAttributes(el, attrs, vdom);
}

export function mountDom(vdom, parentEl, index) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT:
      createTextNode(vdom, parentEl, index);
      break;
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentEl, index);
      break;
    default:
      throw new Error(`Can't mound DOM of type ${vdom.type}`);
  }
}
