// import { Store } from "@/core/Store";// Предположим, у тебя есть файл с глобальным store

let socket: WebSocket | null = null;

// Объявим переменную для хранения идентификатора интервала
let pingInterval: NodeJS.Timeout | null = null;

export function connectWebSocket() {
  return new Promise<WebSocket>((resolve, reject) => {
    const currentUser = window.store.state.userId; // Извлекаем userId из store
    const currentChat = window.store.state.selectedChat; // Извлекаем выбранный чат
    const currentToken = window.store.state.wsToken; // Токен должен быть уже в store

    if (!currentUser || !currentChat || !currentToken) {
      console.log("Недостаточно данных для установки WebSocket-соединения");
      return;
    }

    socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${currentUser}/${currentChat}/${currentToken}`
    );

    socket.addEventListener("open", () => {
      console.log("Соединение установлено");

      // Отправляем ping с интервалом, например, каждые 30 секунд
      pingInterval = setInterval(() => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
          console.log("Ping отправлен");
        }
      }, 30000); // Интервал в миллисекундах (30 секунд)
      resolve(socket);
    });

    socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);

      // Очищаем интервал, если соединение закрыто
      if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
      }
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === "pong") {
        console.log("Pong получен от сервера");
      } else if (data.type === "message") {
        // Выводим сообщения
        console.log("Новое сообщение: ", data);
        const currentMessages = window.store.getState().messages || [];
        window.store.set({
          messages: [data, ...currentMessages], // Добавляем полученное сообщение
        });
      } else if (data.type === "get old") {
        // Логируем старые сообщения
        console.log("get old: ", data.messages);
        // Сохраняем старые сообщения в store
      } else if (Array.isArray(data)) {
        window.store.set({ messages: data });
      } else {
        console.log("Получены данные", data);
      }
    });

    socket.addEventListener("error", (event) => {
      console.log("Ошибка", event);
    });

    return socket;
  });
}

export function getWebSocket() {
  return socket;
}

export function sendMessage(content: string) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        content,
        type: "message",
      })
    );
  } else {
    console.log("WebSocket-соединение не установлено");
  }
}

export function getOldMessages(offset: string = "0") {
  if (!socket) {
    console.log("WebSocket-соединение не инициализировано");
  } else if (socket.readyState !== WebSocket.OPEN) {
    console.log(
      "WebSocket-соединение не готово для отправки сообщений. Текущий статус:",
      socket.readyState
    );
  }

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        content: String(offset), // передаем offset для пагинации
        type: "get old",
      })
    );
    // console.log(1);
  } else {
    console.log("WebSocket-соединение не установлено");
  }
}
