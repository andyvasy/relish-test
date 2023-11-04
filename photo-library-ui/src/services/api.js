const fetchData = async (query) => {
  var queryUrl = `/externalapi/photos`;
  if (query.imageId) queryUrl += `/${query.imageId}`;
  else if (
    query.imageTitle ||
    query.albumTitle ||
    query.email ||
    query.offset ||
    query.limit
  ) {
    queryUrl += "?";
    if (query.imageTitle) queryUrl += `title=${query.imageTitle}&`;
    if (query.albumTitle) queryUrl += `album.title=${query.albumTitle}&`;
    if (query.email) queryUrl += `album.user.email=${query.email}&`;
    if (query.offset) queryUrl += `offset=${query.offset}&`;
    if (query.limit) queryUrl += `limit=${query.limit}&`;
  }
  console.log(queryUrl);
  try {
    const response = await fetch(queryUrl, {
      headers: { Accept: "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getCreative = async (imageId) => {
  var query = `/externalapi/ai/photo-pitch/${imageId}`;
  try {
    const response = await fetch(query, {
      headers: { Accept: "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export { fetchData, getCreative };
