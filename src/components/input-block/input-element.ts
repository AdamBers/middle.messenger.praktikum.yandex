import Block from "@/core/Block";

type InputElementProps = {
  name?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  events?: {
    input?: (event: Event) => void;
    click?: (event: Event) => void;
    blur?: (event: Event) => void;
  };
};
type InputElementChildren = {};

class InputElement extends Block<InputElementProps, InputElementChildren> {
  constructor(props: InputElementProps) {
    super({
      ...props,
      events: {
        input: props.events?.input,
        blur: props.events?.blur,
        // click: props.events?.click,
      },
    });
  }

  render(): string {
    return `<input
        class="input__element"
        name="{{name}}" 
        type="{{type}}" 
        id="{{id}}" 
        placeholder="{{placeholder}}"
      />
   `;
  }
}

export default InputElement;
