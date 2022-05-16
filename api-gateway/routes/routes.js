import express from "express";
import signinRoutes from "./signinRoutes.js";

const routes = (app) => {
  app.use(express.json(), signinRoutes);
};

export default routes;
