import { DOM_TYPES, extractChildren } from "../h";
import { setAttributes } from "../utils/attributes";

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

function createElementNode(vdom, parentEl, index, hostComponent, state, emit) {
  const { tag, props } = vdom;
  let { children } = vdom;

  children = extractChildren(vdom);

  const element = document.createElement(tag);
  addProps(element, props, vdom, hostComponent);
  vdom.el = element;

  children.forEach((child) =>
    mountDom(child, element, null, hostComponent, state, emit)
  );
  insert(element, parentEl, index);
}

function addProps(el, props = {}, vdom, hostComponent) {
  if (!props) return;
  const { ...attrs } = props;
  setAttributes(el, attrs, vdom, hostComponent);
}

export function isFunction(vdom) {
  return vdom && typeof vdom.tag === "function";
}

export function mountDom(
  vdom,
  parentEl,
  index,
  hostComponent = null,
  state,
  emit
) {
  if (isFunction(vdom)) {
    mountComponent(vdom, parentEl, index, state, emit);
    return;
  }
  switch (vdom.type) {
    case DOM_TYPES.TEXT:
      createTextNode(vdom, parentEl, index);
      break;
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentEl, index, hostComponent, state, emit);
      break;
    case DOM_TYPES.FRAGMENT:
      createFragmentNode(vdom, parentEl, index, hostComponent, state, emit);
      break;
    default:
      console.warn(`Can't mound DOM of type ${vdom.type}`);
      console.warn("vdom received: ", vdom);
  }
}

function mountComponent(vdom, parentEl, index, state, emit) {
  const { props } = vdom;
  const newVdom = vdom.tag({ state, emit, props });
  mountDom(newVdom, parentEl, index, state, emit);
}

function createFragmentNode(vdom, parentEl, index, hostComponent, state, emit) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child, i) =>
    mountDom(
      child,
      parentEl,
      index ? index + i : null,
      hostComponent,
      state,
      emit
    )
  );
}
