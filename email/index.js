const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "email",
  brokers: ["kafka:9092"],
});

app.listen(3003, async () => {
  console.log("Server on");

  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "topic-email", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let email = { value: message.value.toString() };

      const mailOptions = {
        from: '"Tasker" <contato@tasker.com>',
        sender: "contato@tasker.com",
        to: email.value, // receiver (use array of string for a list)
        subject: "Bem vindo", // Subject line
        html: "<p>Olá,<br></p><p>Seja Bem vindo ao Tasker, seu Gerenciador de tarefas.<br><p>Esperamos que você tenha um ótimo proveito.</p></p><br><h3>Equipe Tasker</h3>", // plain text body
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
      });
    },
  });
});
