
import express from "express";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Basic API information
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Blog REST API is running",
    endpoints: {
      create: "POST /posts",
      getAll: "GET /posts",
      getOne: "GET /posts/:id",
      update: "PUT /posts/:id",
      delete: "DELETE /posts/:id",
    },
  });
});

// Blog post routes
app.use("/posts", postRoutes);

// Handle unknown routes and errors
app.use(notFound);
app.use(errorHandler);

export default app;
