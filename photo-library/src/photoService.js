const {
  fetchPhoto,
  fetchPhotos,
  fetchUser,
  fetchUsers,
  fetchAlbum,
  fetchAlbums,
} = require("./externalServiceApi");

/** Get a single photo by id */
const getPhoto = async (id) => {
  // fetch
  const photo = await fetchPhoto(id);
  const { albumId } = photo;
  const album = await fetchAlbum(albumId);
  const { userId } = album;
  const user = await fetchUser(userId);
  // combine
  return {
    ...photo,
    albumId: undefined,
    album: {
      ...album,
      userId: undefined,
      user,
    },
  };
};

const listToMap = (list) => {
  const map = new Map();
  list.forEach((item) => {
    map.set(item.id, item);
  });
  return map;
};

const likeFilter = (field, text) => (item) => {
  return (
    !text ||
    (item &&
      item[field] &&
      item[field].toLowerCase().indexOf(text.toLowerCase()) >= 0)
  );
};

const strictFilter = (field, value) => (item) => {
  return (
    !value ||
    (item && item[field] && item[field].toLowerCase() === value.toLowerCase())
  );
};

/** Get photo collection with optional filters */
const getPhotos = async (title, albumTitle, email) => {
  // fetch
  const [photos, users, albums] = await Promise.all([
    fetchPhotos(),
    fetchUsers(),
    fetchAlbums(),
  ]);
  // filter & combine
  usersMap = listToMap(users.filter(strictFilter("email", email)));
  albumsMap = listToMap(albums.filter(likeFilter("title", albumTitle)));
  return photos
    .filter((photo) => {
      return (
        likeFilter("title", title)(photo) &&
        albumsMap.has(photo.albumId) &&
        usersMap.has(albumsMap.get(photo.albumId).userId)
      );
    })
    .map((photo) => {
      return {
        ...photo,
        albumId: undefined,
        album: {
          ...albumsMap.get(photo.albumId),
          userId: undefined,
          user: {
            ...usersMap.get(albumsMap.get(photo.albumId).userId),
          },
        },
      };
    });
};

module.exports = {
  getPhoto,
  getPhotos,
};
