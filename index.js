import express from "express";
// Express body-parser is an npm library used to process data sent through an HTTP request body, connection between backend and browser
import bodyParser from "body-parser";
import mongoose from "mongoose";
// CORS stands for Cross-Origin Resource Sharing . It allows us to relax the security applied to an API
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);

// const CONNECTION_URL =
//   "mongodb+srv://antra:riyadh123@contactkeeper.cng3p.mongodb.net/antra";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
// for texting herokou
app.get("/", (req, res) => {
  res.send("hello from new backend");
});
