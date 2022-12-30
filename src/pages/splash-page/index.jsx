import React from "react";
import styled from "styled-components";

import { PageContainer } from "../../styled-components";
import { ReactComponent as SellerLogo } from "../../assets/common/seller-logo.svg";
import "./style.css";

const StyledContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.space[0]};
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  animation: fadeout 1s ease-in-out forwards;
  animation-delay: 2.5s;

  .circle {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.bg.primary};
    animation: bubbleup 1s ease-in-out forwards;
  }

  .mini-circle {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    opacity: 0;
    background-color: ${(props) => props.theme.bg.primary};
    animation: zoomin 1s ease-in-out forwards;
    animation-delay: 1.5s;
  }

  .circle.top-left {
    top: -8%;
    left: -8%;
  }

  .circle.top-right {
    top: 10%;
    right: -8%;
    width: 100px;
    height: 100px;
    opacity: 0.8;
  }

  .circle.bottom-left {
    bottom: 10%;
    left: -8%;
    width: 100px;
    height: 100px;
    opacity: 0.8;
  }

  .circle.bottom-right {
    bottom: -8%;
    right: -8%;
  }

  @keyframes bubbleup {
    0% {
      transform: scale(0);
      transform-origin: center;
    }
    50% {
      transform: scale(1);
      transform-origin: center;
    }
    100% {
      transform: scale(1);
      transform-origin: center;
    }
  }

  @keyframes zoomin {
    0% {
      opacity: 1;
      transform: scale(0);
      transform-origin: center;
    }
    100% {
      transform: scale(20);
      opacity: 1;
      transform-origin: center;
    }
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const SplashPage = () => {
  return (
    <StyledContainer>
      <div className='circle top-left'></div>
      <div className='circle bottom-right'></div>
      <div className='circle bottom-left'></div>
      <div className='circle top-right'></div>
      <div className='mini-circle'></div>
      <SellerLogo className='logo' />
    </StyledContainer>
  );
};

export default SplashPage;
