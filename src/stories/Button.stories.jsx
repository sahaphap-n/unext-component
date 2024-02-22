import React from "react";

import { Button } from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "studentPrimary",
          "studentSecondary",
          "staffPrimary",
          "staffSecondary",
        ],
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args}>ตกลง</Button>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: "studentPrimary",
};
Primary.args = {
  variant: "studentSecondary",
};
