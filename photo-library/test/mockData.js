const photo1 = {
  albumId: 1,
  id: 1,
  title: "title1",
  url: "url1",
  thumbnailUrl: "thumb1",
};

const photo2 = {
  albumId: 2,
  id: 2,
  title: "title2",
  url: "url2",
  thumbnailUrl: "thumb2",
};

const album1 = {
  id: 1,
  title: "album1",
  userId: 1,
};

const album2 = {
  id: 2,
  title: "album2",
  userId: 2,
};

const user1 = {
  id: 1,
  name: "Name1",
  username: "user.name.1",
  email: "user@name.1",
  address: {
    street: "Street 1",
    suite: "Suite 1",
    city: "City 1",
    zipcode: "123-456",
    geo: {
      lat: "-38.2386",
      lng: "57.2232",
    },
  },
  phone: "111-111-1111",
  website: "user.1.net",
  company: {
    name: "Company 1",
    catchPhrase: "Centralized empowering task-force",
    bs: "target end-to-end models",
  },
};

const user2 = {
  id: 2,
  name: "Name2",
  username: "user.name.2",
  email: "user@name.2",
  address: {
    street: "Street 2",
    suite: "Suite 2",
    city: "City 2",
    zipcode: "123-456",
    geo: {
      lat: "-38.2386",
      lng: "57.2232",
    },
  },
  phone: "222-222-2222",
  website: "user.2.net",
  company: {
    name: "Company 2",
    catchPhrase: "Centralized empowering task-force",
    bs: "target end-to-end models",
  },
};

const allPhotos = [photo1, photo2];

const allUsers = [user1, user2];

const allAlbums = [album1, album2];

module.exports = {
  allPhotos,
  allUsers,
  allAlbums,
  user1,
  user2,
  photo1,
  photo2,
  album1,
  album2,
};
