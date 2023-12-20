import { DOM_TYPES, extractChildren } from "../h";
import { setAttributes } from "../utils/attributes";
import { destroyDom } from "./destroy-dom";
import { Dispatcher } from "../dispatcher";

export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  for (const actionName in reducers) {
    const reducer = reducers[actionName];

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }

  function renderApp() {
    if (vdom) {
      destroyDom(vdom);
    }

    vdom = view(state, emit);
    mountDom(vdom, parentEl, null, state, emit);
    // const newVdom = view(state, emit);
    // destroyDom(vdom);
    // mountDom(newVdom, parentEl);
  }

  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      vdom = view(state, emit);
      console.log(vdom);
      render(vdom, parentEl, state, emit);
    },
    unmount() {
      destroyDom(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },
  };
}

export function render(vdom, parentEl, state, emit) {
  mountDom(vdom, parentEl, null, state, emit);
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

function createElementNode(vdom, parentEl, index, state, emit) {
  const { tag, props } = vdom;
  let { children } = vdom;

  children = extractChildren(vdom);

  const element = document.createElement(tag);
  addProps(element, props, vdom);
  vdom.el = element;

  children.forEach((child) => mountDom(child, element, null, state, emit));
  insert(element, parentEl, index);
}

function addProps(el, props = {}, vdom) {
  if (!props) return;
  const { ...attrs } = props;
  setAttributes(el, attrs, vdom);
}

function isFunction(vdom) {
  return vdom && typeof vdom.tag === "function";
}

export function mountDom(vdom, parentEl, index, state, emit) {
  if (isFunction(vdom)) {
    mountComponent(vdom, parentEl, index, state, emit);
    return;
  }
  switch (vdom.type) {
    case DOM_TYPES.TEXT:
      createTextNode(vdom, parentEl, index);
      break;
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentEl, index, state, emit);
      break;
    case DOM_TYPES.LOGICALEXPRESSION:
      doesLogicalExpressionNodeNeedRendering(vdom, parentEl, index);
      break;
    case DOM_TYPES.CONDITIONALEXPRESSION:
      doesConditionalExpressionNodeNeedRendering(vdom, parentEl, index);
      break;
    case DOM_TYPES.CALLEXPRESSION:
      doesCallEpxpressionNodeNeedRendering(vdom, parentEl, index);
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

function doesCallEpxpressionNodeNeedRendering(vdom, parentEl, index) {
  debugger;
  const { props } = vdom;
  const { children } = vdom;
  const objectToOperatoOn = props.objectToOperatoOn;
  const fn = props.fn;
  if (fn === "map") {
    objectToOperatoOn.map((item, i) => {
      return mountDom(children[0], parentEl, index);
    });
  }
}

function doesConditionalExpressionNodeNeedRendering(vdom, parentEl, index) {
  const { props } = vdom;
  const left = props.leftValue;
  const right = props.rightValue;
  const operator = props.operator;
  const consequent = props.consequent;
  const alternate = props.alternate;

  switch (operator) {
    case "===":
      return left === right
        ? mountDom(consequent, parentEl, index)
        : mountDom(alternate, parentEl, index);
    default:
      return null;
  }
}

function doesLogicalExpressionNodeNeedRendering(vdom, parentEl, index) {
  const { props } = vdom;
  const left = props.leftValue;
  const right = props.rightValue;
  const operator = props.operator;
  switch (operator) {
    case "===":
      return left === right
        ? mountDom(vdom.children[0], parentEl, index)
        : null;
    default:
      return null;
  }
}
