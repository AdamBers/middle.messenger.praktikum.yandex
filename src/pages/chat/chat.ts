import Block from "../../core/Block";
import { ChatList, ChatMessages } from "../../components";

interface IChatPage {}
class ChatPage extends Block<IChatPage> {
  constructor(props: IChatPage) {
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
