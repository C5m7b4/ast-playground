module.exports = function (babel) {
  const t = babel.types;
  return {
    name: "sweet-plugin",
    visitor: {
      JSXElement(path) {
        const args = [];
        const openingElement = path.node.openingElement;
        const tagName = openingElement.name.name;
        args.push(t.stringLiteral(tagName));

        const id = t.identifier("encours");
        const fn = t.identifier("createElement");
        const callee = t.memberExpression(id, fn);
        const callExpression = t.callExpression(callee, args);

        let attribs = openingElement.attributes;
        if (attribs.length) {
          let props = [];
          while (attribs.length) {
            const prop = attribs.shift();
            props.push(convertAttribute(prop));
          }
          attribs = t.objectExpression(props);
        } else {
          attribs = t.nullLiteral();
        }
        args.push(attribs);

        //insert children
        const childArray = [];
        const children = path.node.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.type === "JSXElement") {
            childArray.push(child);
          }
          if (child.type === "JSXText") {
            child.value = child.value.replace("\n", "").trim().toString();
            if (!child.value.includes("\n") && child.value.length > 0) {
              child.value = '"' + child.value + '"';
              childArray.push(child);
            }
          }
        }
        callExpression.arguments = callExpression.arguments.concat(childArray);

        path.replaceWith(callExpression, path.node);
      },
    },
  };

  function convertAttribute(node) {
    let value = convertValue(node.value || t.booleanLiteral(true));
    if (t.isStringLiteral(value)) {
      value.value = value.value.replace(/\n\s+/g, "");
    }
    if (t.isValidIdentifier(node.name.name)) {
      node.name.type = "Identifier";
    } else {
      node.name = t.stringLiteral(node.name.name);
    }
    return t.inherits(t.objectProperty(node.name, value), node);
  }

  function convertValue(node) {
    if (t.isJSXExpressionContainer(node)) {
      return node.expression;
    } else {
      return node;
    }
  }
};
