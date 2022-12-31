import {
  useCollectionDataOnce,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  collectionGroup,
} from "firebase/firestore";
import omit from "lodash/omit";

import { getFirebase } from "../../firebase";
import { createProductData } from "./utils";

const { db } = getFirebase();

const idConverter = {
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
};

const brandRef = collection(db, "brand");
const productRef = collection(db, "product");
const productVariantRef = collection(db, "productVariant");

// hook that returns brandItem data from brandId
export const useBrandItem = (brandId = "") => {
  const brandItemQuery = query(brandRef, where("brand.id", "==", brandId));
  const data = useCollectionDataOnce(brandItemQuery);
  return data;
};

// hook to get product data by brand id
export const useProductsByBrandId = (brandId = "") => {
  const productQuery = query(
    productRef,
    where("brand.id", "==", brandId),
    where("status", "==", true)
  ).withConverter(idConverter);
  const data = useCollectionData(productQuery);
  return data;
};

// hook to get products with delivery='instant' and status=true
export const useInstantProducts = (brandId) => {
  const productQuery = query(
    productRef,
    where("delivery", "==", "instant"),
    where("status", "==", true),
    where("brand.id", "==", brandId)
  ).withConverter(idConverter);
  const data = useCollectionData(productQuery);
  return data;
};

// hook to get products with delivery='on-demand' and status=true
export const useOnDemandProducts = (brandId) => {
  const productQuery = query(
    productRef,
    where("delivery", "==", "on-demand"),
    where("status", "==", true),
    where("brand.id", "==", brandId)
  ).withConverter(idConverter);
  const data = useCollectionData(productQuery);
  return data;
};

// hook to get product variants by product id
export const useProductVariantsByProductId = (productId = "") => {
  const productVariantQuery = query(
    productVariantRef,
    where("productId", "==", productId)
  ).withConverter(idConverter);
  const data = useCollectionData(productVariantQuery);
  return data;
};

// delete product data by id
export const deleteProduct = async (id) => {
  const productDoc = doc(db, "product", id);
  await deleteDoc(productDoc);
};

// delete product variant data by id
export const deleteProductVariant = async (id) => {
  const productVariantDoc = doc(db, "productVariant", id);
  await deleteDoc(productVariantDoc);
};

// delete product variants by ids
export const deleteProductVariants = async (ids) => {
  const productVariantDocs = ids.map((id) => doc(db, "productVariant", id));
  await Promise.all(productVariantDocs.map((doc) => deleteDoc(doc)));
};

// get all subcategory data
export const useSubCategories = () => {
  const subCategoryRef = collectionGroup(db, "subcategory").withConverter(
    idConverter
  );
  const q = query(subCategoryRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

//get all category data
export const useCategories = () => {
  const categoryRef = collection(db, "category").withConverter(idConverter);
  const q = query(categoryRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

// get all size data
export const useSizes = () => {
  const sizeRef = collection(db, "size").withConverter(idConverter);
  const q = query(sizeRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

// get all color data
export const useColors = () => {
  const colorRef = collection(db, "color").withConverter(idConverter);
  const q = query(colorRef, where("status", "==", true));
  const data = useCollectionDataOnce(q);
  return data;
};

// add product data
export const addProduct = async (data) => {
  const productData = createProductData(data);
  const newProduct = {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(productRef, newProduct);
  const subColRef = collection(db, "product", docRef.id, "images");
  await addImages(subColRef, data.images);
  return docRef.id;
};

const addImages = async (colRef, urls) => {
  const images = urls.map((image) => {
    return {
      url: image,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  });
  await Promise.all(images.map((image) => addDoc(colRef, image)));
  return;
};

// add product variant data
export const addProductVariants = async (data, productId) => {
  const variants = data.sizes.map((size) => {
    const productData = createProductData(data);

    const variantData = {
      ...productData,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      stock: {
        quantity: size.quantity || 1,
      },
      size: omit(
        size,
        "quantity",
        "createdAt",
        "updatedAt",
        "size_chart_image"
      ),
      color: null,
    };
    return variantData;
  });

  const refs = await Promise.all(
    variants.map((variant) => {
      return addDoc(productVariantRef, variant);
    })
  );
  await Promise.all(
    refs.map((ref) =>
      addImages(collection(db, "productVariant", ref.id, "images"), data.images)
    )
  );
  return;
};

// update product variant data with product id
export const updateProductVariant = async (productId, data) => {
  const productVariantDoc = doc(db, "productVariant", productId);
  await updateDoc(productVariantDoc, { ...data, updatedAt: serverTimestamp() });
  return;
};
  