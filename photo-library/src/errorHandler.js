const handleHttpErrors = async (error, req, res, next) => {
  if (error.response && error.response.status) {
    res.status(error.response.status).send(error.response.statusText);
  } else {
    res.status(500).send("Internal server error");
  }
  next(error);
};

module.exports = { handleHttpErrors };
