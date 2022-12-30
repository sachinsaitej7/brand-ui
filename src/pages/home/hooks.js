import { getFirebase } from "../../firebase";

import { collection, query, where, orderBy, doc } from "firebase/firestore";

import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";

const idConverter = {
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

const { db } = getFirebase();
const brandRef = collection(db, "brand").withConverter(idConverter);
const brandUserRef = collection(db, "brandUser");

// hook to get brandUser data
export const useBrandUser = (id) => {
  const brandUserDoc = doc(db, "brandUser", id);
  const data = useDocumentDataOnce(brandUserDoc);
  return data;
};

// hook to get all brands with given ids array and disabled when not ids given
export const useBrandsByIds = (ids = []) => {
  const brandQuery = query(
    brandRef,
    where("__name__", "in", ids.slice(0, 10)),
    // orderBy("updatedAt", "desc")
  );
  const data = useCollectionDataOnce(brandQuery);
  return data;
};


// hook to get brandUser data bu uid
export const useBrandUserByUid = (uid = "") => {
  const brandUserQuery = query(brandUserRef, where("uid", "==", uid));
  const data = useCollectionDataOnce(brandUserQuery);
  return data;
};
