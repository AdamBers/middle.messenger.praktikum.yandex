import { PageTitle, Link } from "../../components";
import Block from "../../core/Block";

class ServerErrorPage extends Block {
  constructor(props) {
    super({
      ...props,
      TitleOfPage: new PageTitle({ title: "500" }),
      BackHomeLink: new Link({ url: "/", page: "home", text: "Назад к чатам" }),
    });
  }
  render(): string {
    return `
      <div class="container">
         {{{TitleOfPage}}}
         <h3>Уже исправляем</h3>
         {{{BackHomeLink}}}
      </div>
      `;
  }
}

export default ServerErrorPage;

// {{> Link href="/" text="Назад к чатам" page="/"}}
