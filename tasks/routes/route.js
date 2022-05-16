import express from "express";
import taskRoute from "./taskRoute.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Welcome to Tasks Microservice" });
  });

  app.use(express.json(), taskRoute);
};

export default routes;
