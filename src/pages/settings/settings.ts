import Block from "@/core/Block";
import AuthApi from "@/api/auth";
import UsersAPI from "@/api/user";
import { InputBlock, Button, Link, ChangePassword } from "../../components";
import { connect } from "@/utils/connect"; // Импортируем функцию connect
// import { UserDTO } from "@/api/type"; // Импортируем тип UserDTO

type SettingsPageProps = {
  // user: UserDTO; // Добавляем типизацию для пользователя
  user?: any;
  isPasswordChangeMode: boolean;
};

type SettingsPageChildren = {
  InputEmail: InputBlock;
  InputLogin: InputBlock;
  InputFirstName: InputBlock;
  InputSecondName: InputBlock;
  InputDisplayName: InputBlock;
  InputPhone: InputBlock;
  SubmitButton: Button;
  LogoutButton: Button;
  BackHomeLink: Link;
  ChangeUserInfo: Button;
  ChangeUserPassword: Button;
  ChangePassword: ChangePassword;
  BackSettingsLink: Button;
  ChangeAvatarButton: Button;
};

const userApi = new UsersAPI();

class SettingsPage extends Block<SettingsPageProps, SettingsPageChildren> {
  constructor(props: SettingsPageProps) {
    super({
      ...props,
      InputEmail: new InputBlock({
        label_for: "email",
        label_text: "Email",
        type: "text",
        id: "email",
        name: "email",
        label: "email",
        value: props?.user?.email || "",
      }),
      InputLogin: new InputBlock({
        type: "text",
        name: "login",
        id: "login",
        label_for: "login",
        label: "Логин",
        label_text: "Логин",
        value: props.user?.login || "", // Установка начального значения
      }),
      InputFirstName: new InputBlock({
        label_text: "Имя",
        label: "Имя",
        label_for: "first_name",
        type: "text",
        id: "first_name",
        name: "first_name",
        value: props.user?.first_name || "", // Установка начального значения
      }),
      InputSecondName: new InputBlock({
        label_for: "second_name",
        label_text: "Фамилия",
        label: "Фамилия",
        type: "text",
        id: "second_name",
        name: "second_name",
        value: props.user?.second_name || "", // Установка начального значения
      }),
      InputDisplayName: new InputBlock({
        label_for: "display_name",
        label_text: "Имя в чате",
        label: "Имя в чате",
        type: "text",
        id: "display_name",
        name: "display_name",
        value: props.user?.display_name || "", // Установка начального значения
      }),
      InputPhone: new InputBlock({
        label_for: "phone",
        label_text: "Телефон",
        label: "Телефон",
        type: "text",
        id: "phone",
        name: "phone",
        value: props.user?.phone || "",
      }),

      ChangeUserInfo: new Button({
        button_text: "Изменить данные",
        type: "button",
        events: {
          click: (e: Event) => this.handleSubmit(e),
        },
      }),
      ChangeUserPassword: new Button({
        button_text: "Изменить пароль",
        type: "button",
        events: {
          click: () => this.handleChangePassword(),
        },
      }),
      SubmitButton: new Button({
        button_text: "Сохранить",
        type: "submit",
        events: {
          click: (event: Event) => this.handleSubmit(event),
        },
      }),
      LogoutButton: new Button({
        button_text: "Выйти",
        type: "button",
        events: {
          click: () => this.handleLogout(),
        },
      }),
      BackHomeLink: new Link({
        url: "/messenger",
        text: "",
        page: "messenger",
      }),
      BackSettingsLink: new Button({
        button_text: "<",
        type: "button",
        events: {
          click: () => this.handleBack(),
        },
      }),
      ChangeAvatarButton: new Button({
        type: "button",
        button_text: "Изменить аватар",
        events: {
          click: () => this.changeAvatar(),
        },
      }),
      ChangePassword: new ChangePassword({}),
      isPasswordChangeMode: false,
    });
  }

  validateAllInputs() {
    const childrenToCheck = [
      this.children.InputFirstName,
      this.children.InputSecondName,
      this.children.InputDisplayName,
      this.children.InputEmail,
      this.children.InputLogin,
      this.children.InputPhone,
    ];

    let areAllValid = true;
    const userData: { [key: string]: string } = {}; // Объект для хранения значений полей

    for (const child of childrenToCheck) {
      child.handleBlur();

      const inputElement =
        child.children.InputField?.getContent() as HTMLInputElement | null;
      const value = inputElement?.value;

      if (!value || value === "") {
        areAllValid = false;
      } else {
        userData[child.props.name] = value; // Сохраняем значение в объект userData
      }
    }

    if (areAllValid) {
      console.log("Все поля заполнены верно.");
      console.log("Введенные данные:", userData);
      return userData; // Возвращаем заполненные данные
    } else {
      console.log("Не все поля заполнены верно.");
      return null; // Возвращаем null, если не все поля валидны
    }
  }
  changeAvatar() {
    console.log("changeavatar");
  }

  handleBack() {
    console.log("this.props.isPasswordChangeMode");
    this.setProps({ isPasswordChangeMode: false });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const userData = this.validateAllInputs();

    if (userData) {
      console.log(userData);
      userApi.updateProfile(userData);
      this.setProps({});
    }
  }
  handleChangeInfo() {}
  handleChangePassword() {
    this.setProps({ isPasswordChangeMode: true });
    console.log(this.props.isPasswordChangeMode);
  }

  async handleLogout() {
    const authApi = new AuthApi();
    await authApi.logout();
    window.router.go("/");
  }

  async componentDidMount(): Promise<void> {
    const authAPI = new AuthApi();
    const Me = await authAPI.me();
    if ("data" in Me) {
      window.store.set({ user: Me?.data });
      this.setProps({
        user: Me?.data,
      });
      this.children.InputEmail.children.InputField.setProps({
        value: Me?.data?.email,
      });
      this.children.InputLogin.children.InputField.setProps({
        value: Me?.data?.login,
      });
      this.children.InputFirstName.children.InputField.setProps({
        value: Me?.data?.first_name,
      });
      this.children.InputSecondName.children.InputField.setProps({
        value: Me?.data?.second_name,
      });
      this.children.InputDisplayName.children.InputField.setProps({
        value: Me?.data?.display_name,
      });
      this.children.InputPhone.children.InputField.setProps({
        value: Me?.data?.phone,
      });
    }
  }

  render() {
    if (this.props.isPasswordChangeMode === true) {
      return `<div class="user-container">
                <div class="button-back">
                  {{{BackSettingsLink}}}
                </div>
              <div class="content user-settings">
                {{{ChangePassword}}}
              </div>`;
    }

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
            <div class="user-name">{{this.props.userName}}</div>
            <div class="user-settings">
              {{{InputFirstName}}}
              {{{InputSecondName}}}
              {{{InputDisplayName}}}
              {{{InputLogin}}}
              {{{InputEmail}}}
              {{{InputPhone}}}
              <div class="user-edit">
                {{{ChangeUserInfo}}}
                {{{ChangeUserPassword}}}
                {{{ChangeAvatarButton}}}
                {{{LogoutButton}}}
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user || {},
});

export default connect(mapStateToProps)(SettingsPage);
