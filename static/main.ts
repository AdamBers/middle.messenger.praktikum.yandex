import Handlebars from "handlebars";
import * as Components from "../src/components";
import * as Pages from "../src/pages";
import "./style.scss";

const app = document.getElementById("app");

if (app) {
  const pages = {
    "/": [Pages.HomePage],
    login: [Pages.LoginPage],
    signup: [Pages.SignupPage],
    chatList: [Pages.ChatListPage],
    chatItem: [Pages.ChatItemPage],
    userSettings: [Pages.UserSettingsPage],
    404: [Pages.NotFoundPage],
    500: [Pages.ServerErrorPage],
  };

  Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
  });

  function navigate(page: string) {
    const [source, args] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    if (app) {
      app.innerHTML = handlebarsFunct(args);
    }
  }

  document.addEventListener("DOMContentLoaded", () => navigate("/"));

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const page = target?.getAttribute("page");
    if (page) {
      e.preventDefault();
      e.stopImmediatePropagation();
      navigate(page);
    }
  });
}
