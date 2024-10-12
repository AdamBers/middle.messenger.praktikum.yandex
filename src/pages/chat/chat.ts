import Block from "@/core/Block";
import { ChatList, ChatMessages } from "../../components";

type ChatPageProps = {
  // activeChatId: number | null;
};

type ChatPageChildren = {
  // Указываем тип как экземпляр класса ChatMessages
};

class ChatPage extends Block<ChatPageProps, ChatPageChildren> {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      // activeChatId: null,
      ChatList: new ChatList({}), // Передаем экземпляр класса
      ChatMessages: new ChatMessages({}), // Передаем экземпляр класса
    });
  }

  render() {
    return `<div class="chat-container">
               {{{ChatList}}}
               {{{ChatMessages}}}
            </div>`;
  }
}

export default ChatPage;
