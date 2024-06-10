const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  console.log("users page");
  res.status(200).send(contact);
});

//@desc create contact
//@route POST api/contacts
//@access public

const createContacts = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).send(contact);
});

//@desc update contact
//@route PUT api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Don't have permission to update other contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).send(updatedContact);
});

//@desc get contact
//@route GET api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  console.log("users page");

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).send(contact);
});

//@desc delete contact
//@route DELTE api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User Don't have permission to delete other contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).send(contact);
});

module.exports = {
  getContacts,
  createContacts,
  updateContact,
  getContact,
  deleteContact,
};
