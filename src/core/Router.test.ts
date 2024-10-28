import Router from "./Router";
import Route from "./Route";
import { expect } from "chai";
import "jsdom-global/register";

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router("#app");
  });

  it("should add routes", () => {
    const route = new Route(
      "/test",
      class TestBlock {
        getContent() {
          return document.createElement("div");
        }
        show() {}
        hide() {}
      },
      { rootQuery: "#app" }
    );

    router.use("/test", route);
    expect(router["routes"].length).to.equal(1);
  });
});
