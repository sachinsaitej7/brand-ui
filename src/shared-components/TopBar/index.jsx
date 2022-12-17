import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "antd";

//images
import { LogoutOutlined, CloseOutlined } from "@ant-design/icons";

import { ReactComponent as Logo } from "../../assets/common/logo-mobile.svg";

const TopBarContainer = styled.div`
  width: 100%;
  overflow: hidden;
  max-width: 768px;
  height: 50px;
  background-color: ${(props) => props.theme.bg.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[5]}`};
  box-sizing: border-box;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const StyledLogoContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: ${(props) => props.theme.space[1]};
`;

const TopBar = ({ handleClick = () => {}, addNew }) => {
  return (
    <TopBarContainer>
      {addNew ? (
        <>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Add new product
          </Typography.Title>
          <CloseOutlined onClick={handleClick} />
        </>
      ) : (
        <>
          <StyledLogoContainer>
            <Link to='/'>
              <Logo />
            </Link>
          </StyledLogoContainer>
          <LogoutOutlined onClick={handleClick} />
        </>
      )}
    </TopBarContainer>
  );
};

export default TopBar;
