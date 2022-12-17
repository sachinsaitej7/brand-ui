import React, { useEffect } from "react";
import { isEmpty } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { notification } from "antd";

import { getFirebase } from "../../firebase";
import { useBrandUserByUid } from "./hooks";

import { PageContainer } from "../../styled-components";
import Spinner from "../../shared-components/Spinner";
import Stores from "./stores";

const HomePage = () => {
  const navigate = useNavigate();
  const { auth } = getFirebase();
  const [user] = useAuthState(auth);
  const [data, loading, error] = useBrandUserByUid(user?.uid);

  useEffect(() => {
    if (loading) return;
    if (isEmpty(data) || error) {
      error &&
        notification.error({
          message: "Error",
          description: error?.message,
        });
      navigate("/onboarding");
    }
  }, [data, loading, error, navigate]);

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
