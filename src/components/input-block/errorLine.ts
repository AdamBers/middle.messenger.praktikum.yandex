import Block from "@/core/Block";

// type ErrorLineProps = {
//   errorText: string;
// };

class ErrorLine extends Block {
  render(): string {
    return `
         <div class="input__text-error">{{errorText}}</div>
      `;
  }
}

export default ErrorLine;
