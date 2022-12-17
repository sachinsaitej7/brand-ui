import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import isEmpty from "lodash/isEmpty";
import { Typography } from "antd";

import store from "../../store";
import { useProductsByBrandId } from "./hooks";
import { PageContainer } from "../../styled-components";
import Spinner from "../../shared-components/Spinner";
import EmptyPage from "./empty-page";
import AddNew from "./add-new";
import Products from "./products";
import { StyledButton } from "../../styled-components";

const { StoreContext } = store;

const StyledContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.space[0]};
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[6]};
  background-color: ${(props) => props.theme.bg.dark};
  img {
    width: 56px;
    height: 56px;
    border-radius: ${(props) => props.theme.borderRadius[2]};
  }
`;

const StorePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { store, addNew, setAddNew } = useContext(StoreContext);
  const [products] = useProductsByBrandId(store?.id);

  useEffect(() => {
    if (!store) navigate("/");
  }, [navigate, store]);

  if (!store)
    return (
      <StyledContainer>
        <Spinner />
      </StyledContainer>
    );
  if (addNew) {
    return <AddNew store={store} />;
  }
  return (
    <StyledContainer>
      <div>
        <NameContainer>
          <img src={store.logo} alt='logo' width='100px'></img>
          <Typography.Title level={5} style={{ marginTop: theme.space[3] }}>
            {store.name}
          </Typography.Title>
        </NameContainer>
        {isEmpty(products) ? (
          <EmptyPage store={store} onClick={() => setAddNew(true)} />
        ) : (
          <Products />
        )}
      </div>
      <div
        style={{
          padding: theme.space[5],
          position: "fixed",
          bottom: theme.space[0],
          backgroundColor: theme.bg.default,
          width: "100%",
        }}
      >
        <StyledButton
          style={{ width: "100%", marginTop: theme.space[0] }}
          onClick={() => setAddNew(true)}
        >
          List a product
        </StyledButton>
      </div>
    </StyledContainer>
  );
};

export default StorePage;
