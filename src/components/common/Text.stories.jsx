import React from "react";
import { theme } from "../../style/theme";
import T from "./Text";

export default {
  title: "components/Text",
  component: T,
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "white"],
      mapping: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        white: theme.colors.white,
      },
    },
    bold: { control: "boolean" },
    fontSize: {
      control: "select",
      options: ["subBody", "body", "strongBody", "heading", "subHeading"],
      mapping: {
        subBody: theme.fonts.subBody,
        body: theme.fonts.body,
        strongBody: theme.fonts.strongBody,
        heading: theme.fonts.heading,
        subHeading: theme.fonts.subHeading,
      },
    },
  },
};

const Template = (args) => <T {...args} />;

const Normal = Template.bind({});

Normal.args = {
  bold: false,
  text: "Text",
  fontSize: theme.fonts.body,
};

const Heading = Template.bind({});

Heading.args = {
  bold: false,
  text: "Heading",
  fontSize: theme.fonts.heading,
};

const Bold = Template.bind({});
Bold.args = {
  bold: true,
  text: "bold",
  fontSize: theme.fonts.body,
};

export { Normal, Bold, Heading };
