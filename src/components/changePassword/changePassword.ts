import Block from "@/core/Block";
import { Button, InputBlock } from "@/components";
import UsersAPI from "@/api/user";

type ChangePasswodProps = {};

type ChangePasswordChildren = {
  InputOldPassword: InputBlock;
  InputNewPassword: InputBlock;
  ChangePassSubmit: Button;
};

const usersApi = new UsersAPI();
class ChangePassword extends Block<ChangePasswodProps, ChangePasswordChildren> {
  constructor(props: ChangePasswodProps) {
    super({
      ...props,
      InputOldPassword: new InputBlock({
        type: "password",
        id: "oldPassword",
        name: "oldPassword",
        label_for: "oldPassword",
        label_text: "Старый пароль",
        label: "oldPassword",
        placeholder: "",
      }),
      InputNewPassword: new InputBlock({
        type: "password",
        id: "newPassword",
        name: "newPassword",
        label_for: "newPassword",
        label_text: "Новый пароль",
        label: "newPassword",
        placeholder: "",
      }),
      ChangePassSubmit: new Button({
        type: "submit",
        button_text: "Сохранить",
        events: {
          click: () => this.handleChangePass(),
        },
      }),
    });
  }
  async handleChangePass() {
    let oldPassword;
    let newPassword;
    const oldPasswordInput =
      this.children.InputOldPassword.children.InputField.getContent() as HTMLInputElement;
    const newPasswordInput =
      this.children.InputNewPassword.children.InputField.getContent() as HTMLInputElement;
    if (oldPasswordInput) {
      oldPassword = oldPasswordInput.value;
    }
    if (newPasswordInput) {
      newPassword = newPasswordInput.value;
    }
    // let resp = { oldPassword, newPassword };
    const resp = await usersApi.changePassword({
      oldPassword,
      newPassword,
    });
    console.log(resp);
  }
  render(): string {
    console.log("changePassword render");
    return `<div class="password">
                {{{InputOldPassword}}}
                {{{InputNewPassword}}}
                {{{ChangePassSubmit}}}
            </div>`;
  }
}

export default ChangePassword;
