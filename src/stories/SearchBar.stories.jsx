import React from "react";

import { SearchBar } from "./SearchBar";
import { province } from "../mock/province";

export default {
  title: "Example/SearchBar",
  component: SearchBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "ค้นหา",
  inputShowGroup: [
    {
      inputType: "input",
      key: "name",
      placeholder: "กรุณาพิม ชื่อ",
    },
    {
      inputType: "select",
      key: "province",
      placeholder: "กรุณาเลือกจังหวัด",
      option: province,
      optionValueKey: "id",
      optionNameKey: "name_th",
    },
  ],
};
