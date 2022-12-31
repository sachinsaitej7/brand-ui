import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import styled, { useTheme } from "styled-components";
import { Typography, Button, Switch, App } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { StyledCard as Card } from "../../styled-components";
import ProductCard from "../../shared-components/ProductCard";

import {
  useProductVariantsByProductId,
  updateProductVariant,
  deleteProduct,
  deleteProductVariants,
} from "./hooks";

const StyledContent = styled.div`
  padding: ${(props) => props.theme.space[0]};
  background-color: ${(props) => props.theme.bg.dark};
  .info {
    background-color: ${(props) => props.theme.bg.default};
    padding: ${(props) => props.theme.space[5]};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }

  .variants {
    padding: ${(props) => props.theme.space[5]};
    background-color: ${(props) => props.theme.bg.default};
    margin-top: ${(props) => props.theme.space[3]};
    margin-bottom: ${(props) => props.theme.space[3]};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h5 {
      margin-bottom: ${(props) => props.theme.space[0]};
      margin-top: ${(props) => props.theme.space[0]};
    }
  }
`;

const StyledCard = styled(Card)`
  margin-top: ${(props) => props.theme.space[0]};
  background-color: ${(props) => props.theme.bg.default};
  .ant-card-body {
    padding: ${(props) => props.theme.space[4]};
  }
  h5 {
    margin-bottom: ${(props) => props.theme.space[0]};
    margin-top: ${(props) => props.theme.space[0]};
  }
  .ant-typography {
    margin-bottom: ${(props) => props.theme.space[2]};
    margin-top: ${(props) => props.theme.space[2]};
  }
`;

function ProductView({ product, handleClose }) {
  const theme = useTheme();
  const { message } = App.useApp();
  const [variants, productLoading] = useProductVariantsByProductId(product.id);
  const [loading, setLoading] = useState(false);

  const toggleStatus = async (checked, productId) => {
    try {
      await updateProductVariant(productId, { status: checked });
      message.success("Status updated successfully");
    } catch (error) {
      message.error("Something went wrong, please try again later");
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(product.id);
      deleteProductVariants(variants.map((variant) => variant.id));
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Something went wrong, please try again later");
    }
    setLoading(false);
    handleClose();
  };

  return (
    <StyledContent>
      <div className='info'>
        <ProductCard {...product} />
        <Typography.Title level={5}>Product Info</Typography.Title>
        <StyledCard>
          <Typography.Text level={5} style={{ fontSize: theme.fontSizes[3] }}>
            {product.name}
          </Typography.Text>
          <Typography.Paragraph>{product.description}</Typography.Paragraph>
          <Typography.Paragraph strong>
            ₹ {product.price.currentPrice}
          </Typography.Paragraph>
          <Typography.Text style={{ opacity: "0.5" }}>
            #{product.tags?.join(", #")}
          </Typography.Text>
        </StyledCard>
      </div>
      <div className='variants'>
        <Typography.Title level={5}>Listed Sizes</Typography.Title>
        {!isEmpty(variants) ? (
          variants?.map((variant) => (
            <div
              key={variant.id}
              style={{
                borderBottom: "1px solid rgba(41, 41, 41, 0.12)",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: theme.space[4],
                width: "100%",
              }}
            >
              <div>
                <Switch
                  defaultChecked={variant.status}
                  checked={variant.status}
                  size='small'
                  style={{ marginRight: theme.space[5] }}
                  onChange={(checked) => toggleStatus(checked, variant.id)}
                />
                <Typography.Text>{variant.size.values}</Typography.Text>
              </div>
              <Typography.Text>
                {variant.status ? "Active" : "Inactive"}
              </Typography.Text>
            </div>
          ))
        ) : (
          <Typography.Text>No variants found</Typography.Text>
        )}
      </div>
      <Button
        danger
        type='text'
        onClick={handleDelete}
        icon={<DeleteOutlined />}
        loading={loading || productLoading}
        style={{
          width: "100%",
          marginBottom: theme.space[0],
          backgroundColor: theme.bg.default,
          height: "50px",
          fontSize: theme.fontSizes[3],
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        Delete Product
      </Button>
    </StyledContent>
  );
}

export default ProductView;
