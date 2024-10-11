import Block from "@/core/Block";
import AuthApi from "@/api/auth";
import UsersAPI from "@/api/user";
import { InputBlock, Button, Link } from "../../components";
import { connect } from "@/utils/connect"; // Импортируем функцию connect
import { UserDTO } from "@/api/types"; // Импортируем тип UserDTO

type UserSettingsPageProps = {
  user: UserDTO; // Добавляем типизацию для пользователя
};

type UserSettingsPageChildren = {
  InputEmail: InputBlock;
  InputLogin: InputBlock;
  InputFirstName: InputBlock;
  InputSecondName: InputBlock;
  InputDisplayName: InputBlock;
  InputPhone: InputBlock;
  // InputOldPassword: InputBlock;
  // InputNewPassword: InputBlock;
  SubmitButton: Button;
  BackHomeLink: Link;
};

const userApi = new UsersAPI();

class UserSettingsPage extends Block<
  UserSettingsPageProps,
  UserSettingsPageChildren
> {
  constructor(props: UserSettingsPageProps) {
    super({
      ...props,
      InputEmail: new InputBlock({
        label_for: "email",
        label_text: "Email",
        type: "text",
        id: "email",
        name: "email",
        label: "email",
        placeholder: props?.user?.email || "",
        value: props?.user?.email || "",
      }),
      InputLogin: new InputBlock({
        type: "text",
        name: "login",
        id: "login",
        label_for: "login",
        label: "Логин",
        label_text: "Логин",
        // placeholder: "",
        placeholder: props.user?.login || "", // Установка начального значения
      }),
      InputFirstName: new InputBlock({
        label_text: "Имя",
        label: "Имя",
        label_for: "first_name",
        type: "text",
        id: "first_name",
        name: "first_name",
        // placeholder: "",
        placeholder: props.user?.first_name || "", // Установка начального значения
      }),
      InputSecondName: new InputBlock({
        label_for: "second_name",
        label_text: "Фамилия",
        label: "Фамилия",
        type: "text",
        id: "second_name",
        name: "second_name",
        // placeholder: "",
        placeholder: props.user?.second_name || "", // Установка начального значения
      }),
      InputDisplayName: new InputBlock({
        label_for: "display_name",
        label_text: "Имя в чате",
        label: "Имя в чате",
        type: "text",
        id: "display_name",
        name: "display_name",
        // placeholder: "",
        placeholder: props.user?.display_name || "", // Установка начального значения
      }),
      InputPhone: new InputBlock({
        label_for: "phone",
        label_text: "Телефон",
        label: "Телефон",
        type: "text",
        id: "phone",
        name: "phone",
        // placeholder: "",
        placeholder: props.user?.phone || "",
      }),
      // InputOldPassword: new InputBlock({
      //   type: "password",
      //   id: "oldPassword",
      //   name: "oldPassword",
      //   label_for: "oldPassword",
      //   label_text: "Старый пароль",
      //   label: "oldPassword",
      //   placeholder: "",
      // }),
      // InputNewPassword: new InputBlock({
      //   type: "password",
      //   id: "newPassword",
      //   name: "newPassword",
      //   label_for: "newPassword",
      //   label_text: "Новый пароль",
      //   label: "newPassword",
      //   placeholder: "",
      // }),
      SubmitButton: new Button({
        button_text: "Сохранить",
        type: "submit",
        events: {
          click: (event: Event) => this.handleSubmit(event),
        },
      }),
      BackHomeLink: new Link({
        url: "/messenger",
        text: "",
        page: "messenger",
      }),
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
      // this.children.InputNewPassword,
      // this.children.InputOldPassword,
    ];

    let areAllValid = true;
    const userData: { [key: string]: string } = {}; // Объект для хранения значений полей

    for (const child of childrenToCheck) {
      // Вызываем handleBlur и сохраняем результат
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

  handleSubmit(e: Event) {
    e.preventDefault();
    const userData = this.validateAllInputs();

    if (userData) {
      console.log(userData);
      userApi.updateProfile(userData);
      this.setProps({});
    }
  }

  async componentDidMount(): Promise<void> {
    const authAPI = new AuthApi();
    const Me = await authAPI.me();

    // Обновляем store с данными пользователя
    window.store.set({ user: Me?.data });

    // Обновляем prop с данными пользователя
    this.setProps({
      user: Me?.data,
    });
    // Обновляем значения в InputBlock компонентах
    this.children.InputEmail.children.InputField.setProps({
      placeholder: Me?.data?.email,
    });
    this.children.InputLogin.children.InputField.setProps({
      placeholder: Me?.data?.login,
    });
    this.children.InputFirstName.children.InputField.setProps({
      placeholder: Me?.data?.first_name,
    });
    this.children.InputSecondName.children.InputField.setProps({
      placeholder: Me?.data?.second_name,
    });
    this.children.InputDisplayName.children.InputField.setProps({
      placeholder: Me?.data?.display_name,
    });
    this.children.InputPhone.children.InputField.setProps({
      placeholder: Me?.data?.phone,
    });
  }

  componentDidUpdate(
    oldProps: UserSettingsPageProps,
    newProps: UserSettingsPageProps
  ): boolean {
    if (oldProps.user !== newProps.user) {
      this.children.InputEmail.children.InputField.setProps({
        value: newProps.user.email,
      });
      this.children.InputLogin.children.InputField.setProps({
        value: newProps.user.login,
      });
      this.children.InputFirstName.children.InputField.setProps({
        value: newProps.user.first_name,
      });
      this.children.InputSecondName.children.InputField.setProps({
        value: newProps.user.second_name,
      });
      this.children.InputDisplayName.children.InputField.setProps({
        value: newProps.user.display_name,
      });
      this.children.InputPhone.children.InputField.setProps({
        value: newProps.user.phone,
      });
      return true;
    }
    return false;
  }

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
            <div class="user-name">{{this.props.userName}}</div>
            <div class="user-settings">
              {{{InputFirstName}}}
              {{{InputSecondName}}}
              {{{InputDisplayName}}}
              {{{InputLogin}}}
              {{{InputEmail}}}
              {{{InputPhone}}}
              {{{SubmitButton}}}
            </div>
          </form>
        </div>
      </div>
    `;
  }
}
// {{{InputOldPassword}}}
// {{{InputNewPassword}}}
// Функция для подключения к store
const mapStateToProps = (state: any) => ({
  user: state.user, // Извлекаем пользователя из состояния
});

export default connect(mapStateToProps)(UserSettingsPage); // Экспортируем компонент, подключенный к store
