import EventBus from "./EventBus";
import { nanoid } from "nanoid";
import * as Handlebars from "handlebars";
//
type Values<T extends Record<string, unknown>> = T[keyof T];
type TEvents = Values<typeof Block.EVENTS>;
type ComponentChildren = {
  [key: string]: Block<object>;
};

type PropsWithEvents = {
  events?: { [key: string]: (e: Event) => void };
};

export default class Block<
  Props extends object = {},
  Children extends ComponentChildren = {}
> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  _element: HTMLElement | null = null;
  _meta = null;
  _id = nanoid(6);

  public props: Props & PropsWithEvents;
  public children: Children;
  public name: string;
  private eventBus: () => EventBus<TEvents>;

  constructor(propsWithChildren: Props & Children) {
    const eventBus = new EventBus<TEvents>();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.name = "";

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      const eventHandler = events[eventName];
      if (eventHandler) {
        this._element!.addEventListener(eventName, eventHandler);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      const eventHandler = events[eventName];
      if (eventHandler) {
        this._element!.removeEventListener(eventName, eventHandler);
      }
    });
  }

  _registerEvents(eventBus: EventBus<TEvents>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount(this.props);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(_oldProps: Props) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props) {
    return true;
  }

  _getChildrenAndProps(propsAndChildren: Props & Children) {
    // начало
    const children: Record<string, Block<any>> = {}; // Используем Record для более гибкой типизации
    // конец
    const props: Partial<Props> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        // Явно приводим тип children, чтобы убрать ошибку
        children[key] = value as Block<object>;
      } else {
        props[key as keyof Props] = value;
      }
    });

    // Явно приводим тип children к типу Children
    return { children: children as unknown as Children, props: props as Props };
  }

  setProps(nextProps: Partial<Props>): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  _render() {
    // начало
    const propsAndStubs: Record<string, any> = { ...this.props }; // тут можно только так
    // конец
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    const newElement = fragment.content.firstElementChild as HTMLElement | null;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent()!);
    });

    if (newElement && this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  render() {
    return "";
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element as HTMLElement;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop as keyof Props];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop as keyof Props] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
