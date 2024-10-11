import Block from "@/core/Block";
import { InputBlock } from "../input-block";
import UsersAPI from "@/api/user";
import { Button } from "../button";
import ChatsAPI from "@/api/chats";
import { LoadChats } from "@/services/LoadChats";

type ModalProps = {
  showModal: boolean;
  buttonText?: string;
  events?: {};
};

type ModalChildren = {
  SearchBar: InputBlock;
  SearchButton: Button;
  CloseButton: Button;
};

const usersApi = new UsersAPI();
const chatsApi = new ChatsAPI();

class Modal extends Block<ModalProps, ModalChildren> {
  constructor(props: ModalProps) {
    super({
      ...props,
      CloseButton: new Button({
        type: "button",
        button_text: "x",
        events: {
          click: (e: Event) => this.handleCloseModal(e),
        },
      }),
      SearchBar: new InputBlock({
        name: "searchLogin",
        type: "text",
        label_for: "searchLogin",
        label_text: "Введите...",
        label: "searchLogin",
      }),
      SearchButton: new Button({
        type: "submit",
        button_text: props.buttonText,
        events: {
          click: (e: Event) => this.handleSubmit(e),
        },
      }),
    });
    console.log(props);
  }

  async handleSubmit(e: Event) {
    console.log(e);
    if (this.children.SearchButton.props.button_text === "Добавить") {
      let errorText = "";
      const inputElement =
        this.children.SearchBar.children.InputField.getContent() as HTMLInputElement;

      if (inputElement?.value) {
        const userInfo = await usersApi.searchUser(inputElement?.value);
        const userIds = userInfo?.data?.map((item: any) => item.id);
        const currentChatId = window.store.getState().selectedChat;
        if (userIds?.length) {
          if (userIds?.length > 0 && currentChatId) {
            const Adduser = await chatsApi.addUserToChat(
              userIds,
              currentChatId
            );
            console.log(Adduser);
            if (Adduser.status !== 200) {
              errorText = "Ошибка";
            } else {
              errorText = "Успешно";
            }
          }
        }

        if (userIds?.length > 0) {
          errorText = "Успешно";
        } else {
          errorText = "Ошибка";
        }
        this.children.SearchBar.children.ErrorLine.setProps({
          errorText: errorText,
        });
      }
    }

    if (this.children.SearchButton.props.button_text === "Удалить") {
      let errorText = "";
      const inputElement =
        this.children.SearchBar.children.InputField.getContent() as HTMLInputElement;

      if (inputElement?.value) {
        const userInfo = await usersApi.searchUser(inputElement?.value);
        const userIds = userInfo?.data?.map((item: any) => item.id);
        const currentChatId = window.store.getState().selectedChat;
        if (userIds?.length) {
          if (userIds?.length > 0 && currentChatId) {
            const DeleteUser = await chatsApi.DeleteUserFromChat(
              userIds,
              currentChatId
            );
            console.log(DeleteUser);
            if (DeleteUser.status !== 200) {
              errorText = "Ошибка";
            } else {
              errorText = "Успешно";
            }
          }
        }

        if (userIds?.length > 0) {
          errorText = "Успешно";
        } else {
          errorText = "Ошибка";
        }
        this.children.SearchBar.children.ErrorLine.setProps({
          errorText: errorText,
        });
      }
    }

    if (this.props.buttonText === "Добавить чат") {
      const InputChatElement =
        this.children.SearchBar.children.InputField.getContent() as HTMLInputElement;
      const InputChatElementValue = InputChatElement?.value;
      const addChatRequest = await chatsApi.createChat(InputChatElementValue);
      if (addChatRequest.status === 200) {
        this.children.SearchBar.children.ErrorLine.setProps({
          error: "чат добавлен",
        });
        LoadChats();
        this.setProps({ showModal: false });
      } else {
        this.children.SearchBar.children.ErrorLine.setProps({
          error: "Не удалось добавить чат",
        });
      }
    }
  }

  handleCloseModal(e: Event) {
    console.log(this);
    console.log("close button click");
    e.stopPropagation();
    this.setProps({ showModal: false });
  }

  render(): string {
    if (this.props.showModal) {
      return `
      <div class="modal">
         {{{CloseButton}}}
         {{{SearchBar}}}
         {{{SearchButton}}}
      </div>`;
    }
    return `<div></div>`;
  }
}

export default Modal;
