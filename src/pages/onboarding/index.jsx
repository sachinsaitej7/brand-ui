import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { Typography } from "antd";
import { getFirebase } from "../../firebase";
import { addBrandListing, addBrandUser } from "./hooks";

import { StyledButton, PageContainer } from "../../styled-components";
import Spinner from "../../shared-components/Spinner";

// images
import Eyes from "../../assets/home/eyes.jpg";
import BrandForm from "./brand-form";

const StyledContainer = styled(PageContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OnboardingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = getFirebase();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (step === 2) {
      name && createNewBrand();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const createNewBrand = async () => {
    setLoading(true);
    try {
      const brandId = await addBrandListing({ name, logo });
      await addBrandUser({ brandId, uid: user.uid });
      navigate(`/`);
      notification.success({
        message: "Success",
        description: "Your brand has been created.",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Something went wrong. Please try again later.",
      });
    }
    setLoading(false);
  };

  const handleUploadImages = (images) => {
    if (images.length === 0) return;
    const logo = images[0].response?.downloadURL;
    setLogo(logo);
  };

  return (
    <StyledContainer>
      <div
        style={{
          width: "100%",
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {step === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={Eyes} alt='eyes' width='40px' height='40px' />
                <Typography.Text
                  strong
                  style={{ fontSize: theme.fontSizes[4] }}
                >
                  Looks empty
                </Typography.Text>
                <Typography.Paragraph>
                  Please setup your store
                </Typography.Paragraph>
              </div>
            )}
            {step === 1 && (
              <BrandForm
                handleUploadImages={handleUploadImages}
                setName={setName}
              />
            )}
          </>
        )}

        <StyledButton
          onClick={() => setStep((prev) => prev + 1)}
          loading={loading}
        >
          Setup Store
        </StyledButton>
      </div>
    </StyledContainer>
  );
};

export default OnboardingPage;
