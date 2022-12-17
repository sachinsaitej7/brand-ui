import slugify from "slugify";
import omit from "lodash/omit";

export const createProductData = (data) => {
  return {
    name: data.name,
    price: {
      currentPrice: data.price,
      discount: 0,
      mrp: null,
    },
    description: data.description || null,
    descriptionHtml: null,
    slug: slugify(data.name || "", {
      lower: true,
      trim: true,
      locale: "en",
    }),
    subcategory: omit(data.subcategory, "createdAt", "updatedAt"),
    category: omit(data.category, "createdAt", "updatedAt"),
    superSubcategory: null,
    brand: omit(data.brand, "createdAt", "updatedAt"),
    thumbnail: data.images[0],
    status: true,
    delivery: data.delivery,
    tags: data.tags,
  };
};

export const validateProductData = (data) => {
  let message = "";
  if (!data.images || data.images.length === 0) {
    message = "Images are required";
    return message;
  }
  if (!data.name) {
    message = "Name is required";
    return message;
  }
  if (!data.price) {
    message = "Price is required";
    return message;
  }
  if (!data.tags || data.tags.length === 0) {
    message = "Hash Tags are required";
    return message;
  }
  if (!data.category) {
    message = "Category is required";
    return message;
  }
  if (!data.brand) {
    message = "Brand is required";
    return message;
  }
  if (!data.delivery) {
    message = "Delivery is required";
    return message;
  }

  return message;
};
