import Block from "../../core/Block";

class Input extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        input: props.onInput,
        click: props.onClick,
        blur: props.onBlur,
      },
    });
  }
  render(): string {
    return `<input
        class="input__element"
        type="{{type}}" 
        placeholder="{{placeholder}}"
        id="{{id}}" 
        name="{{name}}" 
        accept="{{accept}}" 
      />
   `;
  }
}

export default Input;
