import Block from "@/core/Block";
import { ChatItem } from "../chat-item";
import { LoadChats } from "@/services/LoadChats"; // Импортируем новую функцию
import { connect } from "@/utils/connect";
import { ChatDTO } from "@/api/type";

type ChatListProps = {
  chats?: ChatDTO[]; // Массив чатов
};

type ChatListChildren = {
  chatItems?: ChatItem[]; // Массив компонентов ChatItem
};

class ChatList extends Block<ChatListProps, ChatListChildren> {
  constructor(props: ChatListProps = {}) {
    super(props);
  }

  componentDidMount(): void {
    LoadChats(); // Загружаем чаты при монтировании компонента
  }

  componentDidUpdate(
    oldProps: ChatListProps,
    newProps: ChatListProps
  ): boolean {
    if (oldProps.chats !== newProps.chats) {
      const chatItems =
        newProps.chats?.map((chat: ChatDTO) => {
          return new ChatItem({
            userName: chat.title,
            message: chat.last_message ? chat.last_message.content : "",
            sendTime: chat.last_message ? chat.last_message.time : "",
            unread: chat.unread_count ? String(chat.unread_count) : "",
            avatar: chat.avatar || "",
            alt: chat.title || "",
          });
        }) || [];

      this.children.chatItems = chatItems;
      this.setProps({ chatItems }); // Устанавливаем обновленные дочерние элементы
      return true;
    }

    return false;
  }

  render(): string {
    return `
      <div class="chat-list">
        {{#each chatItems}}
          {{{this}}}
        {{/each}}
      </div>
    `;
  }
}

export default connect((state) => ({
  chats: state.chats, // Получаем чаты из состояния
}))(ChatList);
