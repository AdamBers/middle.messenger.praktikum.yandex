import EventBus from "./EventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export class Store<
  T extends Record<string, unknown>
> extends EventBus<StoreEvents> {
  private state: T;
  private isInitialized: boolean = false; // Флаг для отслеживания инициализации

  constructor(defaultState: T) {
    super();
    this.state = defaultState;
    this.set(defaultState); // Первый вызов `set` для инициализации
    this.isInitialized = true; // Устанавливаем флаг после инициализации
  }

  public getState(): T {
    return this.state;
  }

  public set(nextState: Partial<T>) {
    const prevState = { ...this.state };

    // Обновляем состояние
    this.state = { ...this.state, ...nextState };

    // Вызываем событие Updated только если инициализация уже завершена
    if (this.isInitialized) {
      this.emit(StoreEvents.Updated, prevState, nextState);
    }
  }
}
