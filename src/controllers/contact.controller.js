import * as contactService from "../services/contact.service.js";

export const create = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const contact = await contactService.updateContact(req.params.id, req.body);
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await contactService.deleteContact(req.params.id);
    res.status(200).json({ message: "Contacto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
