import Block from "../../core/Block";
import { Input } from "../input-block";
import { IncomingMessage } from "../incoming-message";
import { OutgoingMessage } from "../outgoing-message";
import { Button } from "../button";

class ChatMessages extends Block {
  constructor(props) {
    super({
      ...props,
      IncomingMessage: new IncomingMessage({
        message:
          "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
      }),
      OutgoingMessage: new OutgoingMessage({
        message: "Круто",
      }),
      InputMessage: new Input({ type: "text", placeholder: "Сообщение" }),
      InputFile: new Input({
        type: "file",
        placeholder: "",
        id: "file",
        accept: "image/png, image/jpeg",
      }),
      Button: new Button({
        type: "submit",
        onClick: (e: Event) => this.handleSubmit(e),
      }),
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.children.InputMessage.getContent().value) {
      console.log("Поле не должно быть пустым");
    }
  }
  render(): string {
    return `
         <div class="chat-messages">
            <div class="user">
               <div class="user-info">
                  <div class="user-avatar"></div>
                  <span>Alex</span>
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

export default ChatMessages;
