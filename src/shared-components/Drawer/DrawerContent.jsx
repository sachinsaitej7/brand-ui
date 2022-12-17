import React, { useContext } from "react";
import styled from "styled-components";

import { FilterContext } from "./FilterContext";
import { CheckBox, Radio } from "../atoms";

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes[2]};
  line-height: 18px;
  color: ${(props) => props.theme.text.dark};

  margin: ${(props) => props.theme.space[3]} 0;
  p {
    margin: ${(props) => props.theme.space[0]};
    font-weight: ${(props) =>
      props.checked
        ? props.theme.fontWeights.semibold
        : props.theme.fontWeights.normal};
  }

  :hover {
    cursor: pointer;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

const CheckBoxOptionItem = ({ option, checked, onClick }) => {
  return (
    <FlexBox onClick={() => onClick(option)} checked={checked}>
      <p>{option.label}</p>
      <CheckBox checked={checked} />
    </FlexBox>
  );
};

const RadioOptionItem = ({ option, checked, onClick }) => {
  return (
    <FlexBox onClick={() => onClick(option)} checked={checked}>
      <p>{option.label}</p>
      <Radio checked={checked} />
    </FlexBox>
  );
};

const DrawerContent = () => {
  const { selectedFilter, filterValues, setFilterValues } =
    useContext(FilterContext);
  const { key, type, options, optionType } = selectedFilter;
  const selectedOptions = filterValues[key] || [];

  const handleOptionClick = ({ value }) => {
    if (type === "single_select") {
      setFilterValues({ ...filterValues, [key]: [value] });
    } else {
      const newOptions = selectedOptions.includes(value)
        ? selectedOptions.filter((o) => o !== value)
        : [...selectedOptions, value];
      setFilterValues({ ...filterValues, [key]: newOptions });
    }
  };

  return (
    <div>
      {options.map((option) => {
        if (optionType === "radio") {
          return (
            <RadioOptionItem
              key={option.value}
              option={option}
              onClick={handleOptionClick}
              checked={selectedOptions.includes(option.value)}
            />
          );
        } else {
          return (
            <CheckBoxOptionItem
              key={option.value}
              option={option}
              onClick={handleOptionClick}
              checked={selectedOptions.includes(option.value)}
            />
          );
        }
      })}
    </div>
  );
};

export default DrawerContent;
