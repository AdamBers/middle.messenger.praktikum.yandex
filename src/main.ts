import Handlebars from "handlebars";
import * as Pages from "./pages";
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

type PageKeys = keyof typeof pages;

function navigate(page: PageKeys) {
  const [source, context] = pages[page];
  const container = document.getElementById("app");

  if (!container) {
    console.error("App container not found");
    return;
  }

  if (source instanceof Object) {
    const pageInstance = new source(context);
    container.innerHTML = "";

    const content = pageInstance.getContent();
    if (content) {
      container.append(content);
    } else {
      console.warn("Content is null or undefined");
    }
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("/"));

document.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement | null;

  if (target) {
    const page = target.getAttribute("page");

    if (page && page in pages) {
      e.preventDefault();
      navigate(page as PageKeys);
      e.stopImmediatePropagation();
    } else {
      console.warn(`Unknown page: ${page}`);
    }
  }
});
