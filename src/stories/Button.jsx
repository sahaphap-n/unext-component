import styled from "styled-components";

const handleColorType = (variant) => {
  switch (variant) {
    case "staffPrimary":
      return `color: #FFFFFF; background: #2E3191; border-color :#2E3191;
             &:hover { background: #1B1E55; border-color: #1B1E55 } 
             &:active { background: #14153E; border-color: #14153E }`;
    case "staffSecondary":
      return "color: #2E3191; background: #FFFFFF; border-color: #2E3191;";
    case "studentPrimary":
      return `color: #FFFFFF; background: #F25019; border-color: #F25019;
              &:hover { background:#E33F0D;  border-color:  #E33F0D } 
              &:active{ background:#C63A0B;  border-color:  #C63A0B }`;
    case "studentSecondary":
      return "color: #F25019; background: #FFFFFF; border-color: #F25019;";
    default:
      return "color: #000; background: #eee;";
  }
};

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 6px;
  width: 7rem;
  ${({ variant }) => handleColorType(variant)};
`;
