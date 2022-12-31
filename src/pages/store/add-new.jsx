import React, { useState, useRef, useContext } from "react";
import styled, { useTheme } from "styled-components";
import { Typography, Radio, App, Divider } from "antd";

//images
import { CloseOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { ReactComponent as RightArrow } from "../../assets/common/chevron-right.svg";
import { ReactComponent as LeftArrow } from "../../assets/common/arrow-left.svg";

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
  StyledStickyContainer,
} from "../../styled-components";

import store from "../../store";
import UploadImages from "../../shared-components/UploadImages";
import FilterDrawer from "../../shared-components/Drawer";
import { validateProductData } from "./utils";

const TopBarContainer = styled.div`
  width: 100%;
  overflow: hidden;
  max-width: 768px;
  height: 50px;
  background-color: ${(props) => props.theme.bg.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => `${props.theme.space[2]} ${props.theme.space[5]}`};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const StyledContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.space[0]};
  position: absolute;
  padding-bottom: ${(props) => props.theme.space[9]};
  min-height: 100vh;
  max-width: 768px;
  background-color: ${(props) => props.theme.bg.dark};
  animation: slide-up 0.5s ease-in-out;
  z-index: 100;
  top: 0;
  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
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

const { StoreContext } = store;

export default function AddNew({ store }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { setAddNew } = useContext(StoreContext);
  const { message } = App.useApp();

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
      subcategory: selectedSubcategory,
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
      message.error(errorMessage);
      setLoading(false);
      return;
    }
    try {
      const id = await addProduct(productData);
      await addProductVariants(productData, id);
      message.success("Product added successfully");
      setAddNew(false);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong, please try again later");
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
    if (type === "category") {
      if (!value.children) handleCategorySelect(value);
      else setValues(value.children);
    } else if (type === "size") {
      if (!value.children) handleSizeSelect(value);
      else setValues(value.children);
    }
  };

  const handleCardClick = (type) => {
    if (type === "category") {
      const allValues = categories.map((category) => ({
        ...category,
        children: subcategories.filter(
          (subcategory) => subcategory.parentId === category.id
        ),
      }));
      setValues(allValues);
    } else if (type === "size") {
      const allValues = sizes.map((size) => {
        const { values } = size;
        return {
          ...size,
          children: values.map((value) => ({
            ...size,
            label: value,
            values: value,
          })),
        };
      });
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

  const parentCategory = categories?.find(
    (category) => category.id === selectedSubcategory?.parentId
  );

  const isParent = values?.find((value) => {
    if (type === "category") return categories?.find((c) => c.id === value.id);
    else return sizes?.find((s) => s.label === value.label);
  });

  return (
    <StyledContainer>
      <TopBarContainer>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Add new product
        </Typography.Title>
        <CloseOutlined onClick={() => setAddNew(false)} />
      </TopBarContainer>
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
        <StyledInput
          type='number'
          prefix='₹'
          placeholder='MRP'
          ref={priceRef}
        />
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
            {parentCategory && `${parentCategory?.name} /`}{" "}
            {selectedSubcategory?.name || "Select"}
          </Typography.Text>
          <RightArrow style={{ marginLeft: theme.space[3] }} width='20px' />
        </div>
      </StyledCard>
      <StyledCard>
        <Typography.Title level={4}>Size* </Typography.Title>
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
        {selectedSizes.length !== 0 && (
          <Divider style={{ margin: theme.space[2] + " 0" }} />
        )}
        <Typography.Text
          strong
          style={{
            cursor: "pointer",
            marginTop: theme.space[5],
            display: "block",
          }}
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
      <StyledStickyContainer
        style={{
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
      </StyledStickyContainer>
      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        title={
          <div style={{ display: "flex" }}>
            {!isParent && (
              <LeftArrow width={20} onClick={() => handleCardClick(type)} />
            )}
            <Typography.Title
              level={4}
              style={{ margin: theme.space[0] + " " + theme.space[3] }}
            >
              {type === "category" ? "Select category" : "Select size"}
            </Typography.Title>
          </div>
        }
      >
        <div>
          {values.map((value) => {
            const disabled =
              type === "category"
                ? selectedSubcategory?.id === value.id
                : selectedSizes.some((size) => size.label === value.label);
            return (
              <div
                key={value.id + value.label}
                style={{
                  borderBottom: "1px solid rgba(41, 41, 41, 0.12)",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: theme.space[5],
                }}
                onClick={() => !disabled && onDrawerItemClick(type, value)}
              >
                <Typography.Text disabled={disabled}>
                  {value.label || value.name}
                </Typography.Text>
                {value.children && (
                  <RightArrow width='16px' disabled={disabled} />
                )}
              </div>
            );
          })}
        </div>
      </FilterDrawer>
    </StyledContainer>
  );
}
