import Block from "../../core/Block";
import { ChatList, ChatMessages } from "../../components";

class ChatPage extends Block {
  constructor(props) {
    super({
      ...props,
      activeChatId: null,
      ChatList: new ChatList({}),
      ChatMessages: new ChatMessages({}),
    });
  }

  setActiveChat(chatId) {
    this.setProps({ activeChatId: chatId });
  }
  render() {
    return `<div class="chat-container">
               {{{ChatList}}}
               {{{ChatMessages}}}
            </div>`;
  }
}
export default ChatPage;
