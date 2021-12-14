import { getByRole, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { screen, render, createWithThemeProvider } from "../../../../test-utils";
import TitleField from "../TitleField";

describe("components/create/formFields", () => {
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
  describe("TitleFields", () => {
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
});
