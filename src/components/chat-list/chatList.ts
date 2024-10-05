import Block from "@/core/Block";
import { ChatItem } from "../chat-item";
import { LoadChats } from "@/services/LoadChats";
import { connect } from "@/utils/connect";
import { ChatDTO } from "@/api/type";

type ChatListProps = {
  chats?: ChatDTO[];
  selectedChatId?: number | null;
};

type ChatListChildren = {
  chatItems?: ChatItem[];
};

class ChatList extends Block<ChatListProps, ChatListChildren> {
  constructor(props: ChatListProps = {}) {
    super(props);
  }

  componentDidMount(): void {
    LoadChats(); // Загружаем список чатов при монтировании компонента
  }

  onChatSelect(id: number) {
    // Сохраняем выбранный чат в глобальном store
    window.store.set({ selectedChat: id });
  }

  componentDidUpdate(
    oldProps: ChatListProps,
    newProps: ChatListProps
  ): boolean {
    if (
      oldProps.chats !== newProps.chats ||
      oldProps.selectedChatId !== newProps.selectedChatId
    ) {
      const chatItems =
        newProps.chats?.map((chat: ChatDTO) => {
          return new ChatItem({
            userName: chat.title,
            message: chat.last_message ? chat.last_message.content : "",
            sendTime: chat.last_message ? chat.last_message.time : "",
            unread: chat.unread_count ? String(chat.unread_count) : "",
            avatar: chat.avatar || "",
            alt: chat.title || "",
            id: chat.id, // Передаем идентификатор чата
            selectedChatId: newProps.selectedChatId || null, // Передаем идентификатор выбранного чата
            onChatSelect: this.onChatSelect.bind(this), // Колбэк для выбора чата
          });
        }) || [];

      this.children.chatItems = chatItems;
      this.setProps({ chatItems });

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

// Соединение с глобальным состоянием через connect
export default connect((state) => ({
  chats: state.chats, // Получаем список чатов из store
  selectedChatId: state.selectedChat, // Получаем выбранный чат из store
}))(ChatList);
