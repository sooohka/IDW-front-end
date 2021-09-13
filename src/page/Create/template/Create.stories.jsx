import React from "react";
import Component from "./index";

export default {
  title: "Create",
  component: Component,
};

const Template = (args) => <Component {...args} />;

Template.args = {};

const Create = Template.bind({});

export { Create };
