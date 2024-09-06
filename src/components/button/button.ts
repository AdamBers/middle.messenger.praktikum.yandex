import Block from "../../core/Block";

type ButtonProps = {
  button_text?: string;
  type: string;
  onClick: (e: Event) => void;
};

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
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
