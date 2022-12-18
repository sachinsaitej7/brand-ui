import React, { useContext, useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Image, Typography } from "antd";

import store from "../../store";

import {
  useInstantProducts,
  useOnDemandProducts,
  deleteProduct,
} from "./hooks";
import ProductCard from "../../shared-components/ProductCard";
import Spinner from "../../shared-components/Spinner";
import FilterDrawer from "../../shared-components/Drawer";
import { StyledButton } from "../../styled-components";

const { StoreContext } = store;

const StyledContainer = styled.div``;

const Collections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${(props) => props.theme.space[3]};
  align-content: center;
  align-items: center;
  gap: ${(props) => props.theme.space[3]};
  overflow: auto;
  @media (min-width: 330px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${(props) => props.theme.space[2]};
  }

  @media (min-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Products = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("instant");
  const { store } = useContext(StoreContext);
  const [instantProducts, iLoading] = useInstantProducts(store?.id);
  const [onDemandProducts, dLoading] = useOnDemandProducts(store?.id);


  useEffect(() => {
    if (active === "instant") {
      instantProducts && setProducts(instantProducts);
    } else {
      onDemandProducts && setProducts(onDemandProducts);
    }
  }, [instantProducts, onDemandProducts, active]);

  const handleActive = (type) => {
    setActive(type);
  };

  return (
    <StyledContainer>
      <div
        style={{
          display: "flex",
          padding: theme.space[3],
          justifyContent: "space-around",
        }}
      >
        <Typography.Text
          onClick={() => handleActive("instant")}
          strong
          style={{ color: active === "instant" ? "red" : "" }}
        >
          Get in 60 mins
        </Typography.Text>
        <Typography.Text
          onClick={() => handleActive("on-demand")}
          strong
          style={{ color: active === "on-demand" ? "red" : "" }}
        >
          Made to order
        </Typography.Text>
      </div>
      <div>
        {iLoading || dLoading ? (
          <Spinner />
        ) : (
          <Collections
            dataLength={products.length}
            next={() => {}}
            hasMore={false}
            loader={<Spinner />}
            key={active}
          >
            {products.map((product, index) => {
              return (
                <ProductCard
                  key={product.id + "-" + index}
                  {...product}
                  onClick={() => {
                    setActiveProduct(product);
                    setOpen(true);
                  }}
                />
              );
            })}
          </Collections>
        )}
      </div>
      {activeProduct && (
        <FilterDrawer
          title={activeProduct.name}
          open={open}
          onClose={() => {
            setActiveProduct(null);
            setOpen(false);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={activeProduct.thumbnail}
              width='90%'
              height='auto'
              style={{
                maxHeight: "300px",
                borderRadius: theme.borderRadius[2],
                margin: theme.space[3],
              }}
            ></Image>
            <Typography.Paragraph>
              {activeProduct.description}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {activeProduct.price.currentPrice}
            </Typography.Paragraph>
            <StyledButton
              style={{ backgroundColor: "red" }}
              onClick={() => {
                deleteProduct(activeProduct.id).then(() => {
                  setActiveProduct(null);
                  setOpen(false);
                });
              }}
            >
              Delete
            </StyledButton>
          </div>
        </FilterDrawer>
      )}
    </StyledContainer>
  );
};

export default Products;
