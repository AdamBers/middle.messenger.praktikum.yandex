import Block from "@/core/Block";


interface LinkProps {
  url: string;
  text: string;
  page?: string;
  className?: string;
}

class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }
  render(): string {
    return `
      <a href="{{ url }}" class="link{{#if className}} {{className}}{{/if}}" page="{{ page }}">{{ text }}</a>
      `;
  }
}

export default Link;
