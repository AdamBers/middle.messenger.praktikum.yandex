import Block from "@/core/Block";
import AvatarImage from "./avatarImage";
import AvatarModal from "./avatarModal";
import AuthApi from "@/api/auth";

type AvatarProps = { isFormOpened: boolean; events: {}; user: {} };
type AvatarChildren = { AvatarImage: any; AvatarModal: AvatarModal };

const authApi = new AuthApi();
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
      user: {},
    });
  }

  async handleShowModal(e: Event) {
    console.log(e.target);
    e.preventDefault();
    e.stopPropagation();
    this.setProps({ isFormOpened: !this.props.isFormOpened });
    if (!this.props.isFormOpened) {
      const res = await authApi.me();
      if ("data" in res) {
        this.children.AvatarImage.setProps({ avatar: res.data.avatar });
      }
    }
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
