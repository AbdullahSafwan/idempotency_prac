import express from "express";
import controller from "./controller";
const router = express.Router();

router.get("/api/v1/", (req, res) => {
  res.send("Server is up and running");
});

router.post("/api/v1/operation", controller.handleRequest);

export default router;
