import { expect } from "chai";
import Button from "./button";

describe("Button Component", () => {
  it("should render button with correct text and type", () => {
    const buttonText = "Click me";
    const buttonType = "submit";

    const button = new Button({
      button_text: buttonText,
      type: buttonType,
    });

    const element = button.getContent() as HTMLButtonElement;
    expect(element.tagName).to.equal("BUTTON");
    expect(element.textContent?.trim()).to.equal(buttonText);
    expect(element.getAttribute("type")).to.equal(buttonType);
  });

  it("should call click event handler on button click", () => {
    let clicked = false;

    const clickHandler = () => {
      clicked = true;
    };

    const button = new Button({
      button_text: "Click me",
      events: { click: clickHandler },
    });

    const element = button.getContent() as HTMLButtonElement;

    // Триггерим событие клика
    element.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));

    expect(clicked).to.be.true;
  });

  it("should re-render with new text", () => {
    const button = new Button({
      button_text: "Click me",
    });

    const element = button.getContent() as HTMLButtonElement;

    // Проверяем начальный текст
    expect(element.textContent?.trim()).to.equal("Click me");

    // Обновляем текст кнопки
    button.setProps({ button_text: "Updated" });
    const updatedElement = button.getContent() as HTMLButtonElement;
    // Проверяем, что текст обновился
    expect(updatedElement.textContent?.trim()).to.equal("Updated");
  });
});
