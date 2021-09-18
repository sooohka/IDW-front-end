import React from "react";
import Component from "./Button";

export default {
  title: "components/Button",
  component: Component,
  argTypes: {
    label: {
      control: "text",
    },
    disabled: { control: "boolean" },
  },
};

const Template = (args) => <Component {...args} />;

const Button = Template.bind({});
Button.args = { label: "button", disabled: false };

const DisabledButton = Template.bind({});
DisabledButton.args = { label: "disabled", disabled: true };

export { Button, DisabledButton };
