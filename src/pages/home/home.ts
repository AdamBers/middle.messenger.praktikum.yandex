import Block from "../../core/Block";
import { PageTitle, Link } from "../../components";

class HomePage extends Block {
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

    const ChatListPage = new Link({
      url: "/chat-list",
      text: "Список чатов",
      page: "chat-list",
    });

    const ChatItemPage = new Link({
      url: "/chat-item",
      text: "Чат",
      page: "chat-item",
    });

    const UserSettingsPage = new Link({
      url: "/user-settings",
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
      ChatListPage,
      ChatItemPage,
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
              <li>{{{LoginPage}}}</li>
              <li>{{{SignupPage}}}</li>
              <li>{{{ChatListPage}}}</li>
              <li>{{{ChatItemPage}}}</li>
              <li>{{{UserSettingsPage}}}</li>
              <li>{{{NotFoundPage}}}</li>
              <li>{{{ServerErrorPage}}}</li>
            </ul>
          </nav>
      `;
  }
}

export default HomePage;
