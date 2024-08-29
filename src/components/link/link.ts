import Block from "../../core/Block";

class Link extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }
  render(): string {
    return `
      <a href="{{ url }}" class="link{{#if className}} {{className}}{{/if}}" page="{{ page }}">{{ text }}</a>
      `;
  }
}

export default Link;
