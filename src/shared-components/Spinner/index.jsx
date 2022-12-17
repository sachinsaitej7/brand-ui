import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Container = styled.div`
  display: 100%;
  text-align: center;
  padding: ${(props) => props.theme.space[5]};
  height: 100%;
  min-height: 500px;
`;
const Spinner = () => {
  return (
    <Container>
      <Spin size='large' indicator={antIcon} />
    </Container>
  );
};

export default Spinner;
