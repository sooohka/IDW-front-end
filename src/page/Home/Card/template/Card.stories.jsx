import React from "react";
import Component from "./index";

// Data Type	|Control Type	|Description																							| Options
// boolean		|boolean			|checkbox input																						| -
// number			|number				|a numeric text box input	|min, max, step
// 						|range				|a range slider input	|min, max, step
// object			|object				|json editor text input																		| -
// array			|object				|json editor text input																		| -
// 						|file					|a file input that gives you a array of urls	|accept
// enum				|radio				|radio buttons input																			| -
// 						|inline-radio	|inline radio buttons input																| -
// 						|check				|multi-select checkbox input															| -
// 						|inline-check	|multi-select inline checkbox input												| -
// 						|select				|select dropdown input																		| -
// 						|multi-select	|multi-select dropdown input															| -
// string			|text					|simple text input																				| -
// 						|color				|color picker input that assumes strings are color values	|presetColors
// 						|date					|date picker input

export default {
  title: "pages/Home/components",
  component: Component,
  argTypes: {
    title: { control: "text" },
    desc: { control: "text" },
    commentCounts: {
      control: "number",
    },
    numberOfLikes: {
      control: "number",
    },
    img: { control: "object" },
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
  commentCounts: 152,
  numberOfLikes: 1245,
  handlePlayBtnClick: () => {},
};

export { Card };
