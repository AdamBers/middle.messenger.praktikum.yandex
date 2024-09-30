import Block from "@/core/Block";
import { ChatItem } from "../chat-item";
import ChatsAPI from "@/api/chats";
import { ChatDTO } from "@/api/type"; // Тип для чатов

type ChatListProps = {
  chats?: ChatDTO[]; // Массив чатов
};

type ChatListChildren = {
  chatItems: ChatItem[]; // Массив компонентов ChatItem
};

class ChatList extends Block<ChatListProps, ChatListChildren> {
  constructor(props: ChatListProps) {
    super(props);
  }

  async componentDidMount() {
    try {
      // Получаем чаты с API
      const response = await new ChatsAPI().getChats();

      if (response.status === 200) {
        const chats = response.data; // Получаем список чатов

        // Преобразуем каждый чат из response в ChatItem и добавляем их как children
        const chatItems = chats.map(
          (chat: ChatDTO) =>
            new ChatItem({
              userName: chat.title,
              message: chat.last_message ? chat.last_message.content : "",
              sendTime: chat.last_message ? chat.last_message.time : "",
              unread: chat.unread_count ? String(chat.unread_count) : "",
              avatar: chat.avatar || "",
              alt: chat.title || "",
            })
        );

        // Обновляем компонент и передаем созданные компоненты ChatItem в children
        this.setProps({ children: chatItems });
        this.children = chatItems
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  render(): string {
    return `
      <div class="chat-list">
        {{{chatItems}}}
      </div>
    `;
  }
}

export default ChatList;
