import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const StyledCard = styled(Card)`
  background-color: transparent;
  width: ${(props) => (props.variant === "small" ? "110px" : "164px")};
  height: ${(props) => (props.variant === "small" ? "156px" : "220px")};
  border: none;
  cursor: pointer;
  align-self: center;
  justify-self: center;
  .ant-card-meta-detail > div:not(:last-child) {
    margin-bottom: ${(props) => props.theme.space[1]};
  }
  .ant-card-body {
    padding: 0px;
  }

  .ant-card-cover img {
    border-radius: ${(props) => props.theme.borderRadius[2]};
    width: ${(props) => (props.variant === "small" ? "110px" : "164px")};
    height: ${(props) => (props.variant === "small" ? "156px" : "220px")};
  }
`;

const ImageContainer = styled.img``;

const ImageCover = ({ imgUrl, variant }) => (
  <ImageContainer src={`${imgUrl}`} variant={variant} />
);

const ProductCard = ({ thumbnail, onClick = () => { } }) => {
  let variant = "small";
  window.innerWidth > 768 && (variant = "medium");
  
  return (
    <StyledCard
      cover={<ImageCover imgUrl={thumbnail} variant={variant} />}
      variant={variant}
      onClick={onClick}
    ></StyledCard>
  );
};

export default ProductCard;
