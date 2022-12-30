import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Typography, App } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { getFirebase } from "../../firebase";
import { useSendOtp, useVerifyOtp } from "./hooks";
import { PageContainer } from "../../styled-components";
import VerifyOtpForm from "./VerifyOtpForm";
import SendOtpForm from "./SendOtpForm";

const StyledContainer = styled(PageContainer)``;

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { auth } = getFirebase();
  const { message } = App.useApp();
  const [user, loading] = useAuthState(auth);
  const [sendOtp, sendOtpData] = useSendOtp();
  const [verifyOtp, verifyOtpData] = useVerifyOtp();
  const { verificationId, phoneNumber } = sendOtpData;

  useEffect(() => {
    if (user !== null && !loading) {
      navigate("/");
    }
  }, [user, navigate, loading]);

  const handleResendOtp = async () => {
    try {
      await sendOtp(phoneNumber, true);
      message.success("OTP sent successfully");
    } catch (error) {
      message.error("OTP sending failed");
    }
  };

  return (
    <StyledContainer>
      {verificationId ? (
        <>
          <Typography.Title level={4} style={{ marginTop: theme.space[4] }}>
            Enter OTP to verify
          </Typography.Title>
          <Typography.Paragraph style={{ color: "#8C8C8C" }}>
            {`Please enter the OTP code that we’ve sent to your registered phone
            number ${phoneNumber}`}
          </Typography.Paragraph>
          <VerifyOtpForm
            verifyOtp={verifyOtp}
            resendOtp={handleResendOtp}
            {...verifyOtpData}
            verificationId={verificationId}
          />
        </>
      ) : (
        <>
          <Typography.Title level={4} style={{ marginTop: theme.space[4] }}>
            Enter your phone number
          </Typography.Title>
          <Typography.Paragraph style={{ color: "#8C8C8C" }}>
            You can create a new account or log in if you’re already a user of
            Clock Sellers
          </Typography.Paragraph>
          <SendOtpForm sendOtp={sendOtp} {...sendOtpData} />
        </>
      )}
    </StyledContainer>
  );
};

export default LoginPage;
