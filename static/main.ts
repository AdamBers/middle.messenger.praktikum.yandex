import Handlebars from "handlebars";
import * as Pages from "../src/pages";
import "./style.scss";

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

const pages = {
  login: [Pages.LoginPage],
  signup: [Pages.SignupPage],
  "/": [Pages.HomePage],
  chat: [Pages.ChatPage],
  settings: [Pages.UserSettingsPage],
  404: [Pages.NotFoundPage],
  500: [Pages.ServerErrorPage],
};

function navigate(page: string) {
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;

  if (source instanceof Object) {
    const page = new source(context);
    container.innerHTML = "";
    container.append(page.getContent());
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("/"));

document.addEventListener("click", (e: Event) => {
  // Проверяем, что e.target не null и является элементом
  const target = e.target as HTMLElement | null;

  if (target) {
    const page = target.getAttribute("page");
    if (page) {
      e.preventDefault();
      navigate(page);
      e.stopImmediatePropagation();
    }
  }
});
