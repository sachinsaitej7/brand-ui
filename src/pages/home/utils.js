// parse address object into a string

export const parseAddress = (data) => {
  if (!data) return "";
  const { street, address, city, locality, landmark, state, pincode } = data;
  return `${address} ${street}, ${locality} ${landmark}, ${city}, ${state} - ${pincode}`;
};
