import Block from "@/core/Block";

type AvatarImageProps = {};
type AvatarImageChildren = {};
class AvatarImage extends Block<AvatarImageProps, AvatarImageChildren> {
  constructor(props: AvatarImageProps) {
    super({ ...props });
  }
  render(): string {
    return `<div class="avatar">

      
            </div>`;
  }
}

export default AvatarImage;
