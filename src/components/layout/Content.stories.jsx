import React from "react";
import Component from "./Content";

export default {
  title: "Content",
  component: Component,
};
const Template = (args) => <Component {...args} />;
Template.args = {};

const Content = Template.bind({});

export { Content };
