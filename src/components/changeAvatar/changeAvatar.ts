import Block from "@/core/Block";

type ChangeAvatarProps = {};

type ChangeAvatarChildren = {};
class ChangeAvatar extends Block<ChangeAvatarProps, ChangeAvatarChildren> {
  constructor(props: ChangeAvatarProps) {
    super({ ...props });
  }
  render(): string {
    return `<div>
               <p>ChangeAvatar</p>
            </div>`;
  }
}
