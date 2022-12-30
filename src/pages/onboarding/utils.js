// utilty function that parses the geocode data and returns the data in a more readable format

export const parseGeocodeData = (data) => {
  const { results, plus_code } = data;
  const { address_components, formatted_address, geometry, place_id } =
    results[0];
  const { location } = geometry;
  const address = address_components.reduce(
    (acc, cur) => {
      const { long_name, short_name, types } = cur;
      if (types.includes("street_number")) {
        acc.streetNumber = long_name;
      } else if (types.includes("route")) {
        acc.street = long_name;
      } else if (types.includes("administrative_area_level_1")) {
        acc.state = long_name;
        acc.stateShort = short_name;
      } else if (
        types.includes("administrative_area_level_2") ||
        types.includes("locality")
      ) {
        acc.city = long_name;
      } else if (types.includes("country")) {
        acc.country = long_name;
        acc.countryShort = short_name;
      } else if (types.includes("postal_code")) {
        acc.pincode = +long_name;
      } else if (types.includes("sublocality")) {
        acc.locality = long_name;
      } else if (
        types.includes("landmark") ||
        types.includes("point_of_interest")
      ) {
        acc.landmark = long_name;
      }
      return acc;
    },
    {
      street: "",
      streetNumber: "",
      city: "",
      locality: "",
      landmark: "",
      state: "",
      stateShort: "",
      country: "",
      countryShort: "",
      pincode: "",
    }
  );
  return {
    address,
    location,
    formattedAddress: formatted_address,
    placeId: place_id,
    plusCode: plus_code,
  };
};

// parse address object into a string

export const parseAddress = (data) => {
  if (!data) return "";
  const { street, address, city, locality, landmark, state, pincode } = data;
  return `${address} ${street}, ${locality} ${landmark}, ${city}, ${state} - ${pincode}`;
};
