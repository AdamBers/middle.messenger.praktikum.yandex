import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { nanoid } from "nanoid";

type Values<T> = T[keyof T];
type TEvents = Values<typeof Block.EVENTS>;
type PropsWithEvents = {
  events?: Record<string, EventListenerOrEventListenerObject>;
  [key: string]: any; // Индексация строками
};

type ComponentChildren = {
  [key: string]: Block<object>;
};

export default class Block<
  Props extends PropsWithEvents = PropsWithEvents,
  Children extends ComponentChildren = any
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

  public props: Props;
  public children: Children;
  public name: string;

  // private _eventbus;
  private eventBus: () => EventBus<TEvents>; // <-- Добавьте это объявление

  constructor(propsWithChildren: Props & Children) {
    const eventBus = new EventBus();
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
    if (this._element) {
      Object.keys(events).forEach((eventName) => {
        this._element!.addEventListener(eventName, events[eventName]);
      });
    }
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
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps?: Props) {}

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

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  _getChildrenAndProps(propsAndChildren: Props & Children) {
    const children = {};
    const props = {};

    if (!propsAndChildren) {
      return { children, props } as { children: Children; props: Props };
    }

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        //@ts-ignore
        children[key] = value;
      } else {
        //@ts-ignore
        props[key] = value;
      }
    });

    return { children, props } as { children: Children; props: Props };
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const propsAndStubs: PropsWithEvents = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    const newElement = fragment.content.firstElementChild as HTMLElement | null;

    if (newElement) {
      // Проверяем, что newElement не null
      Object.values(this.children).forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        if (stub) {
          // Проверяем, что stub не null
          stub.replaceWith(child.getContent()!); // Уверяемся, что getContent() не возвращает null
        }
      });

      if (this._element) {
        // Проверяем, что this._element не null
        this._element.replaceWith(newElement);
      }

      this._element = newElement;
    }

    this._addEvents();
  }

  render() {}

  getContent(): HTMLElement | null {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string | symbol) {
        const value = target[prop as string];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string | symbol, value) {
        const oldTarget = { ...target };
        (target as Record<string, any>)[prop as string] = value;

        // Запускаем обновление компоненты
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: "template"): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}
