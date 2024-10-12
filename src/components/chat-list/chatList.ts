import Block from "@/core/Block";
import ChatsAPI from "@/api/chats";
import { Link } from "@/components/link";
import { getOldMessages } from "@/websocket/websocket";
import { connectWebSocket } from "@/websocket/websocket";
import { ChatItem } from "../chat-item";
import { AddChat } from "../add-chat";
import { connect } from "@/utils/connect";

import { ChatDTO } from "@/api/type";

type ChatListProps = {
  chats?: ChatDTO[];
  selectedChatId?: number | null;
  chatItems?: ChatItem[];
};

type ChatListChildren = any;
// const authApi = new AuthApi();
const chatsAPI = new ChatsAPI();

class ChatList extends Block<ChatListProps, ChatListChildren> {
  constructor(props: ChatListProps) {
    super({
      ...props,
      ProfileLink: new Link({
        url: "/settings",
        page: "settings",
        text: "Профиль  >",
      }),
      AddChat: new AddChat({}),
    });
  }

  componentDidMount(): void {}

  async onChatSelect(id: number, title: string) {
    // Сохраняем выбранный чат в глобальном store
    window.store.set({ selectedChat: id });
    window.store.set({ chatTitle: title });
    const requestToken = await chatsAPI.getToken(id);
    const currentToken = requestToken.data?.token;
    window.store.set({ wsToken: currentToken });
    await connectWebSocket();
    getOldMessages("0");
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
            onChatSelect: () => this.onChatSelect(chat.id, chat.title), // Колбэк для выбора чата
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
      {{{AddChat}}}
      {{{ProfileLink}}} 
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
  selectedChatId: state.selectedChat,
  userId: state.userId, // Получаем выбранный чат из store
}))(ChatList);
