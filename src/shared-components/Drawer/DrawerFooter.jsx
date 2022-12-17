import React, { useContext } from "react";
import styled from "styled-components";

import { Button } from "antd";

import { removeEmptyKeys } from "../../utils";
import { FilterContext } from "./FilterContext";

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  border: 0px;
  border-radius: ${(props) => props.theme.borderRadius[1]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[9]}`};
  background-color: ${(props) => props.theme.bg[props.type || "default"]};
  height: 36px;
  span {
    color: ${(props) =>
      props.theme.text[props.type === "primary" ? "white" : "primary"]};
    font-size: ${(props) => props.theme.fontSizes[2]};
    line-height: 18px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus,
  :active {
    border: 0px;
    background-color: ${(props) => props.theme.bg[props.type || "default"]};
    outline: none;
  }
  &[disabled] {
    background-color: ${(props) => props.theme.bg.disabled};
    border: 0px;
    color: ${(props) =>
      props.theme.text[props.type === "primary" ? "white" : "primary"]};

    :hover,
    :focus,
    :active {
      border: 0px;
      background-color: ${(props) => props.theme.bg.disabled};
    }
  }
`;

export default function DrawerFooter() {
  const { filterValues, setFilterValues, selectedFilter, handleApply } =
    useContext(FilterContext);
  const { key } = selectedFilter;

  // const isApplyDisabled = !filterValues[key];

  const handleClear = () => {
    const newFilterValues = { ...filterValues };
    delete newFilterValues[key];
    setFilterValues(newFilterValues);
  };

  return (
    <StyledFooter>
      <StyledButton type="default" onClick={handleClear}>
        Clear All
      </StyledButton>{" "}
      <StyledButton
        type="primary"
        onClick={() => handleApply(removeEmptyKeys(filterValues))}
      >
        Apply
      </StyledButton>
    </StyledFooter>
  );
}
