import Block from "../../core/Block";
import Input from "./input";
import ErrorLine from "./errorLine";
import { validateLogin, validatePassword } from "../../utils/validation";

class InputBlock extends Block {
  constructor(props) {
    super({
      ...props,
      InputField: new Input({
        name: props.name,
        id: props.id,
        type: props.type,
        placeholder: props.placeholder,
        onBlur: (e) => this.handleBlur(e),
        onInput: () => this.setErrorText(""),
      }),
      ErrorLine: new ErrorLine({
        errorText: "",
      }),
    });
  }

  setErrorText(errorText: string) {
    this.children.ErrorLine.setProps({ errorText });
  }

  handleBlur(event: Event) {
    console.log(this.children.InputField.getContent().value);
    if (
      this.props.name === "login" &&
      !validateLogin(this.children.InputField.getContent().value)
    ) {
      this.setErrorText(`Неправильный логин`);
    }
    if (
      this.props.name === "password" &&
      !validatePassword(this.children.InputField.getContent().value)
    ) {
      this.setErrorText(`Неправильный пароль`);
    }
  }
  render(): string {
    return `
      <div class="input{{#if className}} {{className}}{{/if}}">
         <label for="{{label_for}}">{{label_text}}</label>
         {{{InputField}}}
         {{{ErrorLine}}}
      </div>
    `;
  }
}

export default InputBlock;
