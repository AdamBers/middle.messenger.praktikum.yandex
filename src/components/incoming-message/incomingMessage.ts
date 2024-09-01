import Block from "../../core/Block";

class IncomingMessage extends Block {
  constructor(props) {
    super({ ...props });
  }
  render(): string {
    return `
         <div class="message incoming-message">
            <p>{{message}}</p>
         </div>
      `;
  }
}

export default IncomingMessage
