import React from "react";
import Component from "./index";

export default {
  title: "pages/Home",
  component: Component,
};
const Template = (args) => <Component {...args} />;
Template.args = {};

const Home = Template.bind({});

Home.args = {};

export { Home };