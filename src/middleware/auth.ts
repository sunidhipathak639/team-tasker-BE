import jwt from "jsonwebtoken";

export const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).send("Access Denied");

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user;
    next();
  });
};
