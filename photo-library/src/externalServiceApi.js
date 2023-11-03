const axios = require("axios");
const NodeCache = require("node-cache");
const { parse } = require("cache-control-parser");

const DEFAULT_CACHE_TTL = 60; // seconds; TODO: move to config
const DEFAULT_CACHE_CHECK_PERIOD = 30; // seconds; TODO: move to config
const BASE_URL =
  process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com";

const cache = new NodeCache({ checkperiod: DEFAULT_CACHE_CHECK_PERIOD });

const fetchPhoto = async (id) => {
  return await fetchData(`${BASE_URL}/photos/${id}`);
};

const fetchPhotos = async () => {
  return await fetchData(`${BASE_URL}/photos`);
};

const fetchUser = async (id) => {
  return await fetchData(`${BASE_URL}/users/${id}`);
};

const fetchUsers = async () => {
  return await fetchData(`${BASE_URL}/users`);
};

const fetchAlbum = async (id) => {
  return await fetchData(`${BASE_URL}/albums/${id}`);
};

const fetchAlbums = async () => {
  return await fetchData(`${BASE_URL}/albums`);
};

/** Extract mx-age HTTP header value */
const getMaxAge = (response) => {
  const cacheControl = response.headers["cache-control"];
  if (cacheControl) {
    const parsedCacheConrol = parse(cacheControl);
    if (parsedCacheConrol["max-age"]) {
      return parsedCacheConrol["max-age"];
    }
  }
  return DEFAULT_CACHE_TTL;
};

const fetchData = async (url) => {
  // cleanup trailing slash
  url = url.replace(/\/$/, "");
  const cachedData = cache.get(url);
  if (cachedData == undefined) {
    console.debug(`fetchData: cache miss: ${url}`);
    const response = await axios.get(url);
    const maxAge = getMaxAge(response);
    cache.set(url, response.data, maxAge);
    console.debug(`fetchData: cache ${url} for ${maxAge}s`);
    // if response is a list, cache each item
    if (response.data.length > 0) {
      response.data.forEach((item) => {
        const { id } = item;
        if (id) {
          cache.set(`${url}/${id}`, item, maxAge);
          console.debug(`fetchData: cache ${url}/${id} for ${maxAge}s`);
        }
      });
    }
    return response.data;
  } else {
    console.debug(`fetchData: cache hit: ${url}`);
    return cachedData;
  }
};

module.exports = {
  fetchPhoto,
  fetchPhotos,
  fetchUser,
  fetchUsers,
  fetchAlbum,
  fetchAlbums,
};
