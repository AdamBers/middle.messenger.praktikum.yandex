import Block from "../../core/Block";

type ButtonProps = {
  button_text?: string;
  type: string;
  events?: {
    click?: (e: Event) => void;
  };
};

class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.events?.click,
      },
    });
  }

  render(): string {
    console.log(this.props);
    return `
      <button class="button" type={{type}}>
         {{button_text}}
      </button>
    `;
  }
}

export default Button;
