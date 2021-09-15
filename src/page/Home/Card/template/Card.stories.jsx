import React from "react";
import Component from "./index";

export default {
  title: "Card",
  component: Component,
  argTypes: {
    title: { control: "text" },
    desc: { control: "text" },
    numberOfComments: {
      control: "number",
    },
    numberOfLikes: {
      control: "number",
    },
  },
};

const Template = (args) => <Component {...args} />;

const Card = Template.bind({});

Card.args = {
  title: "title",
  desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit alias, quisquam aspernatur iusto officia magni.",
  img: {
    src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    alt: "이쁜여자",
  },
  numberOfComments: 152,
  numberOfLikes: 1245,
  handlePlayBtnClick: () => {},
};

export { Card };
