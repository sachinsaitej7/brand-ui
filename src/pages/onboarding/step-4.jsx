import React, { useContext, useState } from "react";
import { useTheme } from "styled-components";
import { Typography } from "antd";

import Store from "../../store";
import { OnboardingContext } from "./context";
import { useBrandListingById, updateBrandListing } from "./hooks";
import { parseAddress } from "./utils";

//images
import { ReactComponent as InfoIcon } from "../../assets/common/info-circle.svg";

import {
  StyledStickyContainer,
  StyledButton,
  StoreNameContainer,
  StyledTag,
} from "../../styled-components";
import { StyledCard, Container } from "./styled";

const { StoreContext } = Store;

const Step4 = () => {
  const theme = useTheme();
  const { brandId } = useContext(OnboardingContext);
  const { setStore } = useContext(StoreContext);
  const [brand, brandLoading] = useBrandListingById(brandId);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    try {
      setLoading(true);
      await updateBrandListing(brandId, { status: true });
      setStore({ ...brand, status: true });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Typography.Title level={3}>Store summary</Typography.Title>
        <StyledCard
          title={
            brand && (
              <div>
                <StoreNameContainer>
                  <img src={brand.logo} alt='logo' width='100px'></img>
                  <Typography.Title
                    level={5}
                    style={{
                      marginTop: theme.space[3],
                      marginLeft: theme.space[3],
                    }}
                  >
                    {brand.name}
                  </Typography.Title>
                </StoreNameContainer>
                <div
                  style={{
                    paddingTop: theme.space[4],
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {brand.tags.map((tag) => (
                    <StyledTag key={tag}>{tag}</StyledTag>
                  ))}
                </div>
              </div>
            )
          }
          style={{ width: "100%" }}
          loading={loading || brandLoading}
        >
          <Typography.Text>{brand?.description}</Typography.Text>
          <Typography.Text
            strong
            style={{ paddingRight: theme.space[4], display: "block" }}
          >
            Location:
          </Typography.Text>
          <Typography.Text>{parseAddress(brand?.address)}</Typography.Text>
        </StyledCard>
        <Typography.Text
          style={{
            marginTop: theme.space[3],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: theme.fontSizes[1],
            color: theme.text.light,
          }}
        >
          <InfoIcon width='16px' style={{ marginRight: theme.space[2] }} />
          You can always edit these details in settings
        </Typography.Text>
      </Container>
      <StyledStickyContainer>
        <StyledButton
          onClick={handleNext}
          style={{
            margin: "0px",
          }}
          loading={loading || brandLoading}
        >
          Complete Store Setup
        </StyledButton>
      </StyledStickyContainer>
    </>
  );
};

export default Step4;
