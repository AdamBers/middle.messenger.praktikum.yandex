import Block from "@/core/Block";
import { connect } from "@/utils/connect";
import { InputElement } from "../input-block";
import { IncomingMessage } from "../incoming-message";
import { OutgoingMessage } from "../outgoing-message";
import { Button } from "../button";
import { sendMessage } from "@/websocket/websocket";

type ChatMessagesProps = {};
type ChatMessagesChildren = {
  IncomingMessage: IncomingMessage;
  OutgoingMessage: OutgoingMessage;
  InputMessage: InputElement;
  InputFile: InputElement;
  Button: Button;
};
class ChatMessages extends Block<ChatMessagesProps, ChatMessagesChildren> {
  constructor(props: ChatMessagesProps) {
    super({
      ...props,
      IncomingMessage: new IncomingMessage({
        message:
          "Привет! Смотри, тут всплыл интересный кусок лунной космической истории...",
      }),
      OutgoingMessage: new OutgoingMessage({
        message: "Круто",
      }),
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
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const inputElement =
      this.children.InputMessage.getContent() as HTMLInputElement;
    if (!inputElement?.value) {
      console.log("Поле ввода не должно быть пустым");
    } else {
      sendMessage(inputElement?.value);
    }
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
               <span class="tripple-dots"></span>
            </div>
            <div class="content">
               <div class="date">19 июня</div>
               {{{IncomingMessage}}}
               {{{OutgoingMessage}}}
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

// Функция, которая извлекает необходимые данные из store
const mapStateToProps = (state: any) => ({
  chatTitle: state.chatTitle,
});

// Подключаем ChatMessages к store
export default connect(mapStateToProps)(ChatMessages);
