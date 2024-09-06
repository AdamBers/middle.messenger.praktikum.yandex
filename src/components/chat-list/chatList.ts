import Block from "@/core/Block";
import { ChatItem } from "../chat-item";

type ChatListProps = {};

class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({
      ...props,
      chat1: new ChatItem({
        id: 1,
        userName: "Alex",
        message: "Hello!",
        sendTime: "12:30",
        unread: "3",
      }),
      chat2: new ChatItem({
        id: 2,
        userName: "Bob",
        message: "Hello!",
        sendTime: "12:30",
        unread: "",
      }),
      chat3: new ChatItem({
        id: 3,
        userName: "Charlie",
        message: "Hello!",
        sendTime: "12:30",
        unread: "",
      }),
      chat4: new ChatItem({
        id: 4,
        userName: "Dave",
        message: "Hello!",
        sendTime: "12:30",
        unread: "1",
      }),
      chat5: new ChatItem({
        id: 5,
        userName: "Grace",
        message: "Hello!",
        sendTime: "12:30",
        unread: "",
      }),
    });
  }
  render(): string {
    return `
     <div class="chat-list">
         {{{chat1}}}
         {{{chat2}}}
         {{{chat3}}}
         {{{chat4}}}
         {{{chat5}}}
      </div>
     `;
  }
}

export default ChatList;
