import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { Form, Typography, Input, Row, Col, App } from "antd";

import { StyledButton } from "../../styled-components";

const SendOtpForm = ({
  sendOtp,
  loading: sendOtpLoading,
  error: sendOtpError,
}) => {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { message } = App.useApp();

  useEffect(() => {
    if (sendOtpError) {
      message.error(sendOtpError.message);
    }
  }, [message, sendOtpError]);

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    if (value.length > 10) return;
    setPhoneNumber(e.target.value);
  };

  return (
    <Form
      layout='vertical'
      onFinish={() => sendOtp(phoneNumber)}
      style={{ marginTop: theme.space[8] }}
    >
      <Form.Item
        label={
          <Typography.Title level={5} style={{ margin: "0px" }}>
            Phone Number *
            <Typography.Text type='secondary' style={{ marginLeft: "5px" }}>
              (We will send you an OTP)
            </Typography.Text>
          </Typography.Title>
        }
        name='phone-number'
      >
        <Input.Group size='large'>
          <Row gutter={8}>
            <Col span={4}>
              <Input value='+91' readOnly style={{padding: theme.space[3]}} />
            </Col>
            <Col span={20}>
              <Input
                placeholder='Phone Number'
                id='phone-number'
                type='number'
                maxLength={10}
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
                style={{padding: theme.space[3]}}
              />
            </Col>
          </Row>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        <StyledButton
          id='sign-in-button'
          type='primary'
          htmlType='submit'
          loading={sendOtpLoading}
        >
          Continue
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default SendOtpForm;
