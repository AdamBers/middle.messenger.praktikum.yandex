import Block from "@/core/Block";
import { PageTitle, InputBlock, Button, Link } from "../../components";
import AuthApi from "@/api/auth";
import { goToMessagesIfAuthorized } from "@/utils/goToMessagesIfAuthorized";

type SignupPageProps = {};
type SignupPageChildren = {
  TitleOfPage: PageTitle;
  InputFirstName: InputBlock;
  InputSecondName: InputBlock;
  InputLogin: InputBlock;
  InputEmail: InputBlock;
  InputPassword: InputBlock;
  InputPhone: InputBlock;
  ButtonSignUp: Button;
  LoginLink: Link;
};

const authApi = new AuthApi(); // Создаем экземпляр API
class SignupPage extends Block<SignupPageProps, SignupPageChildren> {
  constructor(props: SignupPageProps) {
    super({
      ...props,
      TitleOfPage: new PageTitle({
        title: "Регистрация",
      }),

      InputFirstName: new InputBlock({
        id: "first_name",
        name: "first_name",
        type: "text",
        label_text: "Имя",
        label: "Имя",
        label_for: "first_name",
        placeholder: "",
      }),

      InputSecondName: new InputBlock({
        label_for: "second_name",
        label_text: "Фамилия",
        label: "",
        type: "text",
        id: "second_name",
        name: "second_name",
        placeholder: "",
      }),

      InputLogin: new InputBlock({
        type: "text",
        name: "login",
        id: "login",
        label_for: "login",
        label: "Логин",
        label_text: "Логин",
        placeholder: "",
      }),

      InputEmail: new InputBlock({
        label_for: "email",
        label_text: "Email",
        label: "",
        type: "text",
        id: "email",
        name: "email",
        placeholder: "",
      }),

      InputPassword: new InputBlock({
        type: "password",
        id: "password",
        name: "password",
        label_for: "password",
        label_text: "Пароль",
        label: "Пароль",
        placeholder: "",
      }),

      InputPhone: new InputBlock({
        label_for: "phone",
        label_text: "Телефон",
        label: "",
        type: "text",
        id: "phone",
        name: "phone",
        placeholder: "",
      }),

      ButtonSignUp: new Button({
        button_text: "Sign Up",
        type: "submit",
        events: {
          click: (e: Event) => this.handleSubmit(e),
        },
      }),
      LoginLink: new Link({
        url: "/",
        text: "Войти",
        page: "/",
      }),
    });
  }

  async handleSubmit(e: Event) {
    e.preventDefault();

    const childrenToCheck = [
      this.children.InputFirstName,
      this.children.InputSecondName,
      this.children.InputLogin,
      this.children.InputEmail,
      this.children.InputPassword,
      this.children.InputPhone,
    ];

    let areAllValid = true;
    const userData: any = {};

    for (const child of childrenToCheck) {
      child.handleBlur();

      const inputElement =
        child.children.InputField?.getContent() as HTMLInputElement | null;
      const value = inputElement?.value;

      if (!value || value === "") {
        areAllValid = false;
      } else {
        userData[child.props.name] = value;
      }
    }

    if (areAllValid) {
      try {
        // Используем API для регистрации
        const response = await authApi.create(userData);

        if ("id" in response) {
          console.log("Успешная регистрация:", response);
          window.router.go("/messenger");
        }
        console.log(response);
      } catch (error) {
        console.log("Ошибка при регистрации:", error);
      }
    } else {
      console.log("Не все поля заполнены верно.");
    }
  }

  componentDidMount(_oldProps: SignupPageProps): void {
    goToMessagesIfAuthorized();
  }
  render() {
    return `
   <div class="signup-container">
      {{{TitleOfPage}}}
      <form>
        {{{InputFirstName}}}
        {{{InputSecondName}}}
        {{{InputLogin}}}
        {{{InputEmail}}}
        {{{InputPassword}}}
        {{{InputPhone}}}
        {{{ButtonSignUp}}}
      </form>
      <p>Уже зарегистрированы?</p>
      {{{LoginLink}}}
   </div>
   `;
  }
}

export default SignupPage;
