import Block from "@/core/Block";
// import { InputBlock } from "../input-block";
import AvatarImage from "./avatarImage";
import AvatarModal from "./avatarModal";

type AvatarProps = { isFormOpened: boolean; events: {} };
type AvatarChildren = { AvatarImage: AvatarImage; AvatarModal: AvatarModal };

class Avatar extends Block<AvatarProps, AvatarChildren> {
  constructor(props: AvatarProps) {
    super({
      ...props,
      AvatarImage: new AvatarImage({
        events: {
          click: (e: Event) => this.handleShowModal(e),
        },
      }),
      AvatarModal: new AvatarModal({
        isFileSelected: false,
        isModalShown: false,
        onClose: (e: Event) => this.handleShowModal(e),
      }),
      isFormOpened: false,
    });
  }

  handleShowModal(e: Event) {
    console.log(e.target);
    e.preventDefault();
    e.stopPropagation();
    this.setProps({ isFormOpened: !this.props.isFormOpened });
  }
  render(): string {
    return `<div class="avatar_container">
              {{{AvatarImage}}}
              {{#if isFormOpened}}
                {{{AvatarModal}}}
              {{/if}}
            </div>`;
  }
}

export default Avatar;

// <label for="avatar">
//               {{#if avatar}}
//                 {{!-- <img class="profile__avatar" src="{{ avatar }}" alt="avatar" /> --}}
//               {{else }}
//                 <div class="profile__avatar-empty">
//                   {{!-- <img class="profile__avatar" src="/static/img/empty-profile.png" alt="avatar" /> --}}
//                 </div>
//               {{/if}}
//             </label>
//             <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" class="avatar_input">
