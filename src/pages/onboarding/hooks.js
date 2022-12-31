import { getFirebase } from "../../firebase";
import { useDocumentData, useCollectionDataOnce } from "react-firebase-hooks/firestore";

import {
  collection,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const { db } = getFirebase();
const brandRef = collection(db, "brand");
const brandUserRef = collection(db, "brandUser");

// function to get brand listing by id

export const useBrandListingById = (id) => {
  const brandDoc = doc(db, "brand", id);
  const data = useDocumentData(brandDoc);
  return data;
};

export const useBrandUserByUid = (uid = "") => {
  const brandUserQuery = query(brandUserRef, where("uid", "==", uid));
  const data = useCollectionDataOnce(brandUserQuery);
  return data;
};

// function to add a new brand listing

export const addBrandListing = async (data) => {
  const newBrandListing = {
    ...data,
    status: false,
    image: null,
    description: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(brandRef, newBrandListing);
  return docRef.id;
};

// function to add a new brandUser
export const addBrandUser = async (data) => {
  const newBrandUser = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(brandUserRef, newBrandUser);
  return docRef.id;
};

// function to update a brand listing

export const updateBrandListing = async (id, data) => {
  const updatedBrandListingData = {
    ...data,
    updatedAt: serverTimestamp(),
  };
  const data1 = await updateDoc(doc(db, "brand", id), updatedBrandListingData);
  return data1;
};

// function to add private data subcollection to brand listing

export const addPrivateData = async (id, data) => {
  const privateDataRef = collection(db, "brand", id, "privateData");
  const newPrivateData = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(privateDataRef, newPrivateData);
  return docRef.id;
};

// function to get that latitute and longitude browser location

export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// get address from lat and long
export const getAddressFromLatLong = async ({ latitude, longitude }) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// get lat and long from address
export const getLatLongFromAddress = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};


