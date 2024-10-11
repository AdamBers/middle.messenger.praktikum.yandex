import Block from "@/core/Block";
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

type InputBlockProps = {
  name: string;
  type: string;
  id?: string;
  placeholder?: string;
  label_for: string;
  label_text: string;
  label: string;
  className?: string;
  value?: string;
  // onBlur?: (e: Event) => void;
};

type InputBlockChildren = {
  InputField: InputElement;
  ErrorLine: ErrorLine;
};

class InputBlock extends Block<InputBlockProps, InputBlockChildren> {
  constructor(props: InputBlockProps) {
    super({
      ...props,
      InputField: new InputElement({
        name: props.name,
        type: props.type,
        id: props.id,
        placeholder: props.placeholder,
        value: props.value,
        events: {
          blur: () => this.handleBlur(),
          input: () => this.setErrorText(""),
        },
      }),
      ErrorLine: new ErrorLine({ errorText: "" }),
    });
  }

  setErrorText(errorText: string) {
    this.children.ErrorLine.setProps({ errorText });
  }

  handleBlur() {
    const inputElement =
      this.children.InputField.getContent() as HTMLInputElement;

    if (inputElement) {
      const inputValue = inputElement.value;

      switch (this.props.name) {
        case "login":
          if (!validateLogin(inputValue)) {
            this.setErrorText("Неверный логин");
          }
          break;

        case "password":
        case "oldPassword":
          if (!validatePassword(inputValue)) {
            this.setErrorText("Неверный пароль");
          }
          break;

        case "newPassword":
          if (!validatePassword(inputValue)) {
            this.setErrorText("Неверный пароль");
          }
          break;

        case "first_name":
          if (!validateName(inputValue)) {
            this.setErrorText("Неверное имя");
          }
          break;

        case "second_name":
          if (!validateName(inputValue)) {
            this.setErrorText("Неверная фамилия");
          }
          break;

        case "email":
          if (!validateEmail(inputValue)) {
            this.setErrorText("Неверный email");
          }
          break;

        case "message":
          if (!validateMessage(inputValue)) {
            this.setErrorText("Неверное сообщение");
          }
          break;

        case "phone":
          if (!validatePhone(inputValue)) {
            this.setErrorText("Неверный номер");
          }
          break;

        case "display_name":
          if (!validateName(inputValue)) {
            this.setErrorText("Неверное имя");
          }
          break;
      }
    }

    // if (this.props.onBlur) {
    //   this.props.onBlur(e);
    // }
  }

  render(): string {
    // console.log(this.props)
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
