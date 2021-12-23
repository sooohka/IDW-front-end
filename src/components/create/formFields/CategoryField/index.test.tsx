/* eslint-disable @typescript-eslint/no-explicit-any */
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import categories from "../../../../assets/temp/categories.json";
import { createWithThemeProvider, render, screen } from "../../../../__test__/test-utils";
import CategoryField from ".";

describe("components/create/formFields/categoryField", () => {
  let handleCategoryChange: any;
  let setFieldValue: any;
  let name: keyof CreateFormValues;
  let EL: ReactElement;

  beforeEach(() => {
    setFieldValue = jest.fn();
    handleCategoryChange = jest.fn((a, b) => () => setFieldValue(a, b));
    name = "category";
    EL = (
      <CategoryField
        name={name}
        categories={categories.data}
        curValue={1}
        handleCategoryChange={handleCategoryChange}
      />
    );
  });

  it("renders", () => {
    const component = createWithThemeProvider(EL);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("Radio button click", () => {
    render(EL);

    const radioBtn = screen.getByLabelText(categories.data[1].name);
    userEvent.click(radioBtn);
    expect(handleCategoryChange).toBeCalledTimes(categories.data.length);
    expect(setFieldValue).toBeCalledWith(name, categories.data[1].id);
    expect(setFieldValue).toBeCalledTimes(1);
  });

  it("Radio button focus and space", () => {
    render(EL);

    const radioBtn = screen.getByLabelText(categories.data[2].name);
    radioBtn.focus();
    userEvent.keyboard("{space}");
    expect(handleCategoryChange).toBeCalledTimes(categories.data.length);
    expect(setFieldValue).toBeCalledWith(name, categories.data[2].id);
    expect(setFieldValue).toBeCalledTimes(1);
  });
});
