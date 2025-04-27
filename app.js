const express = require("express");
const config = require("config");
const app = express();


const PORT = process.env.PORT || config.get("port")
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));