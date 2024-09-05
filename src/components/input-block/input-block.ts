import Block from "../../core/Block";
import InputElement from "./input-element";
import ErrorLine from "./errorLine";
import {
  validateLogin,
  validatePassword,
  validateName,
  validateEmail,
  validateMessage,
  validatePhone,
} from "../../utils/validation";

interface IInputBlock {
  name: string;
  id: string;
  label_for: string;
  label: string;
  label_text: string;
  type: string;
  placeholder: string;
  onBlur?: (e: Event) => void;
}
interface IInputBlockChildren {
  InputField: InputElement;
  ErrorLine: ErrorLine;
}

class InputBlock extends Block<IInputBlock & IInputBlockChildren> {
  constructor(props: IInputBlock & IInputBlockChildren) {
    super({
      ...props,
      InputField: new InputElement({
        name: props.name,
        id: props.id,
        type: props.type,
        placeholder: props.placeholder,
        onBlur: (e: Event) => this.handleBlur(e),
        onInput: () => this.setErrorText(""),
      }),
      ErrorLine: new ErrorLine({}),
    });
  }

  setErrorText(errorText: string) {
    this.children.ErrorLine.setProps({ errorText });
  }

  handleBlur(e: Event) {
    switch (this.props.name) {
      case "login":
        if (!validateLogin(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверный логин");
        }
        break;

      case "password":
      case "oldPassword":
        if (!validatePassword(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверный пароль");
        }
        break;

      case "newPassword":
        if (!validatePassword(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверный пароль");
        }
        break;

      case "first_name":
        if (!validateName(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверное имя");
        }
        break;
      case "second_name":
        if (!validateName(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверная фамилия");
        }
        break;

      case "email":
        if (!validateEmail(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверный email");
        }
        break;

      case "message":
        if (!validateMessage(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверное сообщение");
        }
        break;
      case "phone":
        if (!validatePhone(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверный номер");
        }
        break;
      case "display_name":
        if (!validateName(this.children.InputField.getContent().value)) {
          this.setErrorText("Неверное имя");
        }
        break;
    }
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
  render(): string {
    return `
      <div class="input{{#if className}} {{className}}{{/if}}">
        <div class="input_block">
          <label for="{{label_for}}">{{label_text}}</label>
          {{{InputField}}}
        </div>
         {{{ErrorLine}}}
      </div>
    `;
  }
}

export default InputBlock;
