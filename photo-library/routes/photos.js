const express = require("express");
const router = express.Router();
const { getPhoto, getPhotos } = require("../src/photoService");

const DEFAULT_OFFSET = process.env.DEFAULT_OFFSET || 0;
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT || 25;

/* GET a single photo */
router.get("/:id", async (req, res, next) => {
  try {
    const photo = await getPhoto(req.params.id);
    const result = {
      data: [photo],
      page: { offset: 0, limit: 1, total: 1 },
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/* GET a list of photos with optional query parameter filters */
router.get("/", async function (req, res, next) {
  // get the data
  try {
    const title = req.query.title;
    const albumTitle = req.query["album.title"];
    const email = req.query["album.user.email"];
    const photos = await getPhotos({ title, albumTitle, email });
    // paginate
    const offset = Math.min(
      parseInt(req.query.offset || DEFAULT_OFFSET),
      photos.length
    );
    const limit = parseInt(req.query.limit || DEFAULT_LIMIT);
    const endIndex = Math.min(offset + limit, photos.length);
    const result = {
      data: photos.slice(offset, endIndex),
      page: { offset, limit, total: photos.length },
    };
    console.debug(
      `getPhotos: total=${photos.length} offset=${offset} limit=${limit} endIndex=${endIndex}`
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
