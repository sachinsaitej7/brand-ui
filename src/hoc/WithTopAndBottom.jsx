import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import { getFirebase } from "../firebase";
import store from "../store";
import Spinner from "../shared-components/Spinner";
import TopBar from "../shared-components/TopBar";
import Footer from "../shared-components/Footer";
import SplashPage from "../pages/splash-page";

const { auth } = getFirebase();
const { StoreContext } = store;

const WithTopAndBottom = ({ children }) => {
  const navigate = useNavigate();
  const { store, setStore, addNew } = useContext(StoreContext);
  const [splash, setSplash] = useState(true);

  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  useEffect(() => {
    if (user === null && !loading) {
      navigate("/login");
      setStore(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, loading]);

  useEffect(() => {
    if (!user) return;
    if (store && !store.status) navigate("/onboarding");
    else if (user && store) navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (splash) return <SplashPage />;

  return (
    <>
      <TopBar handleClick={() => signOut()} />
      {loading ? <Spinner /> : children}
      {!addNew && <Footer />}
    </>
  );
};

export default WithTopAndBottom;
