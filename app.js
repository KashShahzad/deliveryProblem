const express = require("express");
const app = express();
const port = 3000;
const test = require("./modules/delivery/delivery.controller");
app.listen(port, test.solution());
