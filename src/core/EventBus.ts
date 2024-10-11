type TCallback = (...args: any[]) => void;
// здесь используем any чтобы принимать любые аргументы в функции
type TListeners = {
  [event: string]: Array<TCallback>;
};

class EventBus<TEvents extends string> {
  private listeners: TListeners;
  constructor() {
    this.listeners = {};
  }

  on(event: TEvents, callback: TCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: TEvents, callback: TCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: keyof TListeners, ...args: any[]) {
    if (!this.listeners[event]) {
      console.warn(`Нет события: ${event}`);
      return; // Прекращаем выполнение, если нет слушателей
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

export default EventBus;
