import Block from "@/core/Block";
import { Button, InputBlock } from "@/components";

type ChangePasswodProps = {};

type ChangePasswordChildren = {
  InputOldPassword: InputBlock;
  InputNewPassword: InputBlock;
  ChangePassSubmit: Button;
};
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
  handleChangePass() {
    console.log("click");
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
