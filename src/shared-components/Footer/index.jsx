import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  color: ${(props) => props.theme.text.dark};
  padding: ${(props) => `${props.theme.space[5]} ${props.theme.space[8]}`};
  p {
    font-weight: ${(props) => props.theme.fontWeights.normal};
    font-size: ${(props) => props.theme.fontSizes[2]};
    line-height: 20px;
  }
  .meta-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    p {
      cursor: pointer;
    }
  }
`;

const MetaLinks = ({ clickHandlers }) => {
  return (
    <div className='meta-links'>
      <p onClick={clickHandlers("about")}>About</p>
      <p onClick={clickHandlers("tnc")}>Terms</p>
      <p onClick={clickHandlers("privacy")}>Privacy Policy</p>
    </div>
  );
};

const Footer = ({ clickHandlers = () => {} }) => {
  return (
    <FooterContainer>
      <MetaLinks clickHandlers={clickHandlers} />
    </FooterContainer>
  );
};

export default Footer;
