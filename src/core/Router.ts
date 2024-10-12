import Route from "./Route";

// Интерфейс для типа маршрута
// interface Block {
//   getContent(): HTMLElement;
//   show(): void;
//   hide(): void;
// }

// Определяем тип для конструктора компонента (страницы)
// type BlockClass = new (props: Record<string, unknown>) => Block;
// type BlockClass<P = Record<string, unknown>> = new (props: P) => Block;
// type BlockClass<T extends Record<string, unknown> = Record<string, unknown>> = new (props: T) => Block;

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: any): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    const route = this.routes.find((route) => route.match(pathname));
    if (!route) {
      return this.routes.find((route) => route.match("*"));
    }
    return route;
  }
}

export default Router;
