import React, { useContext } from "react";
import { useTheme } from "styled-components";
import { Typography } from "antd";

import { OnboardingContext } from "./context";
import { StyledButton, StyledStickyContainer } from "../../styled-components";

const Step0 = () => {
  const theme = useTheme();
  const { nextStep } = useContext(OnboardingContext);

  return (
    <>
      <Typography.Title
        level={3}
        style={{
          textAlign: "center",
          marginTop: theme.space[11],
          width: "100%",
          fontSize: theme.fontSizes[6],
        }}
      >
        Let’s start by setting up your store
      </Typography.Title>
      <StyledStickyContainer>
        <StyledButton
          onClick={nextStep}
          style={{
            margin: "0px",
          }}
        >
          Setup Store
        </StyledButton>
      </StyledStickyContainer>
    </>
  );
};

export default Step0;
