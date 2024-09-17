import Block from "@/core/Block";
import { PageTitle, Link } from "../../components";

type HomePageProps = {};
type HomePageChildren = {
  TitleOfPage: PageTitle;
  LoginPage: Link;
  SignupPage: Link;
  ChatPage: Link;
  UserSettingsPage: Link;
  NotFoundPage: Link;
  ServerErrorPage: Link;
};
class HomePage extends Block<HomePageProps, HomePageChildren> {
  constructor(props: HomePageProps) {
    super({
      ...props,
      TitleOfPage: new PageTitle({ title: "HomePage" }),
      LoginPage: new Link({
        url: "/",
        page: "login",
        text: "Логин",
      }),
      SignupPage: new Link({
        url: "/sign-up",
        text: "Регистрация",
        page: "signup",
      }),
      ChatPage: new Link({
        url: "/messenger",
        text: "Чат",
        page: "chat",
      }),
      UserSettingsPage: new Link({
        url: "/settings",
        text: "Настройки",
        page: "settings",
      }),
      NotFoundPage: new Link({
        url: "/404",
        text: "404",
        page: "404",
      }),
      ServerErrorPage: new Link({
        url: "/500",
        text: "500",
        page: "500",
      }),
    });
  }
  render(): string {
    return `
          <nav class="navigation">
            {{{ TitleOfPage }}}
            <ul>
              <li>{{{ChatPage}}}</li>
              <li>{{{LoginPage}}}</li>
              <li>{{{SignupPage}}}</li>
              <li>{{{UserSettingsPage}}}</li>
              <li>{{{NotFoundPage}}}</li>
              <li>{{{ServerErrorPage}}}</li>
            </ul>
          </nav>
      `;
  }
}

export default HomePage;
