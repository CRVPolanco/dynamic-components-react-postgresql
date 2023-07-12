const boomErrorHandler = (error, req, res, next) => {
  if(error.isBoom) {
    const { output, payload } = error;
    res.status(output.statusCode).send(payload);
  }
  next(error);
}

const errorHandler = (error, req, res, next) => {
  res.status(500).send({
    stack: error.stack,
    message: error.message,
  });
}

module.exports = { boomErrorHandler, errorHandler };
