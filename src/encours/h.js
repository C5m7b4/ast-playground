import { withoutNulls, cleanChildren } from "./utils/arrays";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
  COMPONENT: "component",
};

export function createElement(tag, props = {}, ...children) {
  if (tag && typeof tag === "function") {
    return createComponent(tag, props);
  }
  const type =
    typeof tag === "string" ? DOM_TYPES.ELEMENT : DOM_TYPES.COMPONENT;
  const childNodesWithoutNulls = withoutNulls(cleanChildren(children));
  if (!props) props = {};
  return {
    tag,
    props,
    children: mapTextNodes(childNodesWithoutNulls),
    type,
  };
}

function createComponent(vdom, props) {
  const newVdom = vdom({ props });
  return newVdom;
}

function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" || typeof child === "number"
      ? hString(child)
      : child
  );
}

export function hString(str) {
  return { type: DOM_TYPES.TEXT, value: str };
}

export function extractChildren(vdom) {
  if (vdom.children == null) {
    return [];
  }
  const children = [];
  for (const child of vdom.children) {
    if (child.type === DOM_TYPES.FRAGMENT) {
      children.push(...extractChildren(child, children));
    } else {
      children.push(child);
    }
  }
  return children;
}
