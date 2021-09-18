import React from "react";
import N from "./Navbar";

export default {
  title: "Layout/navbar",
  component: N,
};

const Template = (args) => <N {...args} />;
const Navbar = Template.bind({});
Navbar.args = {};

export { Navbar };
