import React, { useEffect } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

import { getFirebase } from "../../firebase";
import LoginForm from "../../shared-components/LoginForm";
import { PageContainer } from "../../styled-components";

const LoginPage = () => {
  const navigate = useNavigate();
  const { auth } = getFirebase();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user !== null && !loading) {
      navigate("/");
    }
  }, [user, navigate, loading]);

  const handleSignInWithPhone = async (phoneNumber) => {
    let validPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    validPhoneNumber = `+91${validPhoneNumber}`;
    window.recaptchaVerifier =
      window.recaptchaVerifier ||
      new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
        },
        auth
      );
    const appVerifier = window.recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(
        auth,
        validPhoneNumber,
        appVerifier
      );
      window.confirmationResult = result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const verifyOtp = async (code) => {
    try {
      await window.confirmationResult.confirm(code);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <PageContainer>
      <Typography.Title level={3}>Login</Typography.Title>
      <LoginForm sendOtp={handleSignInWithPhone} verifyOtp={verifyOtp} />
    </PageContainer>
  );
};

export default LoginPage;
