import styled from "styled-components";
import { Button, Input } from "antd";

export const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  font-family: ${(props) => props.theme.fonts.primary};
  background-color: ${(props) => props.theme.bg.white};
  padding: ${(props) => props.theme.space[0] + " " + props.theme.space[5]};
`;

export const StyledButton = styled(Button)`
  margin-top: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[4]}`};
  width: 100%;
  height: 40px;
  &.ant-btn:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.bg.primary};
  }
  :hover {
    border-color: ${(props) => props.theme.colors.primary} !important;
    background: ${(props) => props.theme.bg.primary};
  }
  span {
    color: ${(props) => props.theme.text.white};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 24px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
  border: 1px solid rgba(41, 41, 41, 0.32);
  border-radius: ${(props) => props.borderRadius || props.theme.borderRadius[2]};
  padding: ${(props) => `${props.theme.space[4]} ${props.theme.space[5]}`};
  :placeholder-shown {
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 16px;
  }
`;

export const StyledStickyContainer = styled.div`
  width: 100%;
  overflow: hidden;
  max-width: 768px;
  position: fixed;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg.default};
  padding: ${(props) => `${props.theme.space[3]} ${props.theme.space[5]}`};
  box-shadow: 16px 8px 0px rgba(0, 0, 0, 0.08);
  bottom: ${(props) => props.theme.space[0]};
`;
