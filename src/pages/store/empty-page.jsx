import React from "react";
import styled, { useTheme } from "styled-components";
import { Typography } from "antd";

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[6]};
`;

const EmptyPage = ({ store, onClick }) => {
  const theme = useTheme();
  return (
    <PlaceholderContainer>
      <Typography.Title level={5} style={{ opacity: 0.8 }}>
        You haven’t listed any products
      </Typography.Title>
      <Typography.Text style={{ color: theme.text.light }} strong='bold'>
        List your products to start selling on your store
      </Typography.Text>
    </PlaceholderContainer>
  );
};

export default EmptyPage;
