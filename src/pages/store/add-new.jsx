import React, { useState, useRef, useContext } from "react";
import styled, { useTheme } from "styled-components";
import { Typography, Radio, notification } from "antd";
// import antd icons for delete
import { DeleteOutlined } from "@ant-design/icons";

//import right arrow icon
import { ReactComponent as RightArrow } from "../../assets/common/chevron-right.svg";
import HashTags from "../../shared-components/HashTags";

import {
  useCategories,
  useSubCategories,
  useSizes,
  addProduct,
  addProductVariants,
} from "./hooks";
import {
  PageContainer,
  StyledInput,
  StyledButton,
} from "../../styled-components";
import store from "../../store";
import UploadImages from "../../shared-components/UploadImages";
import FilterDrawer from "../../shared-components/Drawer";
import { validateProductData } from "./utils";

const { StoreContext } = store;

const StyledContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.space[0]};
  padding-bottom: ${(props) => props.theme.space[6]}
  min-height: calc(100vh - 64px);
  background-color: ${(props) => props.theme.bg.dark};
  margin-bottom: ${(props) => props.theme.space[9]};
`;

const StyledCard = styled.div`
  padding: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.bg.default};
  margin-bottom: ${(props) => props.theme.space[3]};
  h4 {
    margin: ${(props) =>
      props.theme.space[0] +
      " " +
      props.theme.space[0] +
      " " +
      props.theme.space[3]};
    font-size: ${(props) => props.theme.fontSizes[3]};
  }
  .no-margin {
    margin: ${(props) => props.theme.space[0]};
  }
`;

export default function AddNew({ store }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { setAddNew } = useContext(StoreContext);
  const [values, setValues] = useState([]);
  const [type, setType] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedHashTags, setSelectedHashTags] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState("instant");
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const [categories] = useCategories();
  const [subcategories] = useSubCategories();
  const [sizes] = useSizes();

  const handleCategorySelect = (category) => {
    setSelectedSubcategory(category);
    setOpen(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const productData = {
      name: nameRef.current.input.value,
      price: +priceRef.current.input.value,
      category: categories?.find((c) => selectedSubcategory?.parentId === c.id),
      subCategory: selectedSubcategory,
      sizes: selectedSizes.map((size) => ({
        ...size,
        sizeGuide,
      })),
      images,
      delivery: deliveryTime,
      brand: store,
      tags: selectedHashTags,
    };
    const errorMessage = validateProductData(productData);
    if (errorMessage) {
      notification.error({
        message: "Error",
        description: errorMessage,
      });
      setLoading(false);
      return;
    }
    try {
      const id = await addProduct(productData);
      await addProductVariants(productData, id);
      notification.success({
        message: "Success",
        description: "Product added successfully",
      });
      setAddNew(false);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    }
    setLoading(false);
  };

  const handleSizeSelect = (size) => {
    if (selectedSizes.find((selectedSize) => selectedSize.label === size.label))
      return;
    setSelectedSizes((sizes) => [...sizes, size]);
    setOpen(false);
  };

  const handleSizeDelete = (size) => {
    setSelectedSizes((sizes) => sizes.filter((s) => s.label !== size.label));
  };

  const onDrawerItemClick = (type, value) => {
    if (type === "category") handleCategorySelect(value);
    else if (type === "size") handleSizeSelect(value);
  };

  const handleCardClick = (type) => {
    if (type === "category") subcategories && setValues(subcategories);
    else if (type === "size") {
      const allValues = sizes.reduce((acc, size) => {
        const { values } = size;
        return [
          ...acc,
          ...values.map((value) => ({
            ...size,
            label: value,
            values: value,
          })),
        ];
      }, []);
      setValues(allValues);
    }
    setType(type);
    setOpen(true);
  };

  const handleProductImages = (images) => {
    const imagesUrls = images
      .filter((i) => i.response)
      .map((image) => image.response.downloadURL);
    setImages(imagesUrls);
  };

  const handleSizeGuide = (images) => {
    const imagesUrls = images
      .filter((i) => i.response)
      .map((image) => image.response.downloadURL);
    if (imagesUrls.length === 0) return;
    setSizeGuide(imagesUrls[0]);
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Typography.Title level={4}>
          Product images * ({images.length}/4)
        </Typography.Title>
        <UploadImages limit={4} onSuccess={handleProductImages} />
        <Typography.Text style={{ color: "#8C8C8C" }}>
          Adding good quality product images is a key to attract more consumers
        </Typography.Text>
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>Product details *</Typography.Title>
        <StyledInput type='text' placeholder='Product name' ref={nameRef} />
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>Product Price *</Typography.Title>
        <StyledInput type='number' placeholder='₹ MRP' ref={priceRef} />
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>
          Hashtag * ({selectedHashTags.length}/6)
        </Typography.Title>
        <HashTags onChange={setSelectedHashTags} />
        <Typography.Text
          style={{
            color: "#8C8C8C",
            display: "inline-block",
            marginTop: theme.space[4],
          }}
        >
          Adding additional product info as hashtags help us improve our search
          results
        </Typography.Text>
      </StyledCard>
      <StyledCard
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onClick={() => handleCardClick("category")}
      >
        <Typography.Title level={4} className='no-margin'>
          Category *
        </Typography.Title>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography.Text style={{ color: "#8C8C8C" }}>
            {selectedSubcategory?.name}
          </Typography.Text>
          <RightArrow style={{ marginLeft: theme.space[3] }} width='20px' />
        </div>
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>Size </Typography.Title>
        {selectedSizes.map((size) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: theme.space[2] + " " + theme.space[0],
              }}
              key={size.label}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DeleteOutlined
                  style={{
                    marginRight: theme.space[3],
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSizeDelete(size)}
                />
                <Typography.Text strong>{size.label}</Typography.Text>
                <RightArrow
                  style={{ marginLeft: theme.space[3] }}
                  width='16px'
                />
              </div>
            </div>
          );
        })}
        <Typography.Text
          strong
          style={{ cursor: "pointer" }}
          onClick={() => handleCardClick("size")}
        >
          + Add new size
        </Typography.Text>
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>Delivery *</Typography.Title>
        <Radio.Group
          onChange={(e) => setDeliveryTime(e.target.value)}
          value={deliveryTime}
        >
          <Radio value='instant'>1 hr Delivery</Radio>
          <Radio value='on-demand'>Made to delivery</Radio>
        </Radio.Group>
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>Size Guide </Typography.Title>
        <UploadImages limit={1} onSuccess={handleSizeGuide} />
        <Typography.Text style={{ color: "#8C8C8C" }}>
          Adding a size guide helps the customers choose a product with the
          right fit
        </Typography.Text>
      </StyledCard>
      <StyledCard
        style={{
          padding: theme.space[5],
          position: "fixed",
          bottom: theme.space[0],
          backgroundColor: theme.bg.default,
          width: "100%",
          marginBottom: theme.space[0],
        }}
      >
        <StyledButton
          style={{ width: "100%", marginTop: theme.space[0] }}
          loading={loading}
          onClick={handleAddProduct}
        >
          List product
        </StyledButton>
      </StyledCard>
      <FilterDrawer open={open} onClose={() => setOpen(false)}>
        <div>
          {values.map((value) => {
            return (
              <div
                key={value.id + value.label}
                style={{
                  borderBottom: "1px solid rgba(41, 41, 41, 0.12)",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  padding: theme.space[5],
                }}
                onClick={() => onDrawerItemClick(type, value)}
              >
                <Typography.Text>{value.label || value.name}</Typography.Text>
              </div>
            );
          })}
        </div>
      </FilterDrawer>
    </StyledContainer>
  );
}
