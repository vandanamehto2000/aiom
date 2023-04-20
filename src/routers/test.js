const { test } = require("../controllers/test");
const express = require("express");
const router = express.Router();

router.post("/", test);

module.exports = router;
