// import Handlebars from "handlebars";
import * as Pages from "./pages";
import Router from "./core/Router";
import "./style.scss";

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  interface Window {
    router: Router;
  }
}

const router = new Router("#app");
window.router = router;

router
  // .use("/", Pages.HomePage)
  .use("/", Pages.LoginPage)
  .use("/sign-up", Pages.SignupPage)
  .use("/messenger", Pages.ChatPage)
  .use("/settings", Pages.UserSettingsPage)
  .use("/404", Pages.NotFoundPage)
  .use("/500", Pages.ServerErrorPage)
  .start();

// window.store = new Store({
//   isLoading: false,
//   loginError: null,
//   cats: [],
//   user: null,
//   selectedCard: null,
// });
