const { getPhoto, getPhotos } = require("../src/photoService");
const {
  fetchPhoto,
  fetchPhotos,
  fetchUser,
  fetchUsers,
  fetchAlbum,
  fetchAlbums,
} = require("../src/externalServiceApi");
const {
  photo1,
  photo2,
  album1,
  album2,
  user1,
  user2,
  allPhotos,
  allUsers,
  allAlbums,
} = require("./mockData");

jest.mock("../src/externalServiceApi");

const expectedPhoto1 = {
  ...photo1,
  albumId: undefined,
  album: {
    ...album1,
    userId: undefined,
    user: user1,
  },
};

const expectedPhoto2 = {
  ...photo2,
  albumId: undefined,
  album: {
    ...album2,
    userId: undefined,
    user: user2,
  },
};

describe("getPhoto", () => {
  it("should return an enriched photo object when given a valid id", async () => {
    fetchPhoto.mockResolvedValueOnce(photo1);
    fetchAlbum.mockResolvedValueOnce(album1);
    fetchUser.mockResolvedValueOnce(user1);

    const result = await getPhoto(1);

    expect(result).toEqual(expectedPhoto1);
  });

  it("should throw an error when given an invalid Photo id", async () => {
    fetchPhoto.mockRejectedValueOnce(new Error("Invalid photo id"));

    await expect(getPhoto(0)).rejects.toThrow("Invalid photo id");
  });

  it("should throw an error when given an invalid Album id", async () => {
    fetchPhoto.mockResolvedValueOnce(photo1);
    fetchAlbum.mockRejectedValueOnce(new Error("Invalid album id"));

    await expect(getPhoto(0)).rejects.toThrow("Invalid album id");
  });

  it("should throw an error when given an invalid User id", async () => {
    fetchPhoto.mockResolvedValueOnce(photo1);
    fetchAlbum.mockResolvedValueOnce(album1);
    fetchUser.mockRejectedValueOnce(new Error("Invalid user id"));

    await expect(getPhoto(0)).rejects.toThrow("Invalid user id");
  });
});

describe("getPhotos - happy path", () => {
  beforeEach(() => {
    fetchPhotos.mockResolvedValueOnce(allPhotos);
    fetchAlbums.mockResolvedValueOnce(allAlbums);
    fetchUsers.mockResolvedValueOnce(allUsers);
  });

  it("should return an array of photo objects when given no filters", async () => {
    const result = await getPhotos();

    expect(result.length).toEqual(2);
    expect(result).toContainEqual(expectedPhoto1);
    expect(result).toContainEqual(expectedPhoto2);
  });

  it("should return an array of photo objects filtered by title", async () => {
    const result = await getPhotos({ title: "e2" });

    expect(result.length).toEqual(1);
    expect(result).toContainEqual(expectedPhoto2);
  });

  it("should return an array of photo objects filtered by album title", async () => {
    const result = await getPhotos({ albumTitle: "bum2" });

    expect(result.length).toEqual(1);
    expect(result).toContainEqual(expectedPhoto2);
  });

  it("should return an array of photo objects filtered by user email", async () => {
    const result = await getPhotos({ email: "user@name.1" });

    expect(result.length).toEqual(1);
    expect(result).toContainEqual(expectedPhoto1);
  });

  it("should return an empty array when no photos match the filters", async () => {
    const result = await getPhotos({
      title: "e3",
      albumTitle: "bum3",
      email: "user@name.3",
    });

    expect(result).toEqual([]);
  });
});
