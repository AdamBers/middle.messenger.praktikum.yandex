import Block from "@/core/Block";

type OutgoingMessageProps = {
  message: string; // Поле для сообщения
};

export default class OutgoingMessage extends Block<OutgoingMessageProps> {
  constructor(props: OutgoingMessageProps) {
    super(props);
  }

  render(): string {
    return `
      <div class="message outgoing-message">
        <p>${this.props.message}</p> 
      </div>
    `;
  }
}
