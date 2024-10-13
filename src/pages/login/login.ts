import Block from "@/core/Block";
import AuthApi from "@/api/auth";
import { goToMessagesIfAuthorized } from "@/utils/goToMessagesIfAuthorized";

import { Button, PageTitle, InputBlock, Link } from "../../components";
import { validateLogin, validatePassword } from "../../utils/validation";

type LoginPageProps = {};
type LoginPageChildren = {
  TitleOfPage: PageTitle;
  InputLogin: InputBlock;
  InputPassword: InputBlock;
  ButtonLogin: Button;
  SignupLink: Link;
};

const authApi = new AuthApi();

class LoginPage extends Block<LoginPageProps, LoginPageChildren> {
  constructor(props: LoginPageProps) {
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
        url: "/sign-up",
        text: "Создать",
        page: "signup",
      }),
    });
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    const loginInput = (
      this.children.InputLogin.children.InputField.getContent() as HTMLInputElement
    ).value;

    const passwordInput = (
      this.children.InputPassword.children.InputField.getContent() as HTMLInputElement
    ).value;

    // Валидация данных
    if (validateLogin(loginInput) && validatePassword(passwordInput)) {
      console.log(`login: ${loginInput} password: ${passwordInput}`);

      try {
        // Запрос авторизации
        const response = await authApi.signin({
          login: loginInput,
          password: passwordInput,
        });
        // Проверяем статус ответа
        if ("status" in response) {
          if (
            response?.status === 200 ||
            response?.data?.reason === "User already in system"
          ) {
            console.log(response);
            window.router.go("/messenger");
            const currentUser = await authApi.me();
            console.log(currentUser);
            if ("data" in currentUser) {
              window.store.set({ userId: currentUser?.data?.id });
              window.store.set({ user: currentUser?.data });
            }
          }
        }
      } catch (error) {
        console.log("Ошибка при входе:", error);
      }
    } else {
      console.log("Форма заполнена неверно. Показываем ошибки.");
      // Обработка ошибок валидации
      if (!validateLogin(loginInput)) {
        this.children.InputLogin.children.ErrorLine.setProps({
          errorText: "Неверный логин",
        });
      }
      if (!validatePassword(passwordInput)) {
        this.children.InputPassword.children.ErrorLine.setProps({
          errorText: "Неверный пароль",
        });
      }
    }
  }
  componentDidMount(_oldProps: LoginPageProps): void {
    goToMessagesIfAuthorized();
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
