export const cache = (req, res, next) => {
  if (req.method === "GET") {
    res.set("Cache-Control", "private, max-age=3600");
  }
  next();
};