import Block from "@/core/Block";
import { Button } from "../button";
import { Modal } from "../modal";

type TrippleDotsProps = {
  isPopupHidden: boolean;
  events: {};
};

type TrippleDotsChildren = {
  AddUser: Button;
  RemoveUser: Button;
  Modal: Modal;
};

class TrippleDots extends Block<TrippleDotsProps, TrippleDotsChildren> {
  constructor(props: TrippleDotsProps) {
    super({
      ...props,
      AddUser: new Button({
        button_text: "Добавить пользователя",
        events: {
          click: (e: Event) => this.handleAddUser(e),
        },
      }),
      RemoveUser: new Button({
        button_text: "Удалить пользователя",
        events: {
          click: (e: Event) => this.handleRemoveUser(e),
        },
      }),
      Modal: new Modal({
        showModal: false,
        buttonText: "",
        events: {
          click: (e: Event) => e.stopPropagation(),
        },
      }),
    });
  }
  handleAddUser(e: Event) {
    console.log("add click");
    e.stopPropagation();
    this.children.Modal.setProps({ showModal: true });
    this.children.Modal.children.SearchButton.setProps({
      button_text: "Добавить",
    });
  }
  handleRemoveUser(e: Event) {
    console.log("remove click");
    e.stopPropagation();
    this.children.Modal.setProps({ showModal: true });
    this.children.Modal.children.SearchButton.setProps({
      button_text: "Удалить",
    });
  }
  render(): string {
    return `
      <div class="tripple-dots">
        <div class="popup-menu{{#if isPopupHidden}} hidden{{/if}}">
          {{{AddUser}}}
          {{{RemoveUser}}}
          {{{Modal}}}
        </div>
      </div>
   `;
  }
}

export default TrippleDots;
