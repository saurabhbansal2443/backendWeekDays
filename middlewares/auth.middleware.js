import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

let auth = async (req, res, next) => {

  console.log("middleware called ")
  let token = req.cookies?.Token ||  req.header("Authorization")?.replace('Bearer ','');

  try {
    if (!token) {
      return res
        .status(401)
        .send({ result: false, message: "User not authenticated " });
    } else {
      let { id } =  jwt.verify(token, process.env.PRIVATE_KEY);

      let user = await User.findById(id);

      req.user = user;

      next();
    }
  } catch (err) {
    return res.send({ result: false, message: err.message });
  }
};

export default auth;
