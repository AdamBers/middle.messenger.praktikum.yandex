import Block from "@/core/Block";
import {
  Button,
  PageTitle,
  InputBlock,
  Link,
  ErrorLine,
} from "../../components";
import { validateLogin, validatePassword } from "../../utils/validation";

type LoginPageProps = {};
type LoginPageChildren = {
  TitleOfPage: PageTitle;
  InputLogin: InputBlock;
  InputPassword: InputBlock;
  ButtonLogin: Button;
  SignupLink: Link;
  ErrorLine: ErrorLine;
};

class LoginPage extends Block<LoginPageProps, LoginPageChildren> {
  constructor(props: LoginPageChildren) {
    super({
      ...props,
      TitleOfPage: new PageTitle({
        title: "Вход",
      }),
      InputLogin: new InputBlock({
        type: "text",
        name: "login",
        id: "login",
        label: "Логин",
        label_for: "login",
        label_text: "Логин",
        placeholder: "",
      }),
      InputPassword: new InputBlock({
        type: "password",
        name: "password",
        id: "password",
        label: "Пароль",
        label_for: "password",
        label_text: "Пароль",
        placeholder: "",
      }),

      ButtonLogin: new Button({
        button_text: "Войти",
        type: "submit",
        events: {
          click: (event: Event) => this.handleSubmit(event),
        },
      }),
      SignupLink: new Link({
        url: "/signup",
        text: "Создать",
        page: "signup",
      }),
    });
  }

  setErrorText(errorText: string) {
    this.children.ErrorLine.setProps({ errorText });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const loginInput = (
      this.children.InputLogin.children.InputField.getContent() as HTMLInputElement
    ).value;

    const passwordInput = (
      this.children.InputPassword.children.InputField.getContent() as HTMLInputElement
    ).value;

    if (validateLogin(loginInput) && validatePassword(passwordInput)) {
      console.log(`login: ${loginInput} password: ${passwordInput}`);
    } else {
      console.log("Form is invalid. Show errors.");
    }

    if (!validateLogin(loginInput)) {
      this.children.InputLogin.setErrorText("Неверный логин");
    }
    if (!validatePassword(passwordInput)) {
      this.children.InputPassword.setErrorText("Неверный пароль");
    }
  }

  render() {
    return `
      <div class="login-container">
        <form>
          {{{ TitleOfPage }}}
          {{{InputLogin}}}
          {{{InputPassword}}}
          {{{ButtonLogin}}}
        </form>
        <p>Нет аккаунта?</p>
        {{{SignupLink}}}
      </div>
    `;
  }
}

export default LoginPage;
