const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());
app.use(cors());

const start = async () => {
  let port = process.env.PORT;

  //create server and connect with mongoDB
  try {
    await connectDB(process.env.MONGO_URL).then((err) =>
      console.log("Database connected successfully!")
    );
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
