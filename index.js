require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const RouterUser = require("./router/user");
const path = require("path");
const port = process.env.PORT || 3200;

app.use("/image", express.static(path.join(__dirname + "/image")));

app.use(express.json());
app.use(cors());
app.use(RouterUser);

app.listen(port, () => console.log(`Listening at port ${port}`));
