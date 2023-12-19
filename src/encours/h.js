import { withoutNulls, cleanChildren } from "./utils/arrays";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
  LOGICALEXPRESSION: "logicalExpression",
};

export function createElement(tag, props, ...children) {
  const childNodesWithoutNulls = withoutNulls(cleanChildren(children));
  return {
    tag,
    props,
    children: mapTextNodes(childNodesWithoutNulls),
    type: DOM_TYPES.ELEMENT,
  };
}

export function createExpression(tag, props, ...children) {
  return {
    tag,
    props,
    children,
    type: DOM_TYPES.LOGICALEXPRESSION,
  };
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
