import Contact from "../models/Contact.js";

export const createContact = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};

export const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const updateContact = async (id, data) => {
  return await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};