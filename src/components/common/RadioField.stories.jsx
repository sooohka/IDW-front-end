import React from "react";
import Component from "./RadioField";

// Data Type	|Control Type	|Description																							| Options
// boolean		|boolean			|checkbox input																						| -
// number			|number				|a numeric text box input																	|min, max, step
// 						|range				|a range slider input																			|min, max, step
// object			|object				|json editor text input																		| -
// array			|object				|json editor text input																		| -
// 						|file					|a file input that gives you a array of urls							|accept
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
  title: "components/RadioField",
  component: Component,
  argTypes: {
    id: {
      control: "text",
    },
    name: {
      control: "text",
    },
    checked: {
      control: "boolean",
    },
    onChange: {
      control: "function",
    },
    value: {
      control: "text",
    },
  },
};
const Template = (args) => <Component {...args} />;

const RadioField = Template.bind({});
RadioField.args = {
  id: "1",
  name: "category",
  checked: false,
  value: "연예인",
};

const CheckedRadioField = Template.bind({});
CheckedRadioField.args = {
  id: "1",
  name: "category",
  checked: true,
  value: "연예인",
};

export { RadioField, CheckedRadioField };
