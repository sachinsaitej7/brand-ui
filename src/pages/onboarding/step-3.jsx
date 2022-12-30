import React, { useContext, useState, useRef, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { geohashForLocation } from "geofire-common";
import { Button, Typography, Input, Form, App } from "antd";

import { OnboardingContext } from "./context";
import {
  addPrivateData,
  updateBrandListing,
  useBrandListingById,
  getBrowserLocation,
  getAddressFromLatLong,
  getLatLongFromAddress,
} from "./hooks";
import { parseGeocodeData, parseAddress } from "./utils";

// images
import { ReactComponent as ArrowRight } from "../../assets/common/arrow-right-circle-fill.svg";

import {
  StyledStickyContainer,
  StyledButton,
  StyledInput,
} from "../../styled-components";
import FilterDrawer from "../../shared-components/Drawer";
import { StyledCard, Container } from "./styled";

const StyledForm = styled(Form)`
  width: 100%;
  margin-top: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[0]};
  .ant-form-item {
    margin-bottom: ${(props) => props.theme.space[4]};
  }
  padding: ${(props) => props.theme.space[5]};
`;

const StyledButton2 = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => props.theme.fontSizes[2]};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  line-height: 24px;
  color: ${(props) => props.theme.text.primary};
  border: 1px solid rgba(41, 41, 41, 0.24);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: ${(props) => props.theme.space[9]};
`;

const { TextArea } = Input;

const Step3 = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();
  const [geocodeData, setGeocodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const { nextStep, brandId } = useContext(OnboardingContext);
  const [data, brandLoading] = useBrandListingById(brandId);
  const [form] = Form.useForm();

  const { address, name } = data || {};

  const handleSubmit = async (values) => {
    if (!brandId) return;
    setLoading(true);
    try {
      const data = await getLatLongFromAddress(parseAddress(values));
      const { location, placeId, plusCode } = parseGeocodeData(data);
      const geoHash = geohashForLocation([location.lat, location.lng]);
      await addPrivateData(brandId, {
        lat: location.lat,
        lng: location.lng,
        geoHash,
        placeId,
        plusCode: plusCode?.global_code || null,
      });
      await updateBrandListing(brandId, {
        address: values,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong, please try again");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && geocodeData) {
      const { address } = geocodeData;
      formRef.current.setFieldsValue(address);
    }
  }, [geocodeData, open]);

  const handleLocation = async () => {
    setLoading(true);
    try {
      setOpen(true);
      const location = await getBrowserLocation();
      const data = await getAddressFromLatLong(location);
      setGeocodeData(parseGeocodeData(data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (address) {
      nextStep();
    } else {
      message.error("Please add your store location");
    }
  };

  return (
    <>
      <Container>
        <Typography.Title level={3}>Add your store location</Typography.Title>
        <Typography.Paragraph
          style={{ opacity: 0.8, fontSize: theme.fontSizes[3] }}
        >
          Orders will be picked up from this location
        </Typography.Paragraph>
        {address ? (
          <>
            <StyledCard>
              <Typography.Text
                strong
                style={{
                  display: "block",
                  marginBottom: theme.space[4],
                }}
              >
                {name}
              </Typography.Text>
              <Typography.Text
                style={{
                  fontSize: theme.fontSizes[2],
                  marginBottom: theme.space[3],
                }}
              >
                {parseAddress(address)}
              </Typography.Text>
            </StyledCard>
          </>
        ) : (
          <StyledButton2
            type='default'
            icon={<ArrowRight width='20px' />}
            onClick={handleLocation}
            loading={loading || brandLoading}
          >
            Add store location
          </StyledButton2>
        )}
      </Container>
      <StyledStickyContainer>
        <StyledButton
          onClick={handleNext}
          style={{
            margin: "0px",
          }}
          loading={loading || brandLoading}
          disabled={!address}
        >
          Proceed to next step
        </StyledButton>
      </StyledStickyContainer>
      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        title='Add store location'
      >
        <StyledForm
          form={form}
          onFinish={handleSubmit}
          scrollToFirstError
          ref={formRef}
          loading={loading}
        >
          <Form.Item
            name='address'
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <TextArea placeholder='Address' />
          </Form.Item>
          <Form.Item
            name='street'
            rules={[
              {
                required: true,
                message: "Please input your street!",
              },
            ]}
          >
            <StyledInput placeholder='Street/Road' />
          </Form.Item>
          <Form.Item
            name='locality'
            rules={[
              {
                required: true,
                message: "Please input your locality!",
              },
            ]}
          >
            <StyledInput placeholder='Locality' />
          </Form.Item>
          <Form.Item
            name='city'
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <StyledInput placeholder='City' />
          </Form.Item>
          <Form.Item
            name='state'
            rules={[
              {
                required: true,
                message: "Please input your state!",
              },
            ]}
          >
            <StyledInput placeholder='State' />
          </Form.Item>
          <Form.Item
            name='pincode'
            rules={[
              {
                required: true,
                message: "Please input your pincode!",
              },
            ]}
          >
            <StyledInput placeholder='Pincode' type='number' maxLength={6} />
          </Form.Item>
          <Form.Item
            name='landmark'
            rules={[
              {
                required: false,
                message: "Please input your landmark!",
              },
            ]}
          >
            <StyledInput placeholder='Landmark' />
          </Form.Item>
          <Form.Item>
            <StyledButton type='primary' htmlType='submit' loading={loading}>
              Add Address
            </StyledButton>
          </Form.Item>
        </StyledForm>
      </FilterDrawer>
    </>
  );
};

export default Step3;
