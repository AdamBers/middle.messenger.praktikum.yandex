import Block from "../../core/Block";

type ButtonProps = {
  button_text?: string;
  type?: string;
  events?: {
    click?: (e: Event) => void;
  };
};
type ButtonChildren = {};

class Button extends Block<ButtonProps, ButtonChildren> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props?.events?.click,
      },
    });
  }

  render(): string {
    return `
      <button class="button" type={{type}}>
         {{button_text}}
      </button>
    `;
  }
}

export default Button;
