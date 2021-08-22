import React from "react";
import Component from "./Wrapper";

export default {
  title: "Wrapper",
  component: Component,
};
const Template = (args) => <Component {...args} />;
Template.args = {};

const Wrapper = Template.bind({});

export { Wrapper };
