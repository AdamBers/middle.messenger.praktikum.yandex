import Block from "@/core/Block";

interface InputElementProps {
  name: string;
  type: string;
  id?: string;
  placeholder?: string;
  accept?: string;
  events?: {};
  onInput?: (event: Event) => void;
  onClick?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

class InputElement extends Block<InputElementProps> {
  constructor(props: InputElementProps) {
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

export default InputElement;
