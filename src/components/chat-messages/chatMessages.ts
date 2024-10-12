import Block from "@/core/Block";
import { connect } from "@/utils/connect";
import { InputElement } from "../input-block";
import { IncomingMessage } from "../incoming-message";
import { OutgoingMessage } from "../outgoing-message";
import { Button } from "../button";
import { sendMessage } from "@/websocket/websocket";
import { TrippleDots } from "@/components/tripple-dots";
// import { MessageDTO } from "@/api/types";

type ChatMessagesProps = {
  messages: any;
  userId: number;
  chatTitle: string;
  renderedMessages?: string;
};

type ChatMessagesChildren = {
  InputMessage: InputElement;
  InputFile: InputElement;
  Button: Button;
  TrippleDots: TrippleDots;
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
      TrippleDots: new TrippleDots({
        isPopupHidden: true,
        events: {
          click: (e: Event) => this.handleHide(e),
        },
      }),
      renderedMessages: "",
    });
  }

  handleHide(e: Event) {
    e.stopPropagation();
    this.children.TrippleDots.setProps({
      isPopupHidden: !this.children.TrippleDots.props.isPopupHidden,
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const inputElement =
      this.children.InputMessage.getContent() as HTMLInputElement;
    if (!inputElement?.value) {
      console.log("Поле ввода не должно быть пустым");
    } else {
      sendMessage(inputElement.value);
      inputElement.value = ""; // Очищаем поле после отправки
    }
  }

  renderMessages() {
    const { messages, userId } = this.props;

    if (!messages || messages.length === 0) {
      return "<p>Нет сообщений</p>";
    }

    return messages
      .slice()
      .reverse()
      .map((message: any) => {
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

  componentDidUpdate(
    oldProps: ChatMessagesProps,
    newProps: ChatMessagesProps
  ): boolean {
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
          {{{TrippleDots}}}
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
