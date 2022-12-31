import React from "react";
import styled, { useTheme } from "styled-components";
import { Typography } from "antd";
import Eyes from "../../assets/home/eyes.jpg";

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[5]};
  min-height: 50vh;
`;

const EmptyPage = () => {
  const theme = useTheme();
  return (
    <PlaceholderContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={Eyes} alt='eyes' width='24px' height='24px' />
        <Typography.Title
          level={5}
          style={{ margin: theme.space[0], marginLeft: theme.space[2] }}
        >
          You haven’t listed any products
        </Typography.Title>
      </div>
      <Typography.Text style={{ color: theme.text.light, textAlign: "center" }}>
        List products from your store inventory to get orders from customers
      </Typography.Text>
    </PlaceholderContainer>
  );
};

export default EmptyPage;
