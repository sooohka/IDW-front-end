import React from "react";
import Component from "./Card";

export default {
  title: "Card",
  component: Component,
};
const Template = (args) => <Component {...args} />;
Template.args = {};

const Card = Template.bind({});

export { Card };
