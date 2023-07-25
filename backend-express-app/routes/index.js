// routes/index.js
var router = require("express").Router();
router.use("/authorized", require("./authorized")); // api/products/
router.use("/public", require("./public")); // api/products/

module.exports = router;
