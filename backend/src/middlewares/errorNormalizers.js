export const normalizeMongoError = (err) => {
  if (!err) return null;

  const isMongoError =
    err.name === "CastError" ||
    err.name === "ValidationError" ||
    err.code === 11000;

  if (!isMongoError) return null; 

  let status = 500;
  let message = "Database error";
  let details = null;

  if (err.name === "CastError") {
    status = 400;
    message = "Invalid resource id";
  }

  if (err.name === "ValidationError") {
    status = 400;
    message = "Database validation error";
    details = Object.values(err.errors).map(e => e.message);
  }

  if (err.code === 11000) {
    status = 409;
    message = "Duplicate field value";
    details = Object.keys(err.keyPattern);
  }

  return { status, message, details };
};

