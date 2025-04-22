import jwt from "jsonwebtoken";

const SECRET = "brian";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, SECRET);
    // if verified, add a new field 'userId' in request
    // for controller to use it
    req.userId = user.id;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export { authenticateToken };
