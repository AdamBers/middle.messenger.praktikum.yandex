import Block from "../../core/Block";
import { ChatList, ChatMessages } from "../../components";

type ChatPageProps = {
  activeChatId: number | null;
};
type ChatPageChildren = {
  ChatList: ChatList;
  ChatMessages: ChatMessages;
};
class ChatPage extends Block<ChatPageProps, ChatPageChildren> {
  constructor(props: ChatPageProps) {
    super({
      ...props,
      activeChatId: null,
      ChatList: new ChatList({}),
      ChatMessages: new ChatMessages({}),
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
