import { useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { getFirebase } from "../../firebase";

export const useSendOtp = () => {
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const sendOtp = async (phoneNumber, resend) => {
    if (phoneNumber.length < 10)
      return setError({ message: "Invalid phone number" });
    setError(null);
    setPhoneNumber(phoneNumber);
    try {
      const { auth } = getFirebase();
      window.recaptchaVerifier = new RecaptchaVerifier(
        resend ? "recaptcha-container-resend" : "sign-in-button",
        {
          size: "invisible",
        },
        auth
      );
      const appVerifier = window.recaptchaVerifier;
      setLoading(true);
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phoneNumber}`,
        appVerifier
      );
      setVerificationId(confirmation.verificationId);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return [sendOtp, { loading, error, verificationId, phoneNumber }];
};

export const useVerifyOtp = () => {
  const { auth } = getFirebase();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (verificationId, verificationCode) => {
    if (!verificationId)
      return setError({ message: "Invalid verification ID" });
    if (verificationCode.length < 6)
      return setError({ message: "Invalid OTP" });

    setLoading(true);
    setError(null);
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
    } catch (error) {
      setError({
        message: "Invalid OTP, try again",
      });
    }
    setLoading(false);
  };

  return [verifyOtp, { loading, error }];
};
