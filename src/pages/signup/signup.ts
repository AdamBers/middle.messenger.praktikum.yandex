import { PageTitle, InputBlock, Button, Link } from "../../components";
import Block from "../../core/Block";

class SignupPage extends Block {
  constructor(props) {
    super({
      ...props,
      TitleOfPage: new PageTitle({
        title: "Регистрация",
      }),

      InputFirstName: new InputBlock({
        label_text: "Имя",
        type: "text",
        id: "first_name",
        name: "first_name",
      }),

      InputSecondName: new InputBlock({
        label_for: "second_name",
        label_text: "Фамилия",
        type: "text",
        id: "second_name",
        name: "second_name",
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
        type: "text",
        id: "email",
        name: "email",
      }),

      InputPassword: new InputBlock({
        type: "password",
        id: "password",
        name: "password",
        label_for: "password",
        label_text: "Пароль",
        label: "Пароль",
      }),

      InputPhone: new InputBlock({
        label_for: "phone",
        label_text: "Телефон",
        type: "text",
        id: "phone",
        name: "phone",
      }),

      ButtonSignUp: new Button({
        label: "Sign Up",
        type: "submit",
        onClick: (e: Event) => this.handleSubmit(e),
      }),
      LoginLink: new Link({
        url: "/login",
        text: "Войти",
        page: "login",
      }),
    });
  }
  handleSubmit(e: Event) {
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
    const userData: { [key: string]: string } = {};

    for (const child of childrenToCheck) {
      // Вызов handleBlur для валидации поля
      child.handleBlur();

      // Получаем значение поля
      const value = child.children.InputField.getContent().value;

      // Если поле не заполнено, устанавливаем флаг areAllValid в false
      if (!value || value === "") {
        areAllValid = false;
      } else {
        // Сохраняем значение поля в объект userData
        userData[child.props.name] = value;
      }
    }

    if (areAllValid) {
      console.log("Все поля заполнены верно.");
      console.log("Введенные данные:", userData);
    } else {
      console.log("Не все поля заполнены верно.");
    }
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
