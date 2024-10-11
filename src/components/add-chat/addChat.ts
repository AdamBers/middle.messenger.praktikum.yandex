import Block from "@/core/Block";
import { Button } from "../button";
import { Modal } from "../modal";

type AddChatProps = {};
type AddChatChildren = { AddChatButton: Button; AddChatModal: Modal };

class AddChat extends Block<AddChatProps, AddChatChildren> {
  constructor(props: AddChatProps) {
    super({
      ...props,
      AddChatButton: new Button({
        button_text: "Добавить чат",
        type: "button",
        events: {
          click: () => this.handleAddClick(),
        },
      }),
      AddChatModal: new Modal({
        showModal: false,
        buttonText: "Добавить чат",
      }),
    });
  }
  handleAddClick() {
    console.log("click");
    const isModalShown = this.children.AddChatModal.props.showModal;
    this.children.AddChatModal.setProps({ showModal: !isModalShown });
  }
  render(): string {
    return `
      <div class="add-chat">
         {{{AddChatButton}}}
         {{{AddChatModal}}}
      </div>
      `;
  }
}

export default AddChat;
