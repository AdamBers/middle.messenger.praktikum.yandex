interface Block {
  getContent(): HTMLElement;
  show(): void;
  hide(): void;
}

interface RouteProps {
  rootQuery: string;
}

type BlockClass<T extends Record<string, unknown> = Record<string, unknown>> = new (props: T) => Block;

class Route {
  private _pathname: string;
  private _blockClass: BlockClass;
  private _block: Block | null;
  private _props: RouteProps;

  constructor(
    pathname: string,
    view: new (props: Record<string, unknown>) => Block,
    props: RouteProps
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  private _renderDom(query: string, block: Block): void {
    const root = document.querySelector(query);
    if (root) {
      root.append(block.getContent());
    }
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass({});
      const content = this._block.getContent() as HTMLElement;

      if (!content) {
        console.error("Block content is null");
        return;
      }

      this._renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
