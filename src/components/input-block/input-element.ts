import Block from "@/core/Block";

type InputElementProps = {
  name?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  events?: {
    input?: (event: Event) => void;
    click?: (event: Event) => void;
    blur?: (event: Event) => void;
    change?: (event: Event) => void;
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
        click: props.events?.click,
        change: props.events?.change,
      },
    });
  }
  // componentDidUpdate() {
  //   console.log("update input");
  //   console.log(this.props);
  // }

  render(): string {
    return `<input
        class="input__element"
        name="{{name}}" 
        type="{{type}}" 
        id="{{id}}" 
        placeholder="{{placeholder}}"
        value="{{value}}"
      />
   `;
  }
}

export default InputElement;
