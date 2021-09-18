import React from "react";
import Component from "./Sidebar";

export default {
  title: "Layout/sidebar",
  component: Component,
};
const Template = (args) => <Component {...args} />;
Template.args = {};

const Sidebar = Template.bind({});

export { Sidebar };
