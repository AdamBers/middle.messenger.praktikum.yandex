import Block from "@/core/Block";

// Определим тип для пропсов компонента
type PageTitleProps = {
  title: string;
};
class PageTitle extends Block<PageTitleProps> {
  render(): string {
    return `
         <h1 class="page-title">
            {{ title }}
         </h1>
      `;
  }
}

export default PageTitle;
