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
          if (child.type === "JSXExpressionContainer") {
            if (child.expression.type === "LogicalExpression") {
              const result = evaluateLogicalExpression(child, path);
              if (result) {
                childArray.push(result);
              }
            } else if (child.expression.type === "Identifier") {
              const c = child.expression;
              const text = t.jsxText(c.name);
              childArray.push(text);
            } else if (child.expression.type === "ConditionalExpression") {
              const result = evaluateConditionalExpression(child, path);
              if (result) {
                childArray.push(result);
              }
            } else if (child.expression.type === "CallExpression") {
              const result = evaluateCallExpression(child, path);
              if (result) {
                childArray.push(result);
              }
            }
          }
        }
        callExpression.arguments = callExpression.arguments.concat(childArray);

        path.replaceWith(callExpression, path.node);
      },
    },
  };

  function evaluateCallExpression(child, path) {
    const args = [];
    const tagName = child.expression.type;
    args.push(t.stringLiteral(tagName));
    let attribs = t.nullLiteral();
    const props = [];

    const objectType = child.expression.callee.object.type; // memberExpression,identifier
    const typeProp = t.inherits(
      t.objectProperty(
        t.stringLiteral("objectType"),
        t.stringLiteral(objectType)
      ),
      child
    );
    props.push(typeProp);

    if (objectType == "Identifier") {
      const objectToMap = child.expression.callee.object.name;
      const prop1 = t.inherits(
        t.objectProperty(
          t.stringLiteral("objectToOperateOn"),
          t.identifier(objectToMap)
        ),
        child
      );
      props.push(prop1);
    } else if (objectType === "MemberExpression") {
      const objectKey = child.expression.callee.object.object.name;
      const keyProp = t.inherits(
        t.objectProperty(t.stringLiteral("key"), t.identifier(objectKey)),
        child
      );
      props.push(keyProp);
      const objectProperty = child.expression.callee.object.property.name;
      const propertyProp = t.inherits(
        t.objectProperty(
          t.stringLiteral("value"),
          t.identifier(objectProperty)
        ),
        child
      );
      props.push(propertyProp);
    }

    const operation = child.expression.callee.property.name;

    const prop2 = t.inherits(
      t.objectProperty(t.stringLiteral("fn"), t.stringLiteral(operation)),
      child
    );
    props.push(prop2);

    attribs = t.objectExpression(props);
    args.push(attribs);

    const childArray = [];
    for (let i = 0; i < child.expression.arguments.length; i++) {
      const arg = child.expression.arguments[i];
      childArray.push(arg.body);
    }
    //args.push(childNodes)

    const id = t.identifier("encours");
    const fn = t.identifier("createExpression");
    const callee = t.memberExpression(id, fn);
    const callExpression = t.callExpression(callee, args);
    callExpression.arguments = callExpression.arguments.concat(childArray);
    return callExpression;
  }

  function evaluateConditionalExpression(child, path) {
    const args = [];
    const tagName = child.expression.type;
    args.push(t.stringLiteral(tagName));
    let attribs = t.nullLiteral();

    const test = child.expression.test;
    const left = test.left.name;
    const right = test.right.name;
    const operator = test.operator;
    const props = [];
    const prop1 = t.inherits(
      t.objectProperty(t.identifier("leftValue"), t.identifier(left)),
      child
    );
    props.push(prop1);
    const prop2 = t.inherits(
      t.objectProperty(t.identifier("rightValue"), t.identifier(right)),
      child
    );
    props.push(prop2);
    const prop3 = t.inherits(
      t.objectProperty(t.identifier("operator"), t.stringLiteral(operator)),
      child
    );
    props.push(prop3);
    const prop4 = t.inherits(
      t.objectProperty(t.identifier("consequent"), child.expression.consequent)
    );
    props.push(prop4);
    const prop5 = t.inherits(
      t.objectProperty(t.identifier("alternate"), child.expression.alternate)
    );
    props.push(prop5);

    attribs = t.objectExpression(props);
    args.push(attribs);

    const childNodes = t.nullLiteral();
    args.push(childNodes);

    const id = t.identifier("encours");
    const fn = t.identifier("createExpression");
    const callee = t.memberExpression(id, fn);
    const callExpression = t.callExpression(callee, args);
    return callExpression;
  }

  function evaluateLogicalExpression(child, path) {
    const args = [];
    const tagName = child.expression.type;
    args.push(t.stringLiteral(tagName));

    let leftAttribs = t.nullLiteral();
    const leftArguments = child.expression.left;
    //const exp = t.newExpression()
    //const exp1c = t.jsxExpressionContainer()
    const leftValue = leftArguments.left.name;
    const rightValue = leftArguments.right.name;
    const operator = leftArguments.operator;
    const props = [];

    const prop1 = t.inherits(
      t.objectProperty(t.identifier("leftValue"), t.identifier(leftValue)),
      child
    );
    props.push(prop1);
    const prop2 = t.inherits(
      t.objectProperty(t.identifier("rightValue"), t.identifier(rightValue)),
      child
    );
    props.push(prop2);
    const prop3 = t.inherits(
      t.objectProperty(t.identifier("operator"), t.stringLiteral(operator)),
      child
    );
    props.push(prop3);

    leftAttribs = t.objectExpression(props);
    args.push(leftAttribs);

    args.push(child.expression.right);
    const id = t.identifier("encours");
    const fn = t.identifier("createExpression");
    const callee = t.memberExpression(id, fn);
    const callExpression = t.callExpression(callee, args);
    return callExpression;
  }

  function convertAttribute(node) {
    //console.log('node***', node)
    let value = convertValue(node.value || t.booleanLiteral(true));
    //console.log('value', value)
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

  function evaluateBoolean(node) {
    console.log(node);
    const leftValue = node.left.left.value;
    const rightValue = node.left.right.value;
    const operator = node.left.operator;
    switch (operator) {
      case "===":
        return leftValue === rightValue ? node.right : null;
        break;
      case "--":
        return leftValue == rightValue ? node.right : null;
        break;
      case ">=":
        return leftValue >= rightValue ? node.right : null;
        break;
      case "<=":
        return leftValue <= rightValue ? node.right : null;
        break;
    }
  }
};
