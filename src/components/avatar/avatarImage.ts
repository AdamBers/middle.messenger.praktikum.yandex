import Block from "@/core/Block";
import { connect } from "@/utils/connect"; // путь к твоей функции connect

type AvatarImageProps = { avatar?: string };
type AvatarImageChildren = {};

class AvatarImage extends Block<AvatarImageProps, AvatarImageChildren> {
  constructor(props: AvatarImageProps) {
    super({ ...props });
  }

  render(): string {
    console.log(this.props.avatar);
    const avatar = this.props.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` // Полный путь к изображению
      : "/static/img/default-avatar.png"; // Заглушка, если аватар отсутствует

    return `
      <div class="avatar">
        <img src="${avatar}" alt="User Avatar" class="avatar__image" />
      </div>`;
  }
}

const mapStateToProps = (state: any) => ({
  avatar: state.user?.avatar,
});

export default connect(mapStateToProps)(AvatarImage);
