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
    const target = event.currentTarget as HTMLElement;
    const url = target.dataset.url;
    if (window.router && url) {
      window.router.go(url);
    }
  }

  render(): string {
    return `
      <a class="link{{#if className}} {{className}}{{/if}}" data-url="{{ url }}" page="{{ page }}">
        {{ text }}
      </a>
    `;
  }
}

export default Link;
