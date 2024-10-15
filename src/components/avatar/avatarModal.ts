import Block from "@/core/Block";
import { InputElement } from "../input-block";
import { Button } from "../button";
import UsersAPI from "@/api/user";

type AvatarModalProps = {
  isFileSelected: boolean;
  isModalShown: boolean;
  onClose: (e: Event) => void;
};

type AvatarModalChildren = {
  InputElement: InputElement;
  SubmitButton: Button;
  CloseButton: Button;
};

const usersApi = new UsersAPI();

class AvatarModal extends Block<AvatarModalProps, AvatarModalChildren> {
  constructor(props: AvatarModalProps) {
    super({
      ...props,
      InputElement: new InputElement({
        name: "inputButton",
        type: "file",
        id: "inputAvatarButton",
        placeholder: "Выберите файл на компьютере",
      }),
      CloseButton: new Button({
        type: "button",
        button_text: "x",
        events: {
          click: props.onClose,
        },
      }),
      SubmitButton: new Button({
        type: "submit",
        button_text: "Поменять",
        events: {
          click: () => this.handleChangeAvatar(),
        },
      }),
      isFileSelected: false,
      isModalShown: true,
    });
  }

  async handleChangeAvatar() {
    const inputElement =
      this.children.InputElement.getContent() as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0]; // Получаем файл
      const formData = new FormData();
      formData.append("avatar", file); // Добавляем файл в FormData

      try {
        const response = await usersApi.changeAvatar(formData); // Отправляем форму
        console.log(response); // Логируем ответ
      } catch (error) {
        console.error("Ошибка при загрузке аватара:", error);
      }
    } else {
      console.error("Файл не выбран"); // Логируем, если файл не выбран
    }
  }

  render(): string {
    return `<div class="avatar">
               <div class="avatar-modal">
                  <div class="transparent"></div>
                  <div class="content">
                     <div class="closeButton">
                        {{{CloseButton}}}
                     </div>
                     <p>Загрузите файл</p>
                     {{{InputElement}}}
                     {{{SubmitButton}}}
                  </div>
               </div>
            </div>`;
  }
}

export default AvatarModal;
