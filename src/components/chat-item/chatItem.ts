import Block from "../../core/Block";

type ChatItemProps = {};

class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super({ ...props });
  }

  render(): string {
    return `<div class="chat-item {{#if selectedChat}} chat-item__selectedChat{{/if}}">
               <div class="chat-item__avatar chat-item__block {{#if current}} chat-item__block--current{{/if}}">
                  {{#if avatar}}
                     <div>
                        <img class="chat-item__avatar-img" src={{ avatar }} alt={{ alt }}><img>
                     </div>
                  {{else }}
                     <div class="chat-item__avatar-empty"></div>
                  {{/if}}
               </div>
               <div class="chat-item__message">
                  <div class="user-name">
                     <span>{{userName}}</span>
                  </div>
                  <div class="user-message">
                     <span class="chat-item__message-text">
                        {{ message }}
                     </span>
                  </div>
               </div>

               <div class="chat-item__info">
                  <div class="send-time">
                     {{sendTime}}
                  </div>
                  {{#if unread}}
                     <div class="unread">
                        {{unread}}
                     </div>
                  {{/if}}
               </div>
            </div>`;
  }
}

export default ChatItem;
