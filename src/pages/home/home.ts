import Block from "../../core/Block";
import { PageTitle, Link } from "../../components";

interface IHomePage {

}
class HomePage extends Block<IHomePage> {
  init() {
    const TitleOfPage = new PageTitle({ title: "HomePage" });

    const LoginPage = new Link({
      url: "/login",
      page: "login",
      text: "Логин",
    });
    const SignupPage = new Link({
      url: "/signup",
      text: "Регистрация",
      page: "signup",
    });

    const ChatPage = new Link({
      url: "/chat",
      text: "Чат",
      page: "chat",
    });

    const UserSettingsPage = new Link({
      url: "/settings",
      text: "Настройки",
      page: "settings",
    });

    const NotFoundPage = new Link({
      url: "/404",
      text: "404",
      page: "404",
    });

    const ServerErrorPage = new Link({
      url: "/500",
      text: "500",
      page: "500",
    });
    this.children = {
      TitleOfPage,
      LoginPage,
      SignupPage,
      ChatPage,
      UserSettingsPage,
      NotFoundPage,
      ServerErrorPage,
    };
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
