import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  const localStorageToken = localStorage.getItem("token"); // for test only;
  console.log({token, localStorageToken});

  if (!token || !token.startsWith("Bearer ")) {
    console.log("invalidToken");
    
    return res.status(401).json({
      message: "Token has invalid format",
    });
  }

  const tokenWithoutBearer = token.split(" ")[1];
  jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }
    req.user = payload;
    next();
  });
};
