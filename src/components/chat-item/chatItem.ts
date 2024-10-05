import Block from "@/core/Block";

type ChatItemProps = {
  userName: string;
  message: string;
  sendTime: string;
  unread: string;
  avatar: string;
  alt: string;
  id: number; // Идентификатор чата
  selectedChatId: number | null; // Идентификатор выбранного чата
  onChatSelect: (id: number) => void; // Колбэк для выбора чата
};

class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: () => this.props.onChatSelect(this.props.id), // Обработка клика
      },
    });
  }

  render(): string {
    const { selectedChatId, id } = this.props;
    const isSelected = selectedChatId === id ? 'chat-item__selectedChat' : '';

    return `
      <div class="chat-item ${isSelected}">
        <div class="chat-item__avatar chat-item__block">
          {{#if avatar}}
            <div>
              <img class="chat-item__avatar-img" src={{ avatar }} alt={{ alt }}>
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
