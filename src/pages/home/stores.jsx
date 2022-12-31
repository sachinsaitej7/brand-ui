import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Typography } from "antd";

import { useBrandsByIds } from "./hooks";
import { parseAddress } from "./utils";
import Store from "../../store";

import Spinner from "../../shared-components/Spinner";
import {
  StyledCard,
  StoreNameContainer,
  StyledTag,
} from "../../styled-components";

const { StoreContext } = Store;

const StoreCard = ({ item: brand }) => {
  const theme = useTheme();
  const { setStore } = useContext(StoreContext);

  return (
    <StyledCard
      title={
        <div>
          <StoreNameContainer>
            <img src={brand.logo} alt='logo' width='100px'></img>
            <Typography.Title
              level={5}
              style={{
                marginTop: theme.space[3],
                marginLeft: theme.space[3],
              }}
            >
              {brand.name}
            </Typography.Title>
          </StoreNameContainer>
          <div
            style={{
              paddingTop: theme.space[4],
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {brand.tags?.map((tag) => (
              <StyledTag key={tag}>{tag}</StyledTag>
            ))}
          </div>
        </div>
      }
      style={{ width: "100%" }}
      onClick={() => setStore(brand)}
    >
      <Typography.Text>{brand.description}</Typography.Text>
      <Typography.Text
        strong
        style={{ paddingRight: theme.space[4], display: "block" }}
      >
        Location:
      </Typography.Text>
      <Typography.Text>{parseAddress(brand?.address)}</Typography.Text>
    </StyledCard>
  );
};

const Stores = ({ ids = [] }) => {
  const navigate = useNavigate();
  const { setStore } = useContext(StoreContext);
  const [data, loading] = useBrandsByIds(ids);

  useEffect(() => {
    if (loading) return;
    if (data.length === 0) navigate("/onboarding");
    if (data.length === 1) setStore(data[0]);
  }, [data, loading, navigate, setStore]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title level={3} style={{ marginBottom: "0px" }}>
            Stores
          </Typography.Title>
          {data.map((item) => {
            return <StoreCard item={item} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Stores;
