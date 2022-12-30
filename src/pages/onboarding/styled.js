import styled from "styled-components";
import { Card } from "antd";

export const Container = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.space[0]};
  padding-top: 10%;
  h3 {
    margin: ${(props) => props.theme.space[0]};
  }
  p {
    margin-bottom: ${(props) => props.theme.space[7]};
  }
`;

export const StyledCard = styled(Card)`
  width: 100%;
  margin-top: ${(props) => props.theme.space[7]};
  border: 1px solid rgba(41, 41, 41, 0.24);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  .ant-card-head,
  .ant-card-body {
    padding: ${(props) => props.theme.space[5]};
  }
  .ant-card-head-title {
    font-size: ${(props) => props.theme.fontSizes[3]};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    padding: ${(props) => props.theme.space[0]};
  }
  .ant-card-body .ant-typography {
    opacity: 0.8;
    color: ${(props) => props.theme.text.dark};
  }
`;
