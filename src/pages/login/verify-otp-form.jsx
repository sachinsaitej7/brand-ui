import React, { useState, useEffect, useRef } from "react";
import  { useTheme } from "styled-components";
import { Form, Typography, Row, App } from "antd";

import { StyledButton, StyledInput } from "../../styled-components";

const { useForm } = Form;

// export const StyledInput = styled(InputNumber)`
//   width: 48px;
//   height: 40px;
//   margin-right: ${(props) => props.theme.space[3]};
//   border: 1px solid rgba(41, 41, 41, 0.32);
//   border-radius: ${(props) =>
//     props.borderRadius || props.theme.borderRadius[2]};
//   padding: ${(props) => props.theme.space[2]};
//   font-weight: ${(props) => props.theme.fontWeights.semibold};
//   font-size: ${(props) => props.theme.fontSizes[4]};

//   @media (max-width: 330px) {
//     width: 40px;
//   }

//   @media (max-width: 360px) {
//     width: 44px;
//   }
// `;

const VerifyOtpForm = ({
  verifyOtp,
  resendOtp,
  loading: verifyOtpLoading,
  error: verifyOtpError,
  verificationId,
}) => {
  const theme = useTheme();
  const { message } = App.useApp();
  const inputRef = useRef(null);

  // const inputRefs = useRef([null, null, null, null, null, null]);
  // const [otp, setOtp] = useState([null, null, null, null, null, null]);
  const [form] = useForm();

  // set timer for 30 seconds
  const [timer, setTimer] = useState(30);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (verifyOtpError) {
      message.error(verifyOtpError.message);
    }
  }, [message, verifyOtpError]);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      setTimerId(id);
    }
    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  // function handleChange(index) {
  //   return (value) => {
  //     if (value && value.toString().length === 1) {
  //       setOtp((prevOtp) => {
  //         const newOtp = [...prevOtp];
  //         newOtp[index] = value;
  //         return newOtp;
  //       });
  //       index + 1 < 6 && inputRefs.current[index + 1].focus();
  //     }
  //     if (value === null) {
  //       setOtp((prevOtp) => {
  //         const newOtp = [...prevOtp];
  //         newOtp[index] = value;
  //         return newOtp;
  //       });
  //       index - 1 >= 0 && inputRefs.current[index - 1].focus();
  //     }
  //   };
  // }

  // function handlePaste(e) {
  //   e.preventDefault();
  //   const paste = e.clipboardData.getData("text");
  //   if (paste.length > 0) {
  //     setOtp(paste.slice(0, 6).split("").map(Number));
  //   }
  //   inputRefs.current[5].focus();
  // }

  return (
    <Form
      layout='vertical'
      form={form}
      onFinish={() => verifyOtp(verificationId, inputRef.current?.input.value)}
      style={{ marginTop: theme.space[7] }}
    >
      <Form.Item
        label={
          <Typography.Title level={5} style={{ margin: "0px" }}>
            OTP *
          </Typography.Title>
        }
        name='otp'
      >
        <Row>
          {/* {otp.map((value, index) => (
            <StyledInput
              key={index}
              autoFocus={index === 0}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={value}
              max={9}
              onChange={handleChange(index)}
              onPaste={handlePaste}
              maxLength={1}
              type='number'
            />
          ))} */}
          <StyledInput
            autoFocus
            ref={inputRef}
            type='number'
            placeholder='Enter OTP'
          />
        </Row>
        <Row justify='space-between' style={{ margin: theme.space[3] }}>
          <Typography.Link
            strong
            style={{ display: "block" }}
            onClick={() => {
              setTimer(30);
              resendOtp();
            }}
            underline
            disabled={timer > 0}
            id='recaptcha-container-resend'
          >
            Resend OTP
          </Typography.Link>

          <Typography.Text strong style={{ display: "block" }}>
            {timer} sec
          </Typography.Text>
        </Row>
      </Form.Item>
      <Form.Item>
        <StyledButton
          type='primary'
          htmlType='submit'
          style={{
            opacity: inputRef.current?.input.value ? 1 : 0.5,
          }}
          loading={verifyOtpLoading}
        >
          Continue
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default VerifyOtpForm;
