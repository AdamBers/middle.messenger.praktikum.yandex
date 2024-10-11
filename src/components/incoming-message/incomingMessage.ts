import Block from "@/core/Block";

type IncomingMessageProps = {
  message: string; // Поле для сообщения
};

export default class IncomingMessage extends Block<IncomingMessageProps> {
  constructor(props: IncomingMessageProps) {
    super(props);
  }

  render(): string {
    return `
      <div class="message incoming-message">
        <p>${this.props.message}</p> <!-- Здесь подставляем сообщение -->
      </div>
    `;
  }
}
