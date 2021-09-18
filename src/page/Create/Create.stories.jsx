import React from "react";
import Component from "./index";

export default {
  title: "pages/Create",
  component: Component,
};

const Template = (args) => <Component {...args} />;

const Create = Template.bind({});
Create.args = {
  categories: [{ id: 1, name: "연예인" }],
};

export { Create };
