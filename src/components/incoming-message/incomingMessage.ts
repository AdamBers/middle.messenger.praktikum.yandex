import Block from "../../core/Block";

class IncomingMessage extends Block {
  render(): string {
    return `
         <div class="message incoming-message">
            <p>{{message}}</p>
         </div>
      `;
  }
}

export default IncomingMessage;
