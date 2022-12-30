import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import isEmpty from "lodash/isEmpty";
import { Typography, Badge } from "antd";

import store from "../../store";
import { useProductsByBrandId } from "./hooks";
import { PageContainer } from "../../styled-components";
import Spinner from "../../shared-components/Spinner";
import EmptyPage from "./empty-page";
import AddNew from "./add-new";
import Products from "./products";

import { ReactComponent as SettingsIcon } from "../../assets/common/settings.svg";
import {
  StyledButton,
  StyledStickyContainer,
  StoreNameContainer,
  StyledTag as Tag,
} from "../../styled-components";

const { StoreContext } = store;

const StyledContainer = styled(PageContainer)`
  padding: ${(props) => props.theme.space[0]};
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
`;

const StyledNameContainer = styled(StoreNameContainer)`
  .name {
    h5 {
      margin: ${(props) => props.theme.space[0]};
    }
    margin-left: ${(props) => props.theme.space[3]};
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) => props.theme.bg.default};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  font-size: ${(props) => props.theme.fontSizes[1]};
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
        <div
          style={{ padding: theme.space[5], backgroundColor: theme.bg.dark }}
        >
          <StyledNameContainer>
            <img src={store.logo} alt='logo' width='100px'></img>
            <div className='name'>
              <Typography.Title level={5}>{store.name}</Typography.Title>
              <Badge
                status={store.status ? "success" : "error"}
                text={store.status ? "Active" : "Inactive"}
                size='small'
              />
            </div>
          </StyledNameContainer>
          <div style={{ marginTop: theme.space[3] }}>
            <StyledTag icon={<SettingsIcon width='16px' />}>
              Store Settings
            </StyledTag>
          </div>
        </div>

        {isEmpty(products) ? (
          <EmptyPage store={store} onClick={() => setAddNew(true)} />
        ) : (
          <Products />
        )}
      </div>
      <StyledStickyContainer>
        <StyledButton
          style={{ width: "100%", marginTop: theme.space[0] }}
          onClick={() => setAddNew(true)}
        >
          List a product
        </StyledButton>
      </StyledStickyContainer>
    </StyledContainer>
  );
};

export default StorePage;
