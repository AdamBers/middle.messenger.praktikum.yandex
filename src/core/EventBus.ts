type Callback = (...args: any[]) => void;

export default class EventBus<TEvents extends string> {
  private listeners: Record<TEvents, Callback[]> = {} as Record<TEvents, Callback[]>;

  on(event: TEvents, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    if (!this.listeners[event].includes(callback)) {
      this.listeners[event].push(callback);
    }
  }

  off(event: TEvents, callback: Callback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: TEvents, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
