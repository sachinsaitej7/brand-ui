import React from "react";
import { Typography, Button } from "antd";
import styled, { useTheme } from "styled-components";

import { StyledButton } from "../../styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .ant-typography:not(:last-child) {
    text-align: center;
  }

  .ant-typography:last-child {
    margin-top: ${(props) => props.theme.space[5]};
    font-size: ${(props) => props.theme.fontSizes[1]};
  }

  button {
    width: 100%;
    height: 40px;
    margin-top: ${(props) => props.theme.space[5]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

const Login = ({ handleClick }) => {
  const theme = useTheme();
  return (
    <Container>
      <Typography.Title
        level={3}
        style={{ fontWeight: theme.fontWeights.bold }}
      >
        Welcome to Clock Sellers
      </Typography.Title>
      <Typography.Text type='secondary'>
        A place where you can expand the consumer base of your boutique
      </Typography.Text>
      <StyledButton
        type='primary'
        onClick={handleClick}
        style={{ marginTop: theme.space[9] }}
      >
        Sign Up
      </StyledButton>
      <Button ghost type='primary' onClick={handleClick}>
        Log In
      </Button>
      <Typography.Text type='secondary'>
        By logging in or signing up, you are agreeing to our Terms of Service
        and Privacy Policy
      </Typography.Text>
    </Container>
  );
};

export default Login;
