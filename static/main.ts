import Handlebars from "handlebars";
import * as Components from "../src/components";
import * as Pages from "../src/pages";
import "./style.scss";

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

const pages = {
  login: [Pages.LoginPage],
  signup: [Pages.SignupPage],
  home: [Pages.HomePage],
  chatlist: [Pages.HomePage],
  chatitem: [Pages.HomePage],
  usersettings: [Pages.HomePage],
  404: [Pages.NotFoundPage],
  500: [Pages.ServerErrorPage],
};

// Object.entries(Components).forEach(([name, component]) => {
//   Handlebars.registerPartial(name, component);
// });

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;

  if (source instanceof Object) {
    const page = new source(context);
    container.innerHTML = "";
    container.append(page.getContent());
    // page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("home"));

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  e.preventDefault();
  if (page) {
    navigate(page);
    e.stopImmediatePropagation();
  }
});
