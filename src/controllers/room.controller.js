import * as RoomService from "../services/rooms.service.js";

export const createRoom = async (req, res) => {
  try {
    const room = await RoomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await RoomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await RoomService.getRoomById(id);

    if (!room) {
      return res.status(404).json({ message: "Room no encontrada" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await RoomService.updateRoom(req.params.id, req.body);

    if (!room) {
      return res.status(404).json({ message: "Room no encontrada" });
    }

    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const deleted = await RoomService.deleteRoom(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Room no encontrada" });
    }

    res.json({ message: "Habitación eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};