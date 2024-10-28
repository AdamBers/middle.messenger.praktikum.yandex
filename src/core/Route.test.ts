import Route from "./Route";
import "jsdom-global/register";
import { expect } from "chai";

class TestBlock {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.textContent = "Test Block";
  }

  getContent() {
    return this.element;
  }

  show() {}

  hide() {}
}

describe("Route", () => {
  let route: Route;
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement("div");
    root.id = "app";
    document.body.appendChild(root);

    route = new Route("/test", TestBlock, { rootQuery: "#app" });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should match the pathname", () => {
    const result = route.match("/test");
    expect(result).to.be.true;
  });

  it("should leave the block", () => {
    route.render();

    expect(root.children.length).to.equal(1);

    route.leave();

    expect(root.children.length).to.equal(0);
    expect(route["_block"]).to.be.null;
  });
});
