import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 200px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  background-color: ${(props) => props.theme.bg.primary};
  margin: ${(props) => props.theme.space[5]};
  margin-left: 0px;
  height: 40px;
  span {
    color: ${(props) => props.theme.text.white};
    font-size: ${(props) => props.theme.fontSizes[4]};
    line-height: 20px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
  :hover,
  :focus {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bg.primary};
  }
`;

export default function ErrorFallbackComponent({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleError = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "85vh",
        padding: "16px",
        color: "red",
        marginTop: "60px",
      }}
    >
      <h4 style={{ color: "red" }}>
        Something went wrong, we are notified. Please try after sometime.
      </h4>
      <details style={{ whiteSpace: "pre-wrap" }}>
        {error && error.toString()}
        <br />
      </details>
      <StyledButton onClick={handleError}>Try again</StyledButton>
    </div>
  );
}
