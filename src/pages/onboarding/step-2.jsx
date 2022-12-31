import React, { useContext, useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Button, Typography } from "antd";

import { OnboardingContext } from "./context";
import { updateBrandListing, useBrandListingById } from "./hooks";

// images
import { ReactComponent as PlusCircle } from "../../assets/common/plus-circle-filled.svg";

import {
  StyledInput,
  StyledStickyContainer,
  StyledButton,
  StyledTag as Tag,
} from "../../styled-components";
import { Container } from "./styled";

const StyledAdd = styled(Button)`
  margin: ${(props) => props.theme.space[0]};
  height: ${(props) => props.theme.space[7]};
  padding: ${(props) => props.theme.space[1] + " " + props.theme.space[2]};
  width: 54px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: none;
  font-size: ${(props) => props.theme.fontSizes[1]};
  span {
    color: ${(props) => props.theme.text.white};
    font-size: ${(props) => props.theme.fontSizes[1]};
    line-height: 14px;
    font-weight: ${(props) => props.theme.fontWeights.semibold};
  }
`;

const StyledTag = styled(Tag)`
  font-size: ${(props) => props.theme.fontSizes[2]};
  line-height: 16px;
  border-color: ${(props) => props.theme.bg.primary};
  background-color: ${(props) => props.theme.bg.secondary};
`;

const Step2 = () => {
  const theme = useTheme();
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();
  const [loading, setLoading] = useState(false);
  const { nextStep, brandId } = useContext(OnboardingContext);
  const [brandListing] = useBrandListingById(brandId);

  useEffect(() => {
    brandListing?.tags && setTags(brandListing.tags);
  }, [brandListing]);

  const handleAdd = () => {
    tag && setTags([...tags, tag]);
    setTag("");
  };

  const handleRemove = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      await updateBrandListing(brandId, { tags: tags });
      nextStep();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Typography.Title level={3}>
          What do you primarily sell?
        </Typography.Title>
        <Typography.Paragraph
          style={{ opacity: 0.8, fontSize: theme.fontSizes[3] }}
        >
          Help your customers understand what your store offers
        </Typography.Paragraph>
        <Typography.Paragraph style={{ opacity: 0.8 }}>
          Type your info and click on Add
        </Typography.Paragraph>
        <StyledInput
          type='text'
          placeholder='Ex: ethnic wear'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onPressEnter={handleAdd}
          suffix={
            <StyledAdd
              type='primary'
              icon={<PlusCircle width='14px' />}
              onClick={handleAdd}
            >
              Add
            </StyledAdd>
          }
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: theme.space[4],
          }}
        >
          {tags.map((tag) => {
            return (
              <StyledTag key={tag} closable onClose={() => handleRemove(tag)}>
                {tag}
              </StyledTag>
            );
          })}
        </div>
      </Container>
      <StyledStickyContainer>
        <StyledButton
          onClick={handleNext}
          style={{
            margin: "0px",
            width: "100%",
          }}
          loading={loading}
        >
          Proceed to next step
        </StyledButton>
      </StyledStickyContainer>
    </>
  );
};

export default Step2;
