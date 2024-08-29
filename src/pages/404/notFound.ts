import Block from "../../core/Block";
import { PageTitle, Link } from "../../components";

class NotFoundPage extends Block {
  constructor(props) {
    super({
      ...props,
      TitleOfPage: new PageTitle({ title: "Страница не найдена" }),
      BackHomeLink: new Link({ url: "/", page: "home", text: "Назад к чатам" }),
    });
  }
  render(): string {
    return `
      <div class="container">
         {{{TitleOfPage}}}
         <h3>Такой страницы не существует</h3>
         {{{BackHomeLink}}}
      </div>
    `;
  }
}

export default NotFoundPage;
