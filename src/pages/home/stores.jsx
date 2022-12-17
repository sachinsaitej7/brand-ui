import React, { useContext, useEffect } from "react";
import { useTheme } from "styled-components";

import { useBrandsByIds } from "./hooks";
import store from "../../store";
import { Card, Typography } from "antd";

import Spinner from "../../shared-components/Spinner";

const { StoreContext } = store;

const StoreCard = ({ item }) => {
  const theme = useTheme();
  const { setStore } = useContext(StoreContext);

  return (
    <Card
      title={item.name}
      style={{ margin: theme.space[3] + " " + theme.space[0] }}
      onClick={() => setStore(item)}
    >
      <Card.Meta
        avatar={
          <img src={item.logo} alt='logo' width='100px' height='80px'></img>
        }
      />
    </Card>
  );
};

const Stores = ({ ids = [] }) => {
  const theme = useTheme();
  const { setStore } = useContext(StoreContext);
  const [data, loading] = useBrandsByIds(ids);

  useEffect(() => {
    if (!loading && data.length === 1) setStore(data[0]);
  }, [data, loading, setStore]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "space-between",
            marginTop: theme.space[5],
          }}
        >
          <Typography.Title level={3}>Stores</Typography.Title>
          {data.map((item) => {
            return <StoreCard item={item} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Stores;
