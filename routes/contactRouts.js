const http = require("http");

const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContacts,
  updateContact,
  getContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact);

module.exports = router;
