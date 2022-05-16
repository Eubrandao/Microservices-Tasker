import SigninModel from "./models/SigninModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

class Signin {
  static signin = (req, res) => {
    SigninModel.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res.status(400).json({ msg: "Invalid Password!" });
      } else {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 86000,
        });

        res.status(200).json({
          email: user.email,
          name: user.name,
          accessToken: token,
          auth: "Sim",
        });
      }
    });
  };

  static verifyJWT(req, res, next) {
    let accessToken = req.headers["x-access-token"];
    if (!accessToken)
      return res.status(401).json({ message: "Authentication is necessary!" });

    jwt.verify(accessToken, process.env.SECRET_KEY, function (err, decoded) {
      if (err) return res.status(500).json({ message: "Token inválido." });

      req.userId = decoded.id;
      console.log("User Id: " + decoded.id);
      next();
    });
  }
}

export default Signin;
