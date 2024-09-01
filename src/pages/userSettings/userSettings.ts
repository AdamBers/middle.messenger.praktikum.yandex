import { InputBlock, Button, Link } from "../../components";
import Block from "../../core/Block";
// import { validateLogin, validatePassword } from "../../utils/validation";

class UserSettingsPage extends Block {
  constructor(props) {
    super({
      ...props,

      InputEmail: new InputBlock({
        label_for: "email",
        label_text: "Email",
        type: "text",
        id: "email",
        name: "email",
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

      InputDisplayName: new InputBlock({
        label_for: "display_name",
        label_text: "Имя в чате",
        type: "text",
        id: "display_name",
        name: "display_name",
      }),

      InputPhone: new InputBlock({
        label_for: "phone",
        label_text: "Телефон",
        type: "text",
        id: "phone",
        name: "phone",
      }),

      InputOldPassword: new InputBlock({
        type: "password",
        id: "oldPassword",
        name: "oldPassword",
        label_for: "oldPassword",
        label_text: "Старый пароль",
        label: "oldPassword",
      }),

      InputNewPassword: new InputBlock({
        type: "password",
        id: "newPassword",
        name: "newPassword",
        label_for: "newPassword",
        label_text: "Новый пароль",
        label: "newPassword",
        // onBlur: (e: Event) => this.handleBlur(e),
      }),

      SubmitButton: new Button({
        name: "save",
        label: "Сохранить",
        type: "submit",
        onClick: (event: Event) => this.handleSubmit(event),
      }),
      BackHomeLink: new Link({
        url: "/home",
        text: "",
        page: "home",
      }),
    });
  }

  validateAllInputs(e: Event) {
    const childrenToCheck = [
      this.children.InputNewPassword,
      this.children.InputEmail,
      this.children.InputDisplayName,
      this.children.InputFirstName,
      this.children.InputLogin,
      this.children.InputOldPassword,
      this.children.InputSecondName,
      this.children.InputPhone,
    ];

    let areAllValid = true;
    const userData: { [key: string]: string } = {}; // Объект для хранения значений полей

    for (const child of childrenToCheck) {
      // Вызываем handleBlur и сохраняем результат
      child.handleBlur();

      // Получаем значение из поля
      const value = child.children.InputField.getContent().value;

      // Проверяем, что поле не пустое
      if (!value || value === "") {
        areAllValid = false;
      } else {
        userData[child.props.name] = value; // Сохраняем значение в объект userData
      }
    }

    if (areAllValid) {
      console.log("Все поля заполнены верно.");
      console.log("Введенные данные:", userData);
    } else {
      console.log("Не все поля заполнены верно.");
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.validateAllInputs(e);
    this.children.InputNewPassword.handleBlur();
    this.children.InputEmail.handleBlur();
    this.children.InputDisplayName.handleBlur();
    this.children.InputFirstName.handleBlur();
    this.children.InputLogin.handleBlur();
    this.children.InputOldPassword.handleBlur();
    this.children.InputSecondName.handleBlur();
    this.children.InputPhone.handleBlur();
  }

  // handleBlur(e: Event) {
  //   const oldPassword =
  //     this.children.InputOldPassword.children.InputField.getContent().value;
  //   const newPassword =
  //     this.children.InputNewPassword.children.InputField.getContent().value;

  //   if (!validatePassword(newPassword)) {
  //     this.children.InputNewPassword.setErrorText("Неверный пароль");
  //     return;
  //   }
  //   if (oldPassword !== newPassword) {
  //     this.children.InputNewPassword.setErrorText("Пароли не совпадают");
  //     return;
  //   }
  // }
  render() {
    return `
         <div class="user-container">
          <div class="button-back">
            {{{BackHomeLink}}}
          </div>
          <div class="content user-settings">
              <form>      
                    <label for="avatar">
                      {{#if avatar}}
                          {{!-- <img class="profile__avatar" src="{{ avatar }}" alt="avatar" /> --}}
                      {{else }}
                          <div class="profile__avatar-empty">
                            {{!-- <img class="profile__avatar" src="/static/img/empty-profile.png" alt="avatar" /> --}}
                          </div>
                      {{/if}}
                    </label>
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" class="avatar_input">
                <div class="user-name">Имя</div>
                <div class = "user-settings"> 
                  {{{InputEmail}}}
                  {{{InputLogin}}}
                  {{{InputFirstName}}}
                  {{{InputSecondName}}}
                  {{{InputDisplayName}}}
                  {{{InputPhone}}}
                  {{{InputOldPassword}}}
                  {{{InputNewPassword}}}
                  {{{SubmitButton}}}
                </div>
              </form>
          </div>
        </div>
      `;
  }
}

export default UserSettingsPage;
