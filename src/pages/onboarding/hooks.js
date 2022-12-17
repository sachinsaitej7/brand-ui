import { getFirebase } from "../../firebase";

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const { db } = getFirebase();
const brandRef = collection(db, "brand");
const brandUserRef = collection(db, "brandUser");

// function to add a new brand listing

export const addBrandListing = async (data) => {
  const newBrandListing = {
    ...data,
    status: true,
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
  await updateDoc(doc(db, "brand", id), updatedBrandListingData);
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
