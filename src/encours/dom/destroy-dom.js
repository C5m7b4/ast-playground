import { DOM_TYPES } from "../h";
import { removeEventListeners } from "../utils/events";

export function destroyDom(vdom) {
  const { type } = vdom;

  switch (type) {
    case DOM_TYPES.TEXT:
      removeTextNode(vdom);
      break;
    case DOM_TYPES.ELEMENT:
      removeElementNode(vdom);
      break;
    default:
      throw new Error(`Dom type ${type} is not supported`);
  }
}

function removeTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}

function removeElementNode(vdom) {
  const { el, children, listeners } = vdom;

  if (el) {
    el.remove();
  }
  children.forEach(destroyDom);

  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}
