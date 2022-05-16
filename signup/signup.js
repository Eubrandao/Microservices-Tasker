import SignupModel from "./models/SignupModel.js";
import bcrypt, { hash } from "bcrypt";
const saltRounds = 10;

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "signup",
  brokers: ["kafka:9092"],
});

class Signup {
  static listUsers = (req, res) => {
    SignupModel.find((err, users) => {
      // users.map((item) => {
      //   return res.status(200).json({ name: item.name });
      // });
      res.status(200).json({ users });
    });
  };

  static listUser = (req, res) => {
    const id = req.params.id;
    SignupModel.findById(id, (err, user) => {
      if (err) {
        res.status(500).json({ msg: err });
      } else {
        user.map((item) => {
          res.status(200).json({ name: item.name, email: item.email });
        });
      }
    });
  };

  static async newUser(req, res) {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    SignupModel.findOne({ email: user.email }).then(function (result) {
      if (result) {
        res.status(500).json({ msg: "this e-mail used for other user!" });
      } else {
        SignupModel.create(user);

        res.status(200).json({ msg: "User registered with successfully!" });
      }
    });

    // SignupModel.findOne((err, users) => {
    //   console.log(users);
    // }).sort({ field: "asc", _id: -1 });
    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
      topic: "topic-email",
      messages: [
        {
          value: user.email,
        },
      ],
    });

    await producer.disconnect();
  }

  static userUpdate = (req, res) => {
    const id = req.params.id;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };
    SignupModel.findByIdAndUpdate(id, { $set: user }, (err) => {
      if (!err) {
        res.status(200).json({ msg: "User updated with successfully!" });
      } else {
        res.status(500).json({ msg: err });
      }
    });
  };

  static userDelete = (req, res) => {
    const id = req.params.id;
    SignupModel.findByIdAndDelete(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).json({ msg: "User deleted with successfully!" });
      } else {
        res.status(500).json({ msg: err });
      }
    });
  };
}

export default Signup;
