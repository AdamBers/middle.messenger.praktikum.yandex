import Block from "@/core/Block";
class OutgoingMessage extends Block {
  render(): string {
    return `
         <div class="message outgoing-message">
            <p>{{message}}</p>
         </div>
      `;
  }
}

export default OutgoingMessage;
