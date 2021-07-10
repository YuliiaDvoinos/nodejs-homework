const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./contacts.json");
const validation = require("../utils/validation");

async function listContacts(req, res) {
  try {
    const data = await fs.readFile(contactsPath);

    const contacts = JSON.parse(data);

    res.status(200).json({ message: "get contacts success", result: contacts });
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(req, res) {
  const { contactId } = req.params;
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const findContact = contacts.find(({ id }) => id == contactId);

    if (!findContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact with this id not found",
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: findContact,
      },
    });
  } catch (error) {}
}

async function removeContact(req, res) {
  const { contactId } = req.params;
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const index = contacts.findIndex(({ id }) => id == contactId);

    if (index === -1) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    const newContacts = contacts.filter(({ id }) => id != contactId);
    console.log(newContacts);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      err && console.log(err.message);
    });

    res.status(200).json({
      status: "success",
      code: "200",
      message: "No Content",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(req, res) {
  const body = req.body;
  const { error } = validation.validate(body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
  }
  const newContact = {
    id: shortid.generate(),
    ...body,
  };
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      err && console.log(err.message);
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function updateContact(req, res) {
  const id = req.params.contactId;
  const body = req.body;
  const { error } = validation.validate(body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((item) => item.id == id);
    if (index === -1) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }
    contacts[index] = { ...contacts[index], ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      err && console.log(err.message);
    });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts[index],
      },
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
