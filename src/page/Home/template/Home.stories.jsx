import React from "react";
import Component from "./index";

export default {
  title: "Wrapper",
  component: Component,
};
const Template = (args) => <Component {...args} />;
Template.args = {};

const Home = Template.bind({});

export { Home };
