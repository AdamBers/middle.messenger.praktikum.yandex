import { StoreEvents } from "../core/Store";
import isEqual from "./isEqual";

export function connect(mapStateToProps: (state: any) => { [key: string]: any }, dispatch?: { [key: string]: (dispatch: Function, ...args: any[]) => void }) {
  return function (Component: any) {
    return class extends Component {
      private onChangeStoreCallback: () => void;
      private state: any; // Хранит текущее состояние

      constructor(props: any) {
        const store = window.store;

        // Получаем начальное состояние
        const initialState = mapStateToProps(store.getState());

        // Вызов родительского конструктора
        super({ ...props, ...initialState });

        // Сохраняем состояние
        this.state = initialState;

        // Создаем обработчики для dispatch
        const dispatchHandlers: { [key: string]: Function } = {};
        Object.entries(dispatch || {}).forEach(([key, handler]) => {
          dispatchHandlers[key] = (...args: any[]) =>
            handler(window.store.set.bind(window.store), ...args);
        });

        this.setProps({ ...dispatchHandlers });

        // Создаем callback для обновления состояния
        this.onChangeStoreCallback = () => {
          // При обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // Если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(this.state, newState)) {
            this.setProps({ ...newState });
            this.state = newState; // Обновляем состояние
          }
        };

        // Подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
