import React from "react";
import styled, { useTheme } from "styled-components";
import { Typography } from "antd";

import { PageContainer, StyledInput } from "../../styled-components";

// images
import UploadImages from "../../shared-components/UploadImages";

const Container = styled(PageContainer)`
  padding-top: 25%;
`;

const BrandForm = ({ handleUploadImages, setName }) => {
  const theme = useTheme();

  return (
    <Container>
      <Typography.Title level={4} style={{ opacity: 0.8 }}>
        Your Brand’s Name
      </Typography.Title>
      <StyledInput
        type='text'
        placeholder='Please enter your brand’s name'
        onChange={(e) => setName(e.target.value)}
      />
      <div style={{ marginTop: theme.space[8] }}>
        <Typography.Title level={4} style={{ opacity: 0.8 }}>
          Your Brand Logo
        </Typography.Title>
        <UploadImages limit={1} onSuccess={handleUploadImages} />
      </div>
    </Container>
  );
};

export default BrandForm;
