import React from "react";
import Component from "./Content";

export default {
  title: "Layout/content",
  component: Component,
};
const Template = (args) => <Component {...args} />;
Template.args = {};

const Content = Template.bind({});

export { Content };
