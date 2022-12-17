import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import { getFirebase } from "../firebase";
import store from "../store";
import Spinner from "../shared-components/Spinner";
import TopBar from "../shared-components/TopBar";
import Footer from "../shared-components/Footer";

const { auth } = getFirebase();
const { StoreContext } = store;

const WithTopAndBottom = ({ children }) => {
  const navigate = useNavigate();
  const { store, setStore, addNew, setAddNew } = useContext(StoreContext);

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
    if (user && store) navigate("/home");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  return (
    <>
      <TopBar
        handleClick={!addNew ? () => signOut() : () => setAddNew(false)}
        addNew={addNew}
      />
      {loading ? <Spinner /> : children}
      {!addNew && <Footer />}
    </>
  );
};

export default WithTopAndBottom;
