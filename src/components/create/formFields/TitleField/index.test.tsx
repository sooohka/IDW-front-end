import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { createWithThemeProvider, render, screen } from "../../../../test/test-utils";
import TitleField from ".";

describe("components/create/formFields/titleField", () => {
  let EL: ReactElement;
  let name: keyof CreateFormValues;
  let error: string | undefined;
  let touched: boolean | undefined;
  let handleBlur: any;
  let handleChange: any;
  let value: any;

  beforeEach(() => {
    name = "title";
    error = undefined;
    touched = undefined;
    handleBlur = jest.fn();
    handleChange = jest.fn();
    value = "";
    EL = (
      <TitleField
        error={error}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
        value={value}
        name={name}
      />
    );
  });
  it("renders", () => {
    const component = createWithThemeProvider(EL);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("focus on render", () => {
    render(EL);
    const title = screen.getByRole("textbox");
    expect(title).toHaveFocus();
  });

  it("type something", () => {
    render(EL);
    const title = screen.getByRole("textbox");
    userEvent.type(title, "yolo");
    expect(handleChange).toBeCalledTimes(4);
  });
});
