const express = require("express");
const config = require("config");
const app = express();

require("./startup/db")();
require("./startup/routes")(app);

const PORT = process.env.PORT || config.get("port");
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));