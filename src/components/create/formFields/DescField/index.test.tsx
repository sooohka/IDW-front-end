import userEvent from "@testing-library/user-event";
import { createWithThemeProvider, render, screen } from "../../../../__test__/test-utils";
import DescField from ".";

describe("components/create/formFields/DescFields", () => {
  let name: keyof CreateFormValues;
  let error: string | undefined;
  let touched: boolean | undefined;
  let handleBlur: any;
  let handleChange: any;
  let value: any;
  let EL: any;

  beforeEach(() => {
    name = "desc";
    error = undefined;
    touched = undefined;
    handleBlur = jest.fn();
    handleChange = jest.fn();
    value = "";
    EL = (
      <DescField
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

  it("type something", () => {
    render(EL);
    const textField = screen.getByRole("textbox");
    userEvent.type(textField, "hello");
    expect(handleChange).toBeCalledTimes(5);
  });
});
