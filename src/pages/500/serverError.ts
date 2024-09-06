import Block from "@/core/Block";
import { PageTitle, Link } from "../../components";


interface IServerErrorPage {}

class ServerErrorPage extends Block<IServerErrorPage> {
  constructor(props: IServerErrorPage) {
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
