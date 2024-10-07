// import Handlebars from "handlebars";
import * as Pages from "./pages";
import { Store } from "./core/Store";
import Router from "./core/Router";
import { LoadChats } from "./services/LoadChats";
import AuthApi from "./api/auth";
import "./style.scss";

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  interface Window {
    router: Router;
    store: Store<any>;
  }
}

const authAPI = new AuthApi();

const Me = await authAPI.me();
const CurrentUserId = Me?.data?.id;
const userName = Me?.data?.first_name;
// console.log(Me);

const store = new Store({
  isLoading: false,
  loginError: null,
  chats: [],
  userId: CurrentUserId || null,
  userName: userName,
  selectedChat: null,
  wsToken: null,
});
window.store = store;

const router = new Router("#app");
window.router = router;

router
  .use("/", Pages.LoginPage)
  .use("/sign-up", Pages.SignupPage)
  .use("/messenger", Pages.ChatPage)
  .use("/settings", Pages.UserSettingsPage)
  .use("/404", Pages.NotFoundPage)
  .use("/500", Pages.ServerErrorPage)
  .start();

if (CurrentUserId === null || !CurrentUserId) {
  window.router.go("/");
  console.log("Not authorized");
}
LoadChats();
