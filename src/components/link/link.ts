import Block from "@/core/Block";

type LinkProps = {
  url: string;
  text?: string;
  className?: string;
  page?: string;
  events?: {
    click?: (event: Event) => void;
  };
};

class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e) => this.onClick(e),
      },
    });
  }

  onClick(event: Event) {
    event.preventDefault();
    if (window.router) {
      window.router.go(this.props.url);
    }
  }

  render(): string {
    return `
      <a href="{{ url }}" class="link{{#if className}} {{className}}{{/if}}" page="{{ page }}">
        {{ text }}
      </a>
    `;
  }
}

export default Link;
