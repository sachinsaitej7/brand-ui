import React, { useEffect } from "react";
import { isEmpty } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { App } from "antd";

import { getFirebase } from "../../firebase";
import { useBrandUserByUid } from "./hooks";

import { PageContainer } from "../../styled-components";
import Spinner from "../../shared-components/Spinner";
import Stores from "./stores";

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = getFirebase();
  const { message } = App.useApp();

  const [user] = useAuthState(auth);
  const [data, loading, error] = useBrandUserByUid(user?.uid);

  useEffect(() => {
    if (loading) return;
    if (isEmpty(data) || error) {
      error && message.error(error?.message || "Something went wrong");
      navigate("/onboarding");
    }
  }, [data, loading, error, navigate, message]);

  return (
    <PageContainer>
      {loading ? (
        <Spinner />
      ) : (
        !isEmpty(data) && <Stores ids={data?.map((i) => i.brandId)} />
      )}
    </PageContainer>
  );
};

export default HomePage;
