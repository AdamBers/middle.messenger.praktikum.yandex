import * as Pages from "./pages";
import { Store } from "./core/Store";
import Router from "./core/Router";
import AuthApi from "./api/auth";
import { LoadChats } from "./services/LoadChats";
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
let CurrentUserId: number | null = null;
let userName: string | null = null;
if ("data" in Me) {
  CurrentUserId = Me?.data?.id;
  userName = Me?.data?.first_name;
}

const store = new Store({
  isLoading: false,
  loginError: null,
  chats: [],
  userId: CurrentUserId || null,
  userName: userName,
  selectedChat: null,
  wsToken: null,
  user: {},
});
window.store = store;

const router = new Router("#app");
window.router = router;

// await LoadChats();

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
