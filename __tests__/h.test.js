import { createElement } from "../src/encours/h";
import encours from "../src/encours";

describe("h", () => {
  test("should return an object", () => {
    const div = createElement("div", { className: "main" }, []);
    expect(div).toEqual({
      tag: "div",
      props: {
        className: "main",
      },
      children: [],
      type: "element",
    });
  });
  test("should handle children", () => {
    const div = createElement("h1", {}, "Hello");
    expect(div).toEqual({
      tag: "h1",
      props: {},
      children: [{ type: "text", value: "Hello" }],
      type: "element",
    });
  });
  test("should handle null props", () => {
    const div = createElement("div", null, []);
    expect(div).toEqual({
      tag: "div",
      props: {},
      children: [],
      type: "element",
    });
  });

  test("should handle function as input", () => {
    const Head = () => {
      return (
        <div>
          <h1>Hello</h1>
        </div>
      );
    };
    const div = createElement(Head, null, []);
    expect(div).toEqual({
      tag: "div",
      props: {},
      children: [
        {
          tag: "h1",
          props: {},
          children: [{ type: "text", value: "Hello" }],
          type: "element",
        },
      ],
      type: "element",
    });
  });
});
