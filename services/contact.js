const { Contact } = require("../models");

const add = (newContact) => {
  return Contact.create(newContact);
};
const updateContact = async (id, body) => {
  try {
    const result = await Contact.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    return result;
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return null;
    }
    throw new Error();
  }
};

const getAll = () => {
  return Contact.find({});
};

const getContactById = async (id) => {
  try {
    const result = await Contact.findById(id);
    return result;
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return null;
    }
    throw new Error();
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contact.findByIdAndDelete(id);
    return result;
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      return null;
    }
    throw new Error();
  }
};

const updateStatusContact = async (id, body) => {
  try {
    const result = await Contact.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    return result;
  } catch (error) {
    throw new Error();
  }
};
module.exports = {
  add,
  getAll,
  getContactById,
  updateContact,
  updateStatusContact,
  removeContact,
};
