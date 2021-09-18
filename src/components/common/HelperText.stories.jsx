import React from "react";
import Component from "./HelperText";

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
  title: "components/HelperText",
  component: Component,
  argTypes: {
    hasError: { control: "boolean" },
    text: { control: "text" },
    always: { control: "boolean" },
  },
};
const Template = (args) => <Component {...args} />;

const HelperText = Template.bind({});
HelperText.args = {
  hasError: true,
  text: "Error has occured",
};

export { HelperText };
