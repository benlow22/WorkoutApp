// routes/index.js
var router = require("express").Router();
router.use("/authorized", require("./authorized")); // api/products/
router.use("/public", require("./public")); // api/products/
// prepare for domain deploy
module.exports = router;
