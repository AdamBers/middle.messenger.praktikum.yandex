import Block from "@/core/Block";
import { connect } from "@/utils/connect";
import { InputElement } from "../input-block";
import { IncomingMessage } from "../incoming-message";
import { OutgoingMessage } from "../outgoing-message";
import { Button } from "../button";
import { sendMessage } from "@/websocket/websocket";
import { MessageDTO } from "@/api/types";

type ChatMessagesProps = {
  messages: MessageDTO[];
  userId: number;
  chatTitle: string;
  renderedMessages?: string;
};

type ChatMessagesChildren = {
  InputMessage: InputElement;
  InputFile: InputElement;
  Button: Button;
};

class ChatMessages extends Block<ChatMessagesProps, ChatMessagesChildren> {
  constructor(props: ChatMessagesProps) {
    super({
      ...props,
      InputMessage: new InputElement({
        type: "text",
        placeholder: "Сообщение",
        name: "message",
        id: "message",
      }),
      InputFile: new InputElement({
        type: "file",
        placeholder: "",
        name: "add_file",
        id: "file",
      }),
      Button: new Button({
        type: "submit",
        events: {
          click: (e: Event) => this.handleSubmit(e),
        },
      }),
      renderedMessages: "",
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const inputElement = this.children.InputMessage.getContent() as HTMLInputElement;
    if (!inputElement?.value) {
      console.log("Поле ввода не должно быть пустым");
    } else {
      sendMessage(inputElement.value);
      inputElement.value = ''; // Очищаем поле после отправки
    }
  }

  togglePopupMenu() {
    const popupMenu = this.getContent().querySelector("#popup-menu") as HTMLElement;

    if (popupMenu) {
      popupMenu.classList.toggle("hidden");
    }

    console.log(popupMenu.classList);
  }

  handleAddUser() {
    console.log("Добавить пользователя");
    // Логика для добавления пользователя
  }

  handleRemoveUser() {
    console.log("Удалить пользователя");
    // Логика для удаления пользователя
  }

  renderMessages() {
    const { messages, userId } = this.props;

    if (!messages || messages.length === 0) {
      return "<p>Нет сообщений</p>";
    }

    return messages
      .slice()
      .reverse()
      .map((message) => {
        if (message.user_id === userId) {
          return new OutgoingMessage({
            message: message.content,
          }).render();
        } else {
          return new IncomingMessage({
            message: message.content,
          }).render();
        }
      })
      .join("");
  }

  componentDidMount(): void {
    // Навешиваем события при первом монтировании
    const trippleDots = this.getContent().querySelector("#tripple-dots") as HTMLElement;
    if (trippleDots) {
      trippleDots.addEventListener("click", () => this.togglePopupMenu());
    }

    const addUserButton = this.getContent().querySelector(".add-user") as HTMLElement;
    if (addUserButton) {
      addUserButton.addEventListener("click", () => this.handleAddUser());
    }

    const removeUserButton = this.getContent().querySelector(".remove-user") as HTMLElement;
    if (removeUserButton) {
      removeUserButton.addEventListener("click", () => this.handleRemoveUser());
    }
  }

  componentDidUpdate(oldProps: ChatMessagesProps, newProps: ChatMessagesProps): boolean {
    if (oldProps.messages !== newProps.messages) {
      const renderedMessages = this.renderMessages();

      this.setProps({
        renderedMessages,
      });

      return true;
    }

    return false;
  }

  render(): string {
    if (!this.props.chatTitle) {
      return `
        <div class="chat-messages">
          <p class="choose-chat">Выберите чат...</p>
        </div>
      `;
    }

    return `
      <div class="chat-messages">
        <div class="user">
          <div class="user-info">
            <div class="user-avatar"></div>
            <span>${this.props.chatTitle}</span>
          </div>
          <span class="tripple-dots" id="tripple-dots"></span>
          <div class="popup-menu hidden" id="popup-menu">
            <button class="add-user">Добавить пользователя</button>
            <button class="remove-user">Удалить пользователя</button>
          </div>
        </div>
        <div class="content">
          <div class="messages">
            {{{renderedMessages}}}
          </div>
        </div>
        <form>
          <div class="messages-sending">
            <div class="attach-button">
              {{{InputFile}}}
            </div>
            {{{InputMessage}}}
            <div class="send-button">
              {{{Button}}}
            </div>
          </div>
        </form>
      </div>
    `;
  }
}

const mapStateToProps = (state: any) => ({
  messages: state.messages,
  userId: state.userId,
  chatTitle: state.chatTitle,
});

export default connect(mapStateToProps)(ChatMessages);
