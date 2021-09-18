import React from "react";
import Component from "./Img";

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
  title: "components/Img",
  component: Component,
  argTypes: {
    width: {
      control: { type: "range", min: 0, max: 500, step: 5 },
    },
    height: {
      control: { type: "range", min: 0, max: 500, step: 5 },
    },
    src: {
      control: { type: "file", accept: "image/*" },
    },
    alt: {
      control: "text",
    },
  },
};

const Template = (args) => <Component {...args} />;

const Img = Template.bind({});
Img.args = {
  width: 50,
  height: 50,
};

export { Img };
