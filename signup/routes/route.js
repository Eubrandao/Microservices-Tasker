import express from "express";
import signupRoute from "./signupRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Welcome to users Microservice" });
  });

  app.use(express.json(), signupRoute);
};

export default routes;
